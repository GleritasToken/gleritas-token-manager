import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertUserSchema, 
  loginSchema, 
  walletConnectSchema, 
  insertTaskSchema,
  adminLoginSchema,
  insertAdminSchema,
  type User,
  type Admin
} from "@shared/schema";
import bcrypt from "bcryptjs";
import { z } from "zod";
import cookieParser from "cookie-parser";

// Extend the Request type to include the user property
declare global {
  namespace Express {
    interface Request {
      user?: User;
      admin?: Admin;
    }
  }
}

// Middleware for authentication
const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
  const sessionId = req.cookies.sessionId;
  
  if (!sessionId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  
  const session = await storage.getSession(sessionId);
  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  
  const user = await storage.getUser(session.userId);
  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  
  req.user = user;
  next();
};

// Middleware for admin authentication
const authenticateAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const adminSessionId = req.cookies.adminSessionId;
  
  if (!adminSessionId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  
  try {
    const adminId = parseInt(adminSessionId);
    const admin = await storage.getAdminByUsername("Gleritastoken@gmail.com");
    
    if (!admin || admin.id !== adminId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    req.admin = admin;
    next();
  } catch {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Enable cookie parsing
  app.use(cookieParser());
  
  // Initialize default admin if it doesn't exist
  const existingAdmin = await storage.getAdminByUsername("Gleritastoken@gmail.com");
  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash("Gtoken234@@", 10);
    await storage.createAdmin({
      username: "Gleritastoken@gmail.com",
      password: hashedPassword,
    });
  }
  
  // Initialize default tasks
  const defaultTasks = [
    { title: "Referral Task", description: "Refer at least 3 users", points: 500, taskType: "referral" },
    { title: "Join Telegram Group", description: "Join our official Telegram group", points: 100, taskType: "telegram" },
    { title: "Join Telegram Channel", description: "Join our official Telegram channel", points: 100, taskType: "telegram" },
    { title: "Follow Twitter Page", description: "Follow our Twitter account", points: 150, taskType: "twitter" },
    { title: "Subscribe to Youtube Channel", description: "Subscribe to our YouTube channel", points: 200, taskType: "youtube" },
    { title: "Like Youtube Video", description: "Like our latest YouTube video", points: 50, taskType: "youtube" },
  ];
  
  // Create default tasks if they don't exist
  for (const taskData of defaultTasks) {
    try {
      await storage.createTask(taskData);
    } catch (error) {
      // Task might already exist, ignore error
    }
  }
  
  // Auth routes
  app.post('/api/auth/signup', async (req, res) => {
    try {
      const { username, email, password, referredBy } = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
      
      const existingUsername = await storage.getUserByUsername(username);
      if (existingUsername) {
        return res.status(400).json({ message: "Username already taken" });
      }
      
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
      
      // Create user
      const user = await storage.createUser({
        username,
        email,
        password: hashedPassword,
        referredBy,
      });
      
      // Handle referral if provided
      if (referredBy) {
        const referrer = await storage.getUserByReferralCode(referredBy);
        if (referrer) {
          await storage.createReferral({
            referrerId: referrer.id,
            referredUserId: user.id,
            pointsEarned: 250,
          });
        }
      }
      
      // Create session
      const session = await storage.createSession(user.id);
      
      res.cookie('sessionId', session.id, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });
      
      res.json({
        user: { ...user, password: undefined },
        message: "Registration successful",
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid input", errors: error.errors });
      }
      console.error("Signup error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  app.post('/api/auth/login', async (req, res) => {
    try {
      const { email, password } = loginSchema.parse(req.body);
      
      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      // Create session
      const session = await storage.createSession(user.id);
      
      res.cookie('sessionId', session.id, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });
      
      res.json({
        user: { ...user, password: undefined },
        message: "Login successful",
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid input", errors: error.errors });
      }
      console.error("Login error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  app.post('/api/auth/logout', authenticateUser, async (req, res) => {
    const sessionId = req.cookies.sessionId;
    if (sessionId) {
      await storage.deleteSession(sessionId);
    }
    res.clearCookie('sessionId');
    res.json({ message: "Logout successful" });
  });
  
  app.get('/api/auth/me', authenticateUser, async (req, res) => {
    res.json({ user: { ...req.user, password: undefined } });
  });
  
  // User routes
  app.post('/api/user/connect-wallet', authenticateUser, async (req, res) => {
    try {
      const { walletAddress } = walletConnectSchema.parse(req.body);
      
      const updatedUser = await storage.updateUser(req.user.id, {
        walletAddress,
        walletConnected: true,
        points: req.user.points + 100, // Wallet connection bonus
      });
      
      res.json({
        user: { ...updatedUser, password: undefined },
        message: "Wallet connected successfully",
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid wallet address", errors: error.errors });
      }
      console.error("Wallet connect error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Task routes
  app.get('/api/tasks', authenticateUser, async (req, res) => {
    try {
      const userTasks = await storage.getUserTasks(req.user.id);
      res.json(userTasks);
    } catch (error) {
      console.error("Get tasks error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  app.post('/api/tasks/:taskId/complete', authenticateUser, async (req, res) => {
    try {
      const taskId = parseInt(req.params.taskId);
      
      if (!req.user.walletConnected) {
        return res.status(400).json({ message: "Wallet must be connected to complete tasks" });
      }
      
      const userTask = await storage.completeUserTask(req.user.id, taskId);
      const updatedUser = await storage.getUser(req.user.id);
      
      res.json({
        userTask,
        user: { ...updatedUser, password: undefined },
        message: "Task completed successfully",
      });
    } catch (error) {
      console.error("Complete task error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Referral routes
  app.get('/api/referrals', authenticateUser, async (req, res) => {
    try {
      console.log("Referral API called for user:", req.user.id);
      console.log("User referral code:", req.user.referralCode);
      
      const referrals = await storage.getReferralsByUserId(req.user.id);
      const referralCount = await storage.getReferralCount(req.user.id);
      
      const response = {
        referrals,
        referralCount,
        referralCode: req.user.referralCode,
        totalEarnings: referrals.length * 250,
      };
      
      console.log("Referral API response:", response);
      
      res.json(response);
    } catch (error) {
      console.error("Get referrals error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Admin routes
  app.post('/api/admin/login', async (req, res) => {
    try {
      const { username, password } = adminLoginSchema.parse(req.body);
      
      const admin = await storage.getAdminByUsername(username);
      if (!admin) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      const isValid = await bcrypt.compare(password, admin.password);
      if (!isValid) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      // Set admin session cookie
      res.cookie('adminSessionId', admin.id.toString(), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
      });
      
      res.json({
        admin: { id: admin.id, username: admin.username },
        message: "Admin login successful",
      });
    } catch (error) {
      console.error("Admin login error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  app.post('/api/admin/logout', authenticateAdmin, async (req, res) => {
    res.clearCookie('adminSessionId');
    res.json({ message: "Admin logout successful" });
  });
  
  app.get('/api/admin/me', authenticateAdmin, async (req, res) => {
    res.json({
      admin: { id: req.admin.id, username: req.admin.username },
    });
  });
  
  app.get('/api/admin/users', authenticateAdmin, async (req, res) => {
    try {
      const users = await storage.getAllUsers();
      res.json(users.map(user => ({ ...user, password: undefined })));
    } catch (error) {
      console.error("Get users error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  app.get('/api/admin/tasks', authenticateAdmin, async (req, res) => {
    try {
      const tasks = await storage.getAllTasksForAdmin();
      res.json(tasks);
    } catch (error) {
      console.error("Get tasks error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  app.post('/api/admin/tasks', authenticateAdmin, async (req, res) => {
    try {
      const taskData = insertTaskSchema.parse(req.body);
      const task = await storage.createTask(taskData);
      res.json(task);
    } catch (error) {
      console.error("Create task error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  app.put('/api/admin/tasks/:id', authenticateAdmin, async (req, res) => {
    try {
      const taskId = parseInt(req.params.id);
      const updates = req.body;
      const task = await storage.updateTask(taskId, updates);
      res.json(task);
    } catch (error) {
      console.error("Update task error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  app.delete('/api/admin/tasks/:id', authenticateAdmin, async (req, res) => {
    try {
      const taskId = parseInt(req.params.id);
      await storage.deleteTask(taskId);
      res.json({ message: "Task deleted successfully" });
    } catch (error) {
      console.error("Delete task error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  app.delete('/api/admin/users/:id', authenticateAdmin, async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      await storage.deleteUser(userId);
      res.json({ message: "User deleted successfully" });
    } catch (error) {
      console.error("Delete user error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  const httpServer = createServer(app);
  return httpServer;
}

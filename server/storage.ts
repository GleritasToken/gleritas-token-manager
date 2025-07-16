import { 
  users, 
  tasks, 
  userTasks, 
  referrals, 
  sessions,
  type User, 
  type InsertUser, 
  type Task, 
  type InsertTask,
  type UserTask,
  type InsertUserTask,
  type Referral,
  type InsertReferral
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc, count, gt, sql } from "drizzle-orm";
import { nanoid } from "nanoid";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByReferralCode(referralCode: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, updates: Partial<User>): Promise<User>;
  
  // Task operations
  getAllTasks(): Promise<Task[]>;
  createTask(task: InsertTask): Promise<Task>;
  
  // User task operations
  getUserTasks(userId: number): Promise<(UserTask & { task: Task })[]>;
  completeUserTask(userId: number, taskId: number): Promise<UserTask>;
  
  // Referral operations
  getReferralsByUserId(userId: number): Promise<(Referral & { referredUser: User })[]>;
  getReferralCount(userId: number): Promise<number>;
  createReferral(referral: InsertReferral): Promise<Referral>;
  
  // Session operations
  createSession(userId: number): Promise<{ id: string; expiresAt: Date }>;
  getSession(sessionId: string): Promise<{ userId: number } | undefined>;
  deleteSession(sessionId: string): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async getUserByReferralCode(referralCode: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.referralCode, referralCode));
    return user;
  }

  async createUser(userData: InsertUser): Promise<User> {
    const referralCode = nanoid(10).toUpperCase();
    const [user] = await db
      .insert(users)
      .values({
        ...userData,
        referralCode,
        points: 500, // Registration bonus
      })
      .returning();
    
    // Create user tasks for all active tasks
    const activeTasks = await db.select().from(tasks).where(eq(tasks.isActive, true));
    if (activeTasks.length > 0) {
      await db.insert(userTasks).values(
        activeTasks.map(task => ({
          userId: user.id,
          taskId: task.id,
          completed: false,
        }))
      );
    }
    
    return user;
  }

  async updateUser(id: number, updates: Partial<User>): Promise<User> {
    const [user] = await db
      .update(users)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    return user;
  }

  async getAllTasks(): Promise<Task[]> {
    return await db.select().from(tasks).where(eq(tasks.isActive, true));
  }

  async createTask(taskData: InsertTask): Promise<Task> {
    const [task] = await db.insert(tasks).values(taskData).returning();
    return task;
  }

  async getUserTasks(userId: number): Promise<(UserTask & { task: Task })[]> {
    return await db
      .select({
        id: userTasks.id,
        userId: userTasks.userId,
        taskId: userTasks.taskId,
        completed: userTasks.completed,
        completedAt: userTasks.completedAt,
        createdAt: userTasks.createdAt,
        task: tasks,
      })
      .from(userTasks)
      .innerJoin(tasks, eq(userTasks.taskId, tasks.id))
      .where(eq(userTasks.userId, userId));
  }

  async completeUserTask(userId: number, taskId: number): Promise<UserTask> {
    const [userTask] = await db
      .update(userTasks)
      .set({
        completed: true,
        completedAt: new Date(),
      })
      .where(and(eq(userTasks.userId, userId), eq(userTasks.taskId, taskId)))
      .returning();
    
    // Award points to user
    const [task] = await db.select().from(tasks).where(eq(tasks.id, taskId));
    if (task) {
      await db
        .update(users)
        .set({
          points: sql`${users.points} + ${task.points}`,
        })
        .where(eq(users.id, userId));
    }
    
    return userTask;
  }

  async getReferralsByUserId(userId: number): Promise<(Referral & { referredUser: User })[]> {
    return await db
      .select({
        id: referrals.id,
        referrerId: referrals.referrerId,
        referredUserId: referrals.referredUserId,
        pointsEarned: referrals.pointsEarned,
        createdAt: referrals.createdAt,
        referredUser: users,
      })
      .from(referrals)
      .innerJoin(users, eq(referrals.referredUserId, users.id))
      .where(eq(referrals.referrerId, userId))
      .orderBy(desc(referrals.createdAt));
  }

  async getReferralCount(userId: number): Promise<number> {
    const [result] = await db
      .select({ count: count() })
      .from(referrals)
      .where(eq(referrals.referrerId, userId));
    return result.count;
  }

  async createReferral(referralData: InsertReferral): Promise<Referral> {
    const [referral] = await db.insert(referrals).values(referralData).returning();
    
    // Award points to referrer
    await db
      .update(users)
      .set({
        points: sql`${users.points} + ${referralData.pointsEarned}`,
      })
      .where(eq(users.id, referralData.referrerId));
    
    return referral;
  }

  async createSession(userId: number): Promise<{ id: string; expiresAt: Date }> {
    const sessionId = nanoid(32);
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
    
    await db.insert(sessions).values({
      id: sessionId,
      userId,
      expiresAt,
    });
    
    return { id: sessionId, expiresAt };
  }

  async getSession(sessionId: string): Promise<{ userId: number } | undefined> {
    const [session] = await db
      .select({ userId: sessions.userId })
      .from(sessions)
      .where(and(eq(sessions.id, sessionId), gt(sessions.expiresAt, new Date())));
    
    return session;
  }

  async deleteSession(sessionId: string): Promise<void> {
    await db.delete(sessions).where(eq(sessions.id, sessionId));
  }
}

export const storage = new DatabaseStorage();

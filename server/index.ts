import 'dotenv/config';
import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

// Simple logging function
const logMessage = (message: string) => {
  console.log(`[${new Date().toISOString()}] ${message}`);
};

// Create Express app
const app = express();

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS middleware for development
if (process.env.NODE_ENV === "development") {
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    
    if (req.method === "OPTIONS") {
      res.sendStatus(200);
    } else {
      next();
    }
  });
}

// Request logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      logMessage(logLine);
    }
  });

  next();
});

// CRITICAL: Health check endpoint - must be first and simple
app.get('/health', (req, res) => {
  try {
    res.status(200).json({ 
      status: 'ok', 
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      port: process.env.PORT || '5000',
      uptime: process.uptime()
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'error', 
      message: 'Health check failed',
      timestamp: new Date().toISOString()
    });
  }
});

// Simple root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Gleritas Token Manager API is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Main server startup
const startServer = async () => {
  try {
    logMessage("🚀 Starting Gleritas Token Manager server...");
    logMessage(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
    logMessage(`🔗 Database URL: ${process.env.DATABASE_URL ? 'configured' : 'NOT CONFIGURED'}`);
    logMessage(`🌐 Port: ${process.env.PORT || '5000'}`);
    
    // Register routes (this includes database initialization)
    const server = await registerRoutes(app);

    // Global error handler
    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";

      logMessage(`❌ Error: ${status} - ${message}`);
      res.status(status).json({ message });
    });

    // Setup static files or Vite based on environment
    if (process.env.NODE_ENV === "development") {
      logMessage("🔧 Setting up Vite for development...");
      await setupVite(app, server);
    } else {
      logMessage("📁 Setting up static file serving for production...");
      serveStatic(app);
    }

    // Start the server
    const port = parseInt(process.env.PORT || '5000', 10);
    const host = process.env.NODE_ENV === "development" ? "localhost" : "0.0.0.0";
    
    server.listen({
      port,
      host,
    }, () => {
      logMessage(`🚀 Server running on ${host}:${port}`);
      logMessage(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
      logMessage(`✅ Gleritas Token Manager is ready!`);
      logMessage(`🏥 Health check: http://${host}:${port}/health`);
      logMessage(`🏠 Root endpoint: http://${host}:${port}/`);
    });

    // Handle server errors
    server.on('error', (error) => {
      logMessage(`❌ Server error: ${error.message}`);
      process.exit(1);
    });

  } catch (error) {
    logMessage(`❌ Failed to start server: ${error}`);
    process.exit(1);
  }
};

// Start the server
startServer();

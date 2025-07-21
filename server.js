#!/usr/bin/env node

// Railway-optimized server startup
process.env.NODE_ENV = process.env.NODE_ENV || 'production';

console.log('🚀 Starting Gleritas Token Manager for Railway...');
console.log(`📊 Environment: ${process.env.NODE_ENV}`);
console.log(`🌐 Port: ${process.env.PORT || '5000'}`);
console.log(`🔗 Database URL: ${process.env.DATABASE_URL ? 'configured' : 'NOT CONFIGURED'}`);

// Add error handlers for uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
  console.error('Stack trace:', error.stack);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Import and start the application with timeout
const startApp = async () => {
  try {
    console.log('📦 Loading application...');
    
    // Add a timeout to prevent hanging
    const timeout = setTimeout(() => {
      console.error('❌ Application startup timeout after 30 seconds');
      process.exit(1);
    }, 30000);

    const app = await import('./dist/index.js');
    
    clearTimeout(timeout);
    console.log('✅ Application loaded successfully');
    
  } catch (error) {
    console.error('❌ Failed to start application:', error);
    console.error('Stack trace:', error.stack);
    
    // Try alternative startup method
    try {
      console.log('🔄 Trying alternative startup method...');
      require('./dist/index.js');
    } catch (altError) {
      console.error('❌ Alternative startup also failed:', altError);
      process.exit(1);
    }
  }
};

startApp(); 
#!/usr/bin/env node

// Simple CommonJS startup for Railway
process.env.NODE_ENV = process.env.NODE_ENV || 'production';

console.log('🚀 Starting Gleritas Token Manager (Simple Mode)...');
console.log(`📊 Environment: ${process.env.NODE_ENV}`);
console.log(`🌐 Port: ${process.env.PORT || '5000'}`);

// Error handling
process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error.message);
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  console.error('❌ Unhandled Rejection:', reason);
  process.exit(1);
});

// Try to start the app
try {
  console.log('📦 Loading application...');
  require('./dist/index.js');
  console.log('✅ Application started successfully');
} catch (error) {
  console.error('❌ Failed to start application:', error.message);
  console.error('Stack:', error.stack);
  process.exit(1);
} 
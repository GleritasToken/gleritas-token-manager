#!/usr/bin/env node

// Simple server startup for Railway
process.env.NODE_ENV = process.env.NODE_ENV || 'production';

console.log('🚀 Starting Gleritas Token Manager...');
console.log(`📊 Environment: ${process.env.NODE_ENV}`);
console.log(`🌐 Port: ${process.env.PORT || '5000'}`);

// Import and start the application
import('./dist/index.js').catch(error => {
  console.error('❌ Failed to start application:', error);
  console.error('Stack trace:', error.stack);
  process.exit(1);
}); 
#!/usr/bin/env node

// Simple production start script for Railway
process.env.NODE_ENV = 'production';

console.log('🚀 Starting Gleritas Token Manager in production mode...');
console.log(`📊 Environment: ${process.env.NODE_ENV}`);
console.log(`🌐 Port: ${process.env.PORT || '5000'}`);

// Import and start the main application
import('./dist/index.js').catch(error => {
  console.error('❌ Failed to start application:', error);
  process.exit(1);
}); 
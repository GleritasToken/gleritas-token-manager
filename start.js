#!/usr/bin/env node

// Simple startup script for Railway
console.log('🚀 Starting Gleritas Token Manager...');
console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
console.log(`🌐 Port: ${process.env.PORT || '5000'}`);

// Import and start the main application
import('./dist/index.js').catch(error => {
  console.error('❌ Failed to start application:', error);
  process.exit(1);
}); 
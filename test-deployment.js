#!/usr/bin/env node

// Test script to verify deployment readiness
console.log('🧪 Testing deployment configuration...');

// Test 1: Environment variables
console.log('\n📋 Environment Variables:');
console.log(`NODE_ENV: ${process.env.NODE_ENV || 'not set'}`);
console.log(`PORT: ${process.env.PORT || 'not set'}`);
console.log(`DATABASE_URL: ${process.env.DATABASE_URL ? 'configured' : 'not configured'}`);
console.log(`SESSION_SECRET: ${process.env.SESSION_SECRET ? 'configured' : 'not configured'}`);

// Test 2: Check if dist folder exists
import { existsSync } from 'fs';
import { join } from 'path';

const distPath = join(process.cwd(), 'dist');
const distExists = existsSync(distPath);
console.log(`\n📁 Build Output: ${distExists ? '✅ exists' : '❌ missing'}`);

if (distExists) {
  const indexPath = join(distPath, 'index.js');
  const publicPath = join(distPath, 'public');
  
  console.log(`📄 Server bundle: ${existsSync(indexPath) ? '✅ exists' : '❌ missing'}`);
  console.log(`🌐 Public files: ${existsSync(publicPath) ? '✅ exists' : '❌ missing'}`);
}

// Test 3: Check package.json scripts
import { readFileSync } from 'fs';
try {
  const packageJson = JSON.parse(readFileSync('package.json', 'utf8'));
  console.log(`\n📦 Package Scripts:`);
  console.log(`build: ${packageJson.scripts.build ? '✅ exists' : '❌ missing'}`);
  console.log(`start: ${packageJson.scripts.start ? '✅ exists' : '❌ missing'}`);
} catch (error) {
  console.log('❌ Could not read package.json');
}

console.log('\n✅ Deployment test completed!'); 
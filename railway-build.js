#!/usr/bin/env node

// Railway build script
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🔨 Starting Railway build process...');

try {
  // Clean dist directory
  if (fs.existsSync('dist')) {
    console.log('🧹 Cleaning dist directory...');
    fs.rmSync('dist', { recursive: true, force: true });
  }

  // Build frontend
  console.log('🏗️ Building frontend...');
  execSync('vite build', { stdio: 'inherit' });

  // Build backend
  console.log('⚙️ Building backend...');
  execSync('esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist', { stdio: 'inherit' });

  // Verify build output
  console.log('✅ Verifying build output...');
  if (!fs.existsSync('dist/index.js')) {
    throw new Error('Backend build failed - dist/index.js not found');
  }
  if (!fs.existsSync('dist/public')) {
    throw new Error('Frontend build failed - dist/public not found');
  }

  console.log('🎉 Build completed successfully!');
  console.log('📁 Build output:');
  console.log('  - Backend: dist/index.js');
  console.log('  - Frontend: dist/public/');

} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
} 
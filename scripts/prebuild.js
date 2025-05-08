const { execSync } = require('child_process');
const os = require('os');
const fs = require('fs');
const path = require('path');

console.log('Running prebuild script...');

// Detect platform
const platform = process.platform;
const arch = process.arch;

console.log(`Detected platform: ${platform}, architecture: ${arch}`);

try {
  // Check if running on Vercel
  const isVercel = process.env.VERCEL === '1';
  
  if (isVercel) {
    console.log('Running on Vercel, installing platform-specific dependencies...');
    // Force reinstall of lightningcss for Linux
    execSync('npm rebuild lightningcss --platform=linux --arch=x64', { stdio: 'inherit' });
  } else {
    // Local development - make sure lightningcss works for this platform
    try {
      // Test if lightningcss is already correctly installed
      require('lightningcss');
      console.log('LightningCSS is already properly installed.');
    } catch (e) {
      console.log('Rebuilding lightningcss for local platform...');
      execSync('npm rebuild lightningcss', { stdio: 'inherit' });
    }
  }
  
  console.log('Prebuild completed successfully.');
} catch (error) {
  console.error('Prebuild script error:', error);
  // Don't exit with error to allow build to continue
} 
#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const CONFIG_FILE = path.join(__dirname, 'config.json');
const TEMPLATE_EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx', '.json', '.md'];

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
};

// Helper functions
function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function header(message) {
  console.log('');
  log('═'.repeat(50), 'cyan');
  log(message, 'bright');
  log('═'.repeat(50), 'cyan');
  console.log('');
}

function success(message) {
  log(`✅ ${message}`, 'green');
}

function info(message) {
  log(`ℹ️  ${message}`, 'blue');
}

function warning(message) {
  log(`⚠️  ${message}`, 'yellow');
}

function error(message) {
  log(`❌ ${message}`, 'red');
  process.exit(1);
}

// Load configuration
function loadConfig() {
  try {
    return JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));
  } catch (err) {
    error(`Failed to load configuration: ${err.message}`);
  }
}

// Prompt for user input
function prompt(question, defaultValue = '') {
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise(resolve => {
    const displayDefault = defaultValue ? ` (default: ${defaultValue})` : '';
    readline.question(
      `${colors.cyan}${question}${displayDefault}: ${colors.reset}`,
      answer => {
        readline.close();
        resolve(answer.trim() || defaultValue);
      },
    );
  });
}

// Replace template variables in content
function replaceVariables(content, variables) {
  let result = content;
  for (const [key, value] of Object.entries(variables)) {
    const regex = new RegExp(`{{${key}}}`, 'g');
    result = result.replace(regex, value);
  }
  return result;
}

// Process a single file
function processFile(filePath, variables) {
  const ext = path.extname(filePath);
  if (!TEMPLATE_EXTENSIONS.includes(ext)) {
    return;
  }

  try {
    let content = fs.readFileSync(filePath, 'utf8');
    content = replaceVariables(content, variables);
    fs.writeFileSync(filePath, content, 'utf8');
    success(`Processed: ${path.basename(filePath)}`);
  } catch (err) {
    warning(`Failed to process ${filePath}: ${err.message}`);
  }
}

// Process directory recursively
function processDirectory(
  dirPath,
  variables,
  excludeDirs = ['node_modules', '.git', '.boilerplate'],
) {
  const items = fs.readdirSync(dirPath);

  for (const item of items) {
    const fullPath = path.join(dirPath, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      if (!excludeDirs.includes(item)) {
        processDirectory(fullPath, variables, excludeDirs);
      }
    } else {
      processFile(fullPath, variables);
    }
  }
}

// Rename project files
function renameProjectFiles(projectPath, oldName, newName) {
  // Update iOS project files
  const iosPath = path.join(projectPath, 'ios');
  if (fs.existsSync(iosPath)) {
    const oldIosPath = path.join(iosPath, oldName);
    const newIosPath = path.join(iosPath, newName);

    if (fs.existsSync(oldIosPath)) {
      fs.renameSync(oldIosPath, newIosPath);
      success(`Renamed iOS project directory`);

      // Rename .xcodeproj
      const oldXcodeproj = path.join(newIosPath, `${oldName}.xcodeproj`);
      const newXcodeproj = path.join(newIosPath, `${newName}.xcodeproj`);
      if (fs.existsSync(oldXcodeproj)) {
        fs.renameSync(oldXcodeproj, newXcodeproj);
        success(`Renamed Xcode project`);
      }
    }
  }

  // Update Android package structure
  const androidPath = path.join(
    projectPath,
    'android',
    'app',
    'src',
    'main',
    'java',
  );
  if (fs.existsSync(androidPath)) {
    info('Android package structure will be updated based on bundle ID');
  }
}

// Update native configuration files
function updateNativeConfigs(projectPath, variables) {
  // Update iOS Info.plist
  const infoPlistPath = path.join(
    projectPath,
    'ios',
    variables.PROJECT_NAME,
    'Info.plist',
  );
  if (fs.existsSync(infoPlistPath)) {
    let content = fs.readFileSync(infoPlistPath, 'utf8');
    content = content.replace(
      /<string>Base App<\/string>/g,
      `<string>${variables.PROJECT_DISPLAY_NAME}</string>`,
    );
    fs.writeFileSync(infoPlistPath, content, 'utf8');
    success('Updated iOS Info.plist');
  }

  // Update Android strings.xml
  const stringsXmlPath = path.join(
    projectPath,
    'android',
    'app',
    'src',
    'main',
    'res',
    'values',
    'strings.xml',
  );
  if (fs.existsSync(stringsXmlPath)) {
    let content = fs.readFileSync(stringsXmlPath, 'utf8');
    content = content.replace(
      /<string name="app_name">.*<\/string>/g,
      `<string name="app_name">${variables.PROJECT_DISPLAY_NAME}</string>`,
    );
    fs.writeFileSync(stringsXmlPath, content, 'utf8');
    success('Updated Android strings.xml');
  }
}

// Main initialization function
async function init() {
  header('🚀 React Native Base App Boilerplate Initializer');

  const config = loadConfig();
  info(`Loaded configuration v${config.version}`);

  // Get user inputs
  header('Project Configuration');

  const variables = {};

  variables.PROJECT_NAME = await prompt(
    'Project name (lowercase, no spaces)',
    'my-app',
  );
  variables.PROJECT_DISPLAY_NAME = await prompt('Display name', 'My App');
  variables.BUNDLE_ID_IOS = await prompt(
    'iOS Bundle ID',
    `com.example.${variables.PROJECT_NAME.replace(/-/g, '')}`,
  );
  variables.BUNDLE_ID_ANDROID = await prompt(
    'Android Bundle ID',
    variables.BUNDLE_ID_IOS,
  );
  variables.PACKAGE_NAME = variables.BUNDLE_ID_ANDROID;

  // Confirmation
  header('Configuration Summary');
  console.table(variables);

  const confirm = await prompt('Proceed with initialization? (y/n)', 'y');
  if (confirm.toLowerCase() !== 'y') {
    warning('Initialization cancelled');
    process.exit(0);
  }

  // Start processing
  header('Initializing Project');

  const projectPath = process.cwd();

  // Process all template files
  info('Processing template files...');
  processDirectory(projectPath, variables);

  // Update package.json
  const packageJsonPath = path.join(projectPath, 'package.json');
  if (fs.existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    packageJson.name = variables.PROJECT_NAME;
    fs.writeFileSync(
      packageJsonPath,
      JSON.stringify(packageJson, null, 2),
      'utf8',
    );
    success('Updated package.json');
  }

  // Update app.json
  const appJsonPath = path.join(projectPath, 'app.json');
  if (fs.existsSync(appJsonPath)) {
    const appJson = JSON.parse(fs.readFileSync(appJsonPath, 'utf8'));
    appJson.name = variables.PROJECT_NAME;
    appJson.displayName = variables.PROJECT_DISPLAY_NAME;
    fs.writeFileSync(appJsonPath, JSON.stringify(appJson, null, 2), 'utf8');
    success('Updated app.json');
  }

  // Rename project files
  info('Renaming project files...');
  renameProjectFiles(projectPath, 'BaseApp', variables.PROJECT_NAME);

  // Update native configurations
  info('Updating native configurations...');
  updateNativeConfigs(projectPath, variables);

  // Install dependencies
  header('Installing Dependencies');
  const useYarn = fs.existsSync(path.join(projectPath, 'yarn.lock'));
  const installCmd = useYarn ? 'yarn install' : 'npm install';

  try {
    info(`Running ${installCmd}...`);
    execSync(installCmd, { stdio: 'inherit', cwd: projectPath });
    success('Dependencies installed');
  } catch (err) {
    warning('Failed to install dependencies. Please run manually.');
  }

  // Pod install for iOS
  if (process.platform === 'darwin') {
    try {
      info('Running pod install...');
      execSync('cd ios && pod install', { stdio: 'inherit', cwd: projectPath });
      success('iOS pods installed');
    } catch (err) {
      warning(
        'Failed to install pods. Please run "cd ios && pod install" manually.',
      );
    }
  }

  // Final message
  header('✨ Initialization Complete!');

  console.log(`
${colors.bright}Next steps:${colors.reset}

1. Update bundle identifiers in:
   - ios/${variables.PROJECT_NAME}/Info.plist
   - android/app/build.gradle

2. Update app icons and splash screens:
   - ios/${variables.PROJECT_NAME}/Images.xcassets
   - android/app/src/main/res

3. Configure environment variables:
   - Create .env files for different environments

4. Run the project:
   ${colors.cyan}# iOS
   npx react-native run-ios

   # Android
   npx react-native run-android${colors.reset}

5. Start developing! 🎉

${colors.bright}Documentation:${colors.reset}
   - README.md: Project documentation
   - .boilerplate/README.md: Boilerplate guide

${colors.green}Happy coding!${colors.reset}
  `);
}

// Run initialization
if (require.main === module) {
  init().catch(err => {
    error(`Initialization failed: ${err.message}`);
  });
}

module.exports = { init };

#!/usr/bin/env node

/* eslint-env node */

const fs = require('fs');
const path = require('path');

/**
 * Import categories with their patterns and comments
 */
const IMPORT_CATEGORIES = [
  {
    name: 'react',
    comment: '// React and React Native',
    patterns: [/^react$/, /^react\//, /^react-native$/, /^react-native\//],
    priority: 1,
  },
  {
    name: 'third-party',
    comment: '// Third Party Libraries',
    patterns: [
      /^[^@.]/, // packages without @ or .
      /^@[^/]+\//, // scoped packages like @react-navigation, @reduxjs/toolkit, etc.
    ],
    excludePatterns: [
      /^react$/,
      /^react\//,
      /^react-native$/,
      /^react-native\//,
      /^@\//,
    ],
    priority: 2,
  },
  {
    name: 'components-hooks',
    comment: '// Components and Hooks',
    patterns: [
      /^@\/redux/,
      /^@\/components/,
      /^@\/hooks/,
      /^@\/helper/,
      /^@\/constant/,
      /^@\/config/,
      /^@\/theme/,
    ],
    priority: 3,
  },
  {
    name: 'global-types',
    comment: '// Global Types',
    patterns: [/^@\/types/],
    priority: 4,
  },
  {
    name: 'local-components',
    comment: '// Local Components and Hooks',
    patterns: [/^\.\//, /^\.\.\//, /^[A-Z]/],
    excludePatterns: [
      /^@\/types/,
      /^@\/redux/,
      /^@\/components/,
      /^@\/hooks/,
      /^@\/helper/,
      /^@\/constant/,
      /^@\/config/,
      /^@\/theme/,
      /assets/i,
    ],
    priority: 5,
  },
  {
    name: 'assets',
    comment: '// Assets',
    patterns: [/assets/i, /^@\/assets/],
    priority: 6,
  },
];

/**
 * Parse imports from file content and extract ESLint comments
 */
function parseImports(content) {
  const imports = [];
  const eslintComments = [];
  const lines = content.split('\n');
  let currentImport = '';
  let inImport = false;
  let importStartLine = -1;
  let foundFirstImport = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Check for ESLint comments (before and within imports section)
    if (
      line.startsWith('/* eslint-disable') ||
      line.startsWith('// eslint-disable')
    ) {
      eslintComments.push({
        comment: lines[i], // Keep original formatting with indentation
        line: i,
      });
      continue;
    }

    // Skip regular comments and empty lines
    if (
      (line.startsWith('//') && !line.startsWith('// eslint-disable')) ||
      (line.startsWith('/*') && !line.startsWith('/* eslint-disable')) ||
      line === ''
    ) {
      if (!foundFirstImport) {
        continue; // Skip comments before imports
      } else {
        // Skip category comments within import section (they will be regenerated)
        continue;
      }
    }

    // If we hit non-import content, break
    if (!line.startsWith('import') && !inImport && line !== '') {
      break;
    }

    if (line.startsWith('import')) {
      foundFirstImport = true;
      if (inImport) {
        // Finish previous import
        imports.push({
          statement: currentImport.trim(),
          startLine: importStartLine,
          endLine: i - 1,
        });
      }
      currentImport = line;
      inImport = true;
      importStartLine = i;

      // Check if import is complete on one line
      if (
        line.includes(';') ||
        (!line.includes('{') && line.includes('from'))
      ) {
        imports.push({
          statement: currentImport.trim(),
          startLine: importStartLine,
          endLine: i,
        });
        currentImport = '';
        inImport = false;
      }
    } else if (inImport) {
      currentImport += ' ' + line;

      // Check if import is complete
      if (line.includes(';')) {
        imports.push({
          statement: currentImport.trim(),
          startLine: importStartLine,
          endLine: i,
        });
        currentImport = '';
        inImport = false;
      }
    }
  }

  // Handle last import if not closed
  if (inImport && currentImport) {
    imports.push({
      statement: currentImport.trim(),
      startLine: importStartLine,
      endLine: lines.length - 1,
    });
  }

  return { imports, eslintComments };
}

/**
 * Extract module path from import statement
 */
function extractModulePath(importStatement) {
  const fromMatch = importStatement.match(/from\s+['"`]([^'"`]+)['"`]/);
  if (fromMatch) {
    return fromMatch[1];
  }

  // Handle import without from (e.g., import 'styles.css')
  const directMatch = importStatement.match(/import\s+['"`]([^'"`]+)['"`]/);
  if (directMatch) {
    return directMatch[1];
  }

  return '';
}

/**
 * Categorize import based on module path
 */
function categorizeImport(modulePath) {
  for (const category of IMPORT_CATEGORIES) {
    // Check exclude patterns first
    if (category.excludePatterns) {
      const isExcluded = category.excludePatterns.some(pattern =>
        pattern.test(modulePath),
      );
      if (isExcluded) continue;
    }

    // Check include patterns
    const matches = category.patterns.some(pattern => pattern.test(modulePath));
    if (matches) {
      return category;
    }
  }

  // Default to local if no category matches
  return (
    IMPORT_CATEGORIES.find(cat => cat.name === 'local') ||
    IMPORT_CATEGORIES[IMPORT_CATEGORIES.length - 1]
  );
}

/**
 * Sort imports within a category
 */
function sortImportsInCategory(imports, categoryName) {
  return imports.sort((a, b) => {
    const pathA = extractModulePath(a.statement);
    const pathB = extractModulePath(b.statement);

    // Special sorting for Components and Hooks category
    if (categoryName === 'components-hooks') {
      const getComponentsPriority = path => {
        if (/^@\/redux/.test(path)) return 1;
        if (/^@\/components/.test(path)) return 2;
        if (/^@\/hooks/.test(path)) return 3;
        if (/^@\/helper/.test(path)) return 4;
        if (/^@\/constant/.test(path)) return 5;
        if (/^@\/config/.test(path)) return 6;
        if (/^@\/theme/.test(path)) return 7;
        return 8;
      };

      const priorityA = getComponentsPriority(pathA);
      const priorityB = getComponentsPriority(pathB);

      if (priorityA !== priorityB) {
        return priorityA - priorityB;
      }
    }

    // Sort by path length first (shorter paths first)
    if (pathA.length !== pathB.length) {
      return pathA.length - pathB.length;
    }

    // Then alphabetically
    return pathA.localeCompare(pathB);
  });
}

/**
 * Process and sort imports
 */
function sortImports(content) {
  const { imports, eslintComments } = parseImports(content);

  if (imports.length === 0) {
    return content;
  }

  // Categorize imports
  const categorizedImports = {};

  imports.forEach(imp => {
    const modulePath = extractModulePath(imp.statement);
    const category = categorizeImport(modulePath);

    if (!categorizedImports[category.name]) {
      categorizedImports[category.name] = {
        category,
        imports: [],
      };
    }

    categorizedImports[category.name].imports.push(imp);
  });

  // Sort imports within each category
  Object.values(categorizedImports).forEach(cat => {
    cat.imports = sortImportsInCategory(cat.imports, cat.category.name);
  });

  // Generate new import section
  let newImportSection = '';
  const sortedCategories = Object.values(categorizedImports)
    .sort((a, b) => a.category.priority - b.category.priority)
    .filter(cat => cat.imports.length > 0);

  sortedCategories.forEach((cat, index) => {
    if (index > 0) {
      newImportSection += '\n';
    }

    newImportSection += cat.category.comment + '\n';
    cat.imports.forEach(imp => {
      newImportSection += imp.statement + '\n';
    });
  });

  // Find the end of imports section
  const lines = content.split('\n');
  let importEndLine = 0;

  if (imports.length > 0) {
    importEndLine = Math.max(...imports.map(imp => imp.endLine)) + 1;
  }

  // Skip any empty lines or comments after imports
  while (
    importEndLine < lines.length &&
    (lines[importEndLine].trim() === '' ||
      lines[importEndLine].trim().startsWith('//'))
  ) {
    importEndLine++;
  }

  // Prepare ESLint comments
  let allEslintComments = '';
  if (eslintComments.length > 0) {
    eslintComments.forEach(({ comment }) => {
      allEslintComments += comment + '\n';
    });
  }

  // Reconstruct file
  const restOfFile = lines.slice(importEndLine).join('\n');

  return allEslintComments + newImportSection + '\n' + restOfFile;
}

/**
 * Process a single file
 */
function processFile(filePath, quiet = false) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const sortedContent = sortImports(content);

    if (content !== sortedContent) {
      fs.writeFileSync(filePath, sortedContent, 'utf8');
      if (!quiet) {
        console.log(`✅ Sorted imports in: ${filePath}`);
      }
      return true;
    } else {
      if (!quiet) {
        console.log(`ℹ️  No changes needed: ${filePath}`);
      }
      return false;
    }
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    return false;
  }
}

/**
 * Process directory recursively
 */
function processDirectory(
  dirPath,
  extensions = ['.ts', '.tsx', '.js', '.jsx'],
) {
  let processedCount = 0;
  let changedCount = 0;

  function walkDir(currentPath) {
    const items = fs.readdirSync(currentPath);

    for (const item of items) {
      const fullPath = path.join(currentPath, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        // Skip node_modules, .git, and build directories
        if (
          !['node_modules', '.git', 'dist', 'build', '.next'].includes(item)
        ) {
          walkDir(fullPath);
        }
      } else if (stat.isFile()) {
        const ext = path.extname(fullPath);
        if (extensions.includes(ext)) {
          processedCount++;
          const changed = processFile(fullPath);
          if (changed) changedCount++;
        }
      }
    }
  }

  walkDir(dirPath);

  console.log(`\n📊 Summary:`);
  console.log(`   Processed: ${processedCount} files`);
  console.log(`   Changed: ${changedCount} files`);
}

/**
 * Main function
 */
function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log(`
🔧 Import Sorter Script

Usage:
  node sort-imports.cjs <file-or-directory> [options]
  node sort-imports.cjs <file1> <file2> ... [options]

Examples:
  node sort-imports.cjs src/
  node sort-imports.cjs src/app/modules/hr/
  node sort-imports.cjs src/components/MyComponent.tsx
  node sort-imports.cjs file1.tsx file2.tsx file3.tsx

Options:
  --extensions <ext1,ext2>  File extensions to process (default: .ts,.tsx,.js,.jsx)
  --help                    Show this help message

The script will:
  1. Parse import statements
  2. Categorize them based on path patterns
  3. Sort within categories
  4. Add appropriate comments
  5. Rewrite files with organized imports
`);
    process.exit(0);
  }

  if (args[0] === '--help') {
    return;
  }

  // Parse extensions
  let extensions = ['.ts', '.tsx', '.js', '.jsx'];
  const extIndex = args.indexOf('--extensions');
  let targets = args;

  if (extIndex !== -1) {
    if (args[extIndex + 1]) {
      extensions = args[extIndex + 1]
        .split(',')
        .map(ext =>
          ext.trim().startsWith('.') ? ext.trim() : '.' + ext.trim(),
        );
    }
    // Remove --extensions and its value from targets
    targets = args.filter(
      (arg, index) => index !== extIndex && index !== extIndex + 1,
    );
  }

  // Handle multiple files (from lint-staged) or single target
  if (targets.length > 1) {
    // Multiple files passed (lint-staged scenario) - run quietly
    let processedCount = 0;
    let changedCount = 0;

    targets.forEach(target => {
      const targetPath = path.resolve(target);

      if (fs.existsSync(targetPath)) {
        const stat = fs.statSync(targetPath);
        if (stat.isFile()) {
          const ext = path.extname(targetPath);
          if (extensions.includes(ext)) {
            processedCount++;
            const changed = processFile(targetPath, true); // quiet mode
            if (changed) changedCount++;
          }
        }
      }
    });

    // Only show summary if files were changed
    if (changedCount > 0) {
      console.log(
        `✅ Import sorting: ${changedCount}/${processedCount} files updated`,
      );
    }
  } else {
    // Single target (directory or file)
    const target = targets[0];
    const targetPath = path.resolve(target);

    if (!fs.existsSync(targetPath)) {
      console.error(`❌ Path does not exist: ${targetPath}`);
      process.exit(1);
    }

    const stat = fs.statSync(targetPath);

    console.log(`🚀 Starting import organization...`);
    console.log(`📁 Target: ${targetPath}`);
    console.log(`🔍 Extensions: ${extensions.join(', ')}`);
    console.log('');

    if (stat.isFile()) {
      const ext = path.extname(targetPath);
      if (extensions.includes(ext)) {
        processFile(targetPath);
      } else {
        console.error(`❌ File extension ${ext} not supported`);
        process.exit(1);
      }
    } else if (stat.isDirectory()) {
      processDirectory(targetPath, extensions);
    }
  }

  console.log('\n✨ Import organization completed!');
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { sortImports, processFile, processDirectory };

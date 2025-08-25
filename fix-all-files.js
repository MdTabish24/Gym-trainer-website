const fs = require('fs');
const path = require('path');

// Function to fix broken lines in files
function fixFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Fix broken import statements
    content = content.replace(/import\s+([^'"\n]+)\s+from\s+['"]([^'"]*)\n([^'"]*)['"]/g, 
      "import $1 from '$2$3'");
    
    // Fix broken string literals
    content = content.replace(/(['"])[^'"]*\n[^'"]*\1/g, (match) => {
      return match.replace(/\n\s*/g, '');
    });
    
    // Fix broken JSX attributes
    content = content.replace(/(\w+)=\s*\n\s*{/g, '$1={');
    
    // Fix broken function calls
    content = content.replace(/(\w+)\(\s*\n\s*/g, '$1(');
    
    // Fix broken object properties
    content = content.replace(/{\s*\n\s*(\w+):/g, '{ $1:');
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed: ${filePath}`);
  } catch (error) {
    console.error(`Error fixing ${filePath}:`, error.message);
  }
}

// Get all JS/JSX files
function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && !file.includes('node_modules')) {
      getAllFiles(filePath, fileList);
    } else if (file.match(/\.(js|jsx|ts|tsx)$/)) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// Fix all files
const srcDir = path.join(__dirname, 'src');
const allFiles = getAllFiles(srcDir);

console.log('Fixing all JavaScript/JSX files...');
allFiles.forEach(fixFile);
console.log('All files fixed!');
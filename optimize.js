const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function optimizeBreakfast() {
  const dir = 'media/BreakFast';
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.jpg'));
  
  let totalBefore = 0;
  let totalAfter = 0;

  for (const file of files) {
    const input = path.join(dir, file);
    const output = path.join(dir, file.replace('.jpg', '.webp'));
    
    const beforeSize = fs.statSync(input).size;
    totalBefore += beforeSize;

    await sharp(input)
      .resize({ width: 1200, withoutEnlargement: true })
      .webp({ quality: 78 })
      .toFile(output);
    
    const afterSize = fs.statSync(output).size;
    totalAfter += afterSize;
    
    console.log(`${file}: ${(beforeSize/1024).toFixed(0)}KB → ${(afterSize/1024).toFixed(0)}KB`);
  }

  console.log(`\nTotal: ${(totalBefore/1024/1024).toFixed(2)}MB → ${(totalAfter/1024/1024).toFixed(2)}MB`);
  console.log(`Saved: ${((1 - totalAfter/totalBefore) * 100).toFixed(1)}%`);
}

optimizeBreakfast().catch(console.error);

const sharp = require('sharp');
const fs = require('fs');

async function optimizeImages() {
  const images = ['media/New_Pictures/Slika_2.jpg', 'media/New_Pictures/Slika_6.jpg'];
  
  for (const img of images) {
    const output = img.replace('.jpg', '.webp');
    await sharp(img)
      .webp({ quality: 80 })
      .toFile(output);
    console.log(`Optimized ${img} to ${output}`);
    
    // Check sizes
    const before = fs.statSync(img).size;
    const after = fs.statSync(output).size;
    console.log(`Size reduced from ${(before/1024).toFixed(2)}KB to ${(after/1024).toFixed(2)}KB`);
  }
}

optimizeImages().catch(console.error);

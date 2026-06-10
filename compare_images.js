const fs = require('fs');
const {PNG} = require('pngjs');
const pixelmatch = require('pixelmatch');
const img1 = PNG.sync.read(fs.readFileSync('landing page.png'));
const img2 = PNG.sync.read(fs.readFileSync('rendered_screenshot.png'));
if (img1.width !== img2.width || img1.height !== img2.height) {
  console.log('size-mismatch', img1.width, img1.height, img2.width, img2.height);
  process.exit(0);
}
const diff = new PNG({width: img1.width, height: img1.height});
const mismatches = pixelmatch(img1.data, img2.data, diff.data, img1.width, img1.height, {threshold: 0.1});
fs.writeFileSync('diff.png', PNG.sync.write(diff));
console.log('mismatches', mismatches, 'pixels');
console.log('percent', (mismatches/(img1.width*img1.height)*100).toFixed(4)+'%');

import { test } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';

test('эталон | мой вариант | диф — 1920×1893', async ({ page }) => {
  const outDir = path.resolve('test-results');
  fs.mkdirSync(outDir, { recursive: true });

  await page.setViewportSize({ width: 1920, height: 1893 });
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  const actualBuf = await page.screenshot({ fullPage: true });

  const refBuf = fs.readFileSync(path.resolve('Test Task.png'));

  fs.writeFileSync(path.join(outDir, 'эталон-1920x1893.png'), refBuf);
  fs.writeFileSync(path.join(outDir, 'мой-вариант-1920x1893.png'), actualBuf);

  const ref    = PNG.sync.read(refBuf);
  const actual = PNG.sync.read(actualBuf);

  const width  = Math.min(ref.width,  actual.width);
  const height = Math.min(ref.height, actual.height);

  const diff = new PNG({ width, height });

  const mismatch = pixelmatch(
    ref.data.subarray(0, width * height * 4),
    actual.data.subarray(0, width * height * 4),
    diff.data,
    width,
    height,
    { threshold: 0.1, includeAA: false }
  );

  fs.writeFileSync(
    path.join(outDir, 'диф-1920x1893.png'),
    PNG.sync.write(diff)
  );

  const totalPixels = width * height;
  const matchPct    = ((1 - mismatch / totalPixels) * 100).toFixed(2);
  console.log(`\nPixel match: ${matchPct}%  (diff pixels: ${mismatch} / ${totalPixels})`);
});

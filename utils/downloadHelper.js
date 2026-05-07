const fs = require('fs');
const path = require('path');

async function downloadFileByClick(page, clickFn, downloadDir, timeout = 30000) {
  if (!fs.existsSync(downloadDir)) {
    fs.mkdirSync(downloadDir, { recursive: true });
  }

  const downloadPromise = page.waitForEvent('download', { timeout });
  await clickFn();
  const download = await downloadPromise;

  const fileName = download.suggestedFilename();
  const filePath = path.join(downloadDir, fileName);

  await download.saveAs(filePath);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Download failed, file not found at: ${filePath}`);
  }

  return filePath;
}

module.exports = { downloadFileByClick };

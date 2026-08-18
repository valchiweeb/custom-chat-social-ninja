const https = require('https');

https.get('https://socialstream.ninja/index.html?session=PsGCudEbvR', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    // Print lines containing 'hl-'
    const lines = data.split('\n');
    lines.forEach((line, i) => {
      if (line.includes('hl-')) {
        console.log(`Line ${i}:`, line.trim());
      }
    });
  });
});

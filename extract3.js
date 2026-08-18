const https = require('https');

https.get('https://socialstream.ninja/dock.html?session=PsGCudEbvR', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    // Print lines containing 'index.html'
    const lines = data.split('\n');
    lines.forEach((line, i) => {
      if (line.includes('index.html') || line.includes('chat.html') || line.includes('popout.html')) {
        console.log(`Line ${i}:`, line.trim());
      }
    });
  });
});

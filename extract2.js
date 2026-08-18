const https = require('https');

https.get('https://socialstream.ninja/dock.html?session=PsGCudEbvR', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    // Print the context around "popout.html" or "popout"
    const idx = data.indexOf('popout');
    if (idx !== -1) {
      console.log(data.slice(Math.max(0, idx - 100), idx + 200));
    }
    const idx2 = data.indexOf('chat.html');
    if (idx2 !== -1) {
      console.log(data.slice(Math.max(0, idx2 - 100), idx2 + 200));
    }
  });
});

const https = require('https');

https.get('https://socialstream.ninja/dock.html?session=PsGCudEbvR', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    // Find any hrefs that contain session=
    const matches = data.match(/href=["']([^"']*session=[^"']*)["']/g);
    console.log("Found links with session:");
    if (matches) {
      console.log(matches.map(m => m.replace(/href=["']|["']/g, '')));
    } else {
      console.log("No matches found");
    }
    
    // Check if popout is in the html
    console.log("Contains popout:", data.includes('popout'));
    console.log("Contains chat:", data.includes('chat'));
  });
});

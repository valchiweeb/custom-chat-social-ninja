const fetch = require('node-fetch') || function(url) {
  return new Promise((resolve) => {
    require('https').get(url, (res) => {
      let data = ''
      res.on('data', c => data+=c)
      res.on('end', () => resolve({text: () => data}))
    })
  })
}

fetch('https://socialstream.ninja/dock.html?session=PsGCudEbvR').then(r=>r.text()).then(t => {
  const matches = t.match(/[a-zA-Z0-9_-]+\.html/g)
  console.log([...new Set(matches)])
})

import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import express from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      webSecurity: false,
      webviewTag: true
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  // Strip headers that prevent iframe embedding
  const { session } = require('electron')
  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    const headers = Object.assign({}, details.responseHeaders)
    delete headers['x-frame-options']
    delete headers['X-Frame-Options']
    delete headers['content-security-policy']
    delete headers['Content-Security-Policy']
    callback({
      cancel: false,
      responseHeaders: headers
    })
  })

  // Start Express Proxy Server
  let currentCSS = ''
  ipcMain.on('update-css', (_, css) => {
    currentCSS = css
  })

  const proxyApp = express()

  proxyApp.get('/overlay', async (req, res) => {
    try {
      // Build the full SSN URL by appending all incoming query parameters
      const urlObj = new URL(req.url, 'http://localhost')
      const searchParams = urlObj.searchParams.toString()
      const ssnUrl = `https://socialstream.ninja/index.html?${searchParams}`

      const response = await fetch(ssnUrl, {
        headers: {
          'Accept-Encoding': 'identity'
        }
      })
      
      let html = await response.text()
      
      // Inject base href so relative assets load from socialstream.ninja
      html = html.replace('<head>', '<head><base href="https://socialstream.ninja/">')
      
      // Inject our dynamic CSS
      if (currentCSS) {
        html = html.replace('</head>', `<style id="rv-injected">${currentCSS}</style></head>`)
      }
      
      res.send(html)
    } catch (err) {
      console.error('Proxy Error:', err)
      res.status(500).send('Error loading overlay')
    }
  })

  // Also proxy everything else (assets, sockets) back to SSN
  proxyApp.use(
    '/',
    createProxyMiddleware({
      target: 'https://socialstream.ninja',
      changeOrigin: true,
      secure: false,
      ws: true
    })
  )

  proxyApp.listen(3333, () => {
    console.log('Proxy server running on http://localhost:3333')
  })

  ipcMain.on('open-overlay', () => {
    const overlayWindow = new BrowserWindow({
      width: 400,
      height: 600,
      transparent: true,
      frame: false,
      alwaysOnTop: true,
      hasShadow: false,
      webPreferences: {
        preload: join(__dirname, '../preload/index.js'),
        sandbox: false,
        webSecurity: false,
        webviewTag: true
      }
    })

    if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
      overlayWindow.loadURL(process.env['ELECTRON_RENDERER_URL'] + '?overlay=true')
    } else {
      overlayWindow.loadFile(join(__dirname, '../renderer/index.html'), { query: { overlay: 'true' } })
    }
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

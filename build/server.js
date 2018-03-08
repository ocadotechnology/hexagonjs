var browserSync
function get () {
  if (!browserSync) {
    browserSync = require('browser-sync').create()
  }
  return browserSync
}

exports.server = function (config) {
  config = config || {}
  get().init({
    port: config.port || 9000,
    server: {
      baseDir: './target/site',
    },
    reloadOnRestart: true,
    notify: false,
    online: false,
    open: false,
    ui: {
      port: config.liveReloadPort || 9001,
      weinre: {
        port: (config.liveReloadPort || 9001) + 1
      }
    }
  })
}

exports.refresh = function () {
  get().reload()
}

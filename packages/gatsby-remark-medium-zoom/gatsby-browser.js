const mediumZoom = require('medium-zoom')

let initialized = false

exports.onRouteUpdate = (_, options) => {
  console.log(options)
  if (!initialized) {
    const style = document.createElement('style')

    style.setAttribute('type', 'text/css')

    style.innerHTML =
      '.medium-zoom-overlay{z-index: 3}.medium-zoom-image--opened{z-index:4}'

    document.head.appendChild(style)

    initialized = true
  }

  setTimeout(() => mediumZoom.default('[data-zoomable]', options), 100)
}

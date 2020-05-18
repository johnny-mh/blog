const mediumZoom = require('medium-zoom')

if (!Element.prototype.matches) {
  Element.prototype.matches =
    Element.prototype.msMatchesSelector ||
    Element.prototype.webkitMatchesSelector
}

let initialized = false

exports.onRouteUpdate = () => {
  if (!initialized) {
    const style = document.createElement('style')

    style.setAttribute('type', 'text/css')

    style.innerHTML =
      '.medium-zoom-overlay{z-index: 3}.medium-zoom-image--opened {z-index:4}'

    document.head.appendChild(style)

    initialized = true
  }

  setTimeout(
    () =>
      mediumZoom.default('[data-zoomable]', {
        margin: 200,
        background: '#fff',
      }),
    100
  )
}

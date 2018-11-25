function playVideo() {
  var videoWrapper = document.querySelector('[data-video-wrapper]')

  if (!videoWrapper) {
    return
  }
  var videoIframe = document.querySelector('[data-video-wrapper] iframe'),
    videoSrc = videoIframe.dataset.src

  function showVideo(e) {
    e.preventDefault()
    videoWrapper.classList.add('is-video-active')
    videoIframe.src = videoSrc
    document.body.classList.add('is-video-playing')
    videoWrapper.tabIndex = -1
    videoWrapper.style.outline = 0
    videoWrapper.focus()
  }

  function hideVideo(e) {
    e.preventDefault()
    videoWrapper.classList.remove('is-video-active')
    videoIframe.src = ''
    document.body.classList.remove('is-video-playing')
  }
  document
    .querySelector('[data-playvideo-button]')
    .addEventListener('click', showVideo)
  document
    .querySelector('[data-closevideo]')
    .addEventListener('click', hideVideo)
  document
    .querySelector('[data-video-wrapper]')
    .addEventListener('click', hideVideo)
}

playVideo()

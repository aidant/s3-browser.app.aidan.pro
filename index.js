window.addEventListener('load', () => {
  const s3browser = document.querySelector('#application > s3-browser')
  const bucket = new URLSearchParams(window.location.search).get('bucket')
  s3browser.dataset.bucket = bucket
})

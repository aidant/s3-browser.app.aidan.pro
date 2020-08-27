window.addEventListener('load', () => {
  const inputQuery = document.querySelector('#application > input[is="input-query"]')
  const s3browser = document.querySelector('#application > s3-browser')
  s3browser.dataset.bucket = inputQuery.value
  inputQuery.addEventListener('change', () => {
    const isValid = inputQuery.checkValidity()
    if (!isValid) return
    s3browser.dataset.bucket = inputQuery.value
  })
})

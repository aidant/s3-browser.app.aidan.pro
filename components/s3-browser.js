const formatSize = (size) => {
  if (size < 1024 ** 1) return `${(size / 1024 ** 0).toFixed(1)} B`
  if (size < 1024 ** 2) return `${(size / 1024 ** 1).toFixed(1)} KB`
  if (size < 1024 ** 3) return `${(size / 1024 ** 2).toFixed(1)} MB`
  if (size < 1024 ** 4) return `${(size / 1024 ** 3).toFixed(1)} GB`
  if (size < 1024 ** 5) return `${(size / 1024 ** 4).toFixed(1)} TB`
  return `${(size / 1024 ** 5).toFixed(1)} PB`
}

class S3Browser extends HTMLElement {
  static get observedAttributes () {
    return ['data-bucket']
  }

  async attributeChangedCallback (name, _, bucket) {
    if (name !== 'data-bucket') return
    this.innerHTML = ''
    if (!bucket) return

    const response = await fetch(bucket)
    const text = await response.text()
    const xml = new DOMParser().parseFromString(text, 'application/xml')


    for (const contents of xml.querySelectorAll('Contents')) {
      const key = contents.querySelector('Key').textContent
      const size = contents.querySelector('Size').textContent

      const span = this.appendChild(document.createElement('span'))
      span.textContent = formatSize(size)

      const a = this.appendChild(document.createElement('a'))
      a.href = new URL(key, bucket).href
      a.textContent = key
    }
  }
}

window.customElements.define('s3-browser', S3Browser)

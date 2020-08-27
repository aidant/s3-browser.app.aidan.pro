class InputQuery extends HTMLInputElement {
  _handleChange (event) {
    if (!event.isTrusted) return
    const isValid = this.checkValidity()
    if (!isValid) return
    window.history.pushState({ bucket: this.value }, null, '?bucket=' + this.value)
  }

  _handlePopState () {
    const url = new URL(window.location.href)
    const value = url.searchParams.get(this.name) || ''
    this.value = value
    const event = document.createEvent('Event')
    event.initEvent('change', true, true)
    this.dispatchEvent(event)
  }

  constructor () {
    super()
    this._handleChange = this._handleChange.bind(this)
    this._handlePopState = this._handlePopState.bind(this)
  }

  connectedCallback () {
    window.addEventListener('popstate', this._handlePopState)
    this.addEventListener('change', this._handleChange)

    this._handlePopState()
  }

  disconnectedCallback () {
    window.removeEventListener('popstate', this._handlePopState)
    this.addEventListener('change', this._handleChange)
  }
}

window.customElements.define('input-query', InputQuery, { extends: 'input' })

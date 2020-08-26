async function * getBucketList (bucket) {
  const response = await fetch(bucket)
  const text = await response.text()
  const parser = new DOMParser()
  const xml = parser.parseFromString(text, 'application/xml')

  for (const key of xml.querySelectorAll('Contents > Key')) {
    yield key.textContent
  }
}

const renderBucketList = async (bucket, list) => {
  for await (const key of getBucketList(bucket)) {
    const li = document.createElement('li')
    list.append(li)
    const a = document.createElement('a')
    li.append(a)
    a.href = new URL(key, bucket).href
    a.textContent = key
  }
}

const renderBucketListFromHash = async ()  => {
  const bucket = new URL(window.location.hash.substring(1)).href

  const list = document.createElement('ul')
  list.id = 'contents'
  document.querySelector('#contents').replaceWith(list)

  renderBucketList(bucket, list)
}

window.addEventListener('hashchange', renderBucketListFromHash)
window.addEventListener('load', renderBucketListFromHash)

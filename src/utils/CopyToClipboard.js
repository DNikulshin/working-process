export default async function copyToClipboard (e) {
  await navigator.clipboard.writeText(e.target.innerText.trim())
  if (e.target.closest('td')) {
    const temp = e.target.innerText.trim()
    e.target.innerHTML += '<p class="text-success copy-target">copy</p>'
    e.target.closest('td').classList.add('copy')
    setTimeout(() => {
      e.target.innerHTML = temp
      e.target.closest('td').classList.remove('copy')
    }, 300)
  }
}

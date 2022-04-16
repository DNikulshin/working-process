import { ref } from 'vue'

export default function scrollPosition () {
  const prevScrollpos = ref(window.pageYOffset)
  window.onscroll = function () {
    const currentScrollPos = ref(window.pageYOffset)
    if (document.querySelector('.searchPos')) {
      if (prevScrollpos.value > currentScrollPos.value) {
        document.querySelector('.searchPos').classList.remove('hide')
      } else {
        document.querySelector('.searchPos').classList.add('hide')
      }
    }
    prevScrollpos.value = currentScrollPos.value
  }
}

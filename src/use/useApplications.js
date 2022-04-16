import { ref } from 'vue'
import { useStore } from 'vuex'
import { URL_CLAIM } from '../env.json'
import interactionBrowser from '../utils/pupetter'

export default function useApplications () {
  const store = useStore()
  const listItems = ref([])
  const getDataFromWebsite = async () => {
    let flag = true
    let counter = 1
    const {
      page,
      browser,
      checkAuth
    } = await interactionBrowser(true)
    await checkAuth(URL_CLAIM)
    try {
      while (flag) {
        await page.goto(`${URL_CLAIM}${counter}`, {
          waitUntil: 'networkidle2',
          timeout: 1000 * 300
        })
        const html = await page.$$eval('.claim-list > table > tbody > tr', item => item.map(el => {
          const dateFormat = (str) => {
            const hDozens = str[11]
            const hUnits = str[12]
            const hTotal = hDozens + hUnits
            let hEdit = hTotal - 2
            switch (hTotal) {
              case '00':
                hEdit = '22'
                break
              case '01':
                hEdit = '23'
                break
              default:
                hEdit = hEdit <= 9 ? `0${hEdit}` : hEdit
            }
            const startStr = str.slice(0, 11)
            const endStr = str.slice(-3)
            return startStr + hEdit + endStr
          }
          const date = dateFormat(el.querySelector('td.cell.cell--date').innerText.trim())
          const id = (el) => el.includes('.') ? el.slice(0, -5) : el
          const shop = (el) => el.slice(1).split(' ')[0]
          return {
            date,
            id: id(el.querySelector('td.cell.cell--num').innerText.trim()),
            shop: shop(el.querySelector('td.cell.cell--adres').innerText.trim()),
            address: el.querySelector('td.cell.cell--adres').innerText.trim(),
            department: el.querySelector('td.cell.cell--department').innerText.trim(),
            text: el.querySelector('td.cell.cell--text').innerText.trim(),
            type: el.querySelector('td.cell.cell--type')
          }
        }))
        const paginationNext = await page.evaluate(() => {
          return document.querySelector('.bl_pagination > ul > li.page.page--next')
        })
        listItems.value.push(html)
        listItems.value = listItems.value.flat()
        if (!paginationNext) flag = false
        counter++
      }
    } catch (e) {
      await browser.close()
      console.log(e)
    }
    await browser.close()
  }
  const actionClaim = async (action, id, data) => {
    const {
      checkAuth,
      page,
      browser
    } = await interactionBrowser(false)
    const link = `http://gradus-nik.ru/claim/${id}/?action=set_accept&accept=`
    await checkAuth(link + action)
    const linkAction = async () => {
      await page.goto(link + action)
      if (action === 0) {
        await page.click('textarea[name="PROPERTY[142]"]')
        await page.type('textarea[name="PROPERTY[142]"]', data)
      }
      // await page.click('input[name="submit"]')
      await browser.close()
      store.commit('applications/filterItems', id)
    }
    await linkAction()
  }
  return {
    getDataFromWebsite,
    actionClaim,
    listItems
  }
}

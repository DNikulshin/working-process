import useOs from '../use/useOs'
import { LOGIN, PASS } from '../env.json'

const puppeteer = window.require('puppeteer')
const { remote } = window.require('electron')
const fs = window.require('fs')
const path = require('path')

const pathFileCookies = path.join(remote.app.getPath('userData'), 'cookies.json')

export default async function interactionBrowser (hl) {
  const { userName } = useOs()
  const settings = {
    headless: hl,
    slowMo: 10,
    args: [
      '--start-maximized'
    ],
    defaultViewport: null,
    timeout: 1000 * 300,
    ignoreHTTPSErrors: true,
    ignoreDefaultArgs: ['--disable-extensions'],
    executablePath: `C:\\Users\\${userName.value}\\AppData\\Local\\Programs\\working-process\\resources\\app.asar.unpacked\\node_modules\\puppeteer\\.local-chromium\\win64-970485\\chrome-win\\chrome.exe`
  }
  const browser = await puppeteer.launch(settings)
  const page = await browser.newPage()
  const existFile = fs.existsSync(pathFileCookies)
  const readCookies = async () => {
    fs.readFile(pathFileCookies, 'utf-8', async function (err, data) {
      if (err) {
        console.log('readCookies', ' existFile', existFile)
        throw err
      }
      const deserializedCookies = JSON.parse(data)
      if (deserializedCookies.length !== 0) {
        for (const cookie of deserializedCookies) {
          await page.setCookie(cookie)
        }
      }
      console.log('readCookies', ' existFile', existFile)
    })
  }
  const writeCookies = async () => {
    const cookies = await page.cookies()
    fs.writeFile(pathFileCookies, JSON.stringify(cookies, null, 2), function (err) {
      if (err) throw err
      console.log('writeCookies', 'existFile', existFile)
    })
  }
  const checkAuthUser = async (link) => {
    await readCookies()
    await page.goto(link)
    const header = await page.$eval('header', (el) => el.textContent)
    const headerUserIsIp = async () => {
      try {
        const user = await page.$eval('.header-user strong', (el) => el.textContent)
        return user.includes('ip')
      } catch (e) {
      }
    }
    if (header === '') {
      await login()
      await writeCookies()
    } else {

    }
    if (await headerUserIsIp()) {
      await page.click('.logout')
      await login()
      await writeCookies()
    }
  }
  const login = async () => {
    await page.waitForSelector('.authorize-form', { visible: true, timeout: 0 })
    await page.click('#USER_LOGIN')
    await page.type('#USER_LOGIN', LOGIN)
    await page.click('#USER_PASSWORD')
    await page.type('#USER_PASSWORD', PASS)
    await page.click('input[name="USER_REMEMBER"]')
    await page.click('input[name="Login"]')
  }
  const checkAuth = async (link) => {
    try {
      await checkAuthUser(link)
    } catch (e) {
      // await page.goto('https://gradus-nik.ru/auth/index.php')
      await login()
      await writeCookies()
      console.log('writeCookies', 'existFile', existFile)
      console.log(e.message)
    }
  }
  return {
    checkAuth,
    browser,
    page
  }
}

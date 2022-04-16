const { ref } = require('vue')
const fs = window.require('fs')
const path = require('path')
const { remote } = window.require('electron')
const cheerio = require('cheerio')

const isNotExist = ref(true)
const pathFolder = path.join(remote.app.getPath('desktop'), 'tmc_rm')
export default function useDataFile (fileName) {
  const basePathFile = (fileName) => path.join(remote.app.getPath('desktop'), 'tmc_rm', fileName)
  const resultArray = ref([])
  const checkExistFolder = () => {
    fs.access(pathFolder, err => {
      if (err) {
        fs.mkdir(pathFolder, err => {
          console.log(err)
          console.log('Папка успешно создана: ', pathFolder)
        })
      }
    })
  }
  checkExistFolder()
  const checkExistFile = () => {
    fs.access(basePathFile(fileName), err => {
      if (err) {
        isNotExist.value = true
        fs.writeFile(basePathFile(fileName), '', err => {
          console.log(err)
          console.log(`Файл: ${fileName} создан`)
        })
      } else {
        isNotExist.value = false
      }
    })
  }
  checkExistFile()
  const readFile = () => {
    try {
      const data = fs.readFileSync(basePathFile(fileName), 'utf8')
      const $ = cheerio.load(data.replaceAll('&nbsp;', ' '))
      $('tr').each(function () {
        const id = $(this).find('td:nth-child(2)').text().replace(/\s/g, '').trim()
        const name = $(this).find('td:nth-child(3)').text().trim()
        const count = $(this).find('td:nth-child(4)').text().replace(/\s/g, '').trim()
        resultArray.value.push({
          name,
          id,
          count
        })
      })
    } catch (e) {
      console.log(e)
    }
  }
  // const getDataFile = (patchFile) => {
  //   // const data = fs.readFileSync(patchFile, 'utf8')
  //   // fs.writeFileSync(basePathFile(fileName), data)
  //   console.log('copy ok')
  //   console.log(patchFile)
  //   // console.log(resultArray.value)
  // }
  return {
    readFile,
    resultArray,
    pathFolder,
    isNotExist
  }
}

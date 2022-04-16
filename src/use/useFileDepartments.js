const fs = window.require('fs')
const path = require('path')
const { remote } = window.require('electron')
const cheerio = require('cheerio')
const { ref } = require('vue')

const pathFolder = path.join(remote.app.getPath('desktop'), 'tmc_rm')
const isNotExist = ref(true)

export default function useDataFileDepartments () {
  const resultArray = ref([])
  const pathFilePrometey = path.join(remote.app.getPath('desktop'), 'tmc_rm', 'prometey.htm')
  const pathFilePrometey2 = path.join(remote.app.getPath('desktop'), 'tmc_rm', 'prometey2.htm')
  const checkExistFolder = () => {
    fs.access(pathFolder, err => {
      if (err) {
        fs.mkdir(pathFolder, err => {
          if (err) throw err // не удалось создать папку
          console.log('Папка успешно создана: ', pathFolder)
        })
      }
    })
  }
  checkExistFolder()
  const checkExistFile = (patchFile) => {
    patchFile.forEach(el => {
      fs.access(el, (err) => {
        if (err) {
          isNotExist.value = true
          console.log(`file: ${el} does not exist.`, `isNotExist: ${isNotExist.value}`)
          fs.writeFile(el, '', err => {
            if (err) throw err // не удалось создать файл
            console.log(`Файл: ${el} создан`)
          })
        } else {
          isNotExist.value = false
        }
      })
    })
  }
  checkExistFile([pathFilePrometey, pathFilePrometey2])
  const readFile = () => {
    try {
      isNotExist.value = false
      const fileContent = fs.readFileSync((pathFilePrometey), 'utf8')
      const fileContent2 = fs.readFileSync((pathFilePrometey2), 'utf8')
      const departments = fileContent + fileContent2
      const $ = cheerio.load(departments.replaceAll('&nbsp;', ' '))
      $('tr').each(function (idx) {
        const name = $(this).find('td:nth-child(1)').text().trim()
        const id = $(this).find('td:nth-child(2)').text().trim()
        resultArray.value.push({
          id,
          name
        })
      })
    } catch (e) {
      console.log(e)
      isNotExist.value = false
    }
  }
  console.log('isNotExist', isNotExist.value)
  return {
    readFile,
    resultArray,
    pathFolder,
    isNotExist
  }
}

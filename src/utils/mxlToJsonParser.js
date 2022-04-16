const { remote } = window.require('electron')
const parser = window.require('xml-js')
const fs = window.require('fs')
const path = window.require('path')
const JSZip = window.require('jszip')

const pathFileMxl = path.join(remote.app.getPath('desktop'), 'tmc_rm', 'tmc.mxl')
const pathFileJson = path.join(remote.app.getPath('desktop'), 'tmc_rm', 'tmc.json')
const pathFileScope = path.join(remote.app.getPath('desktop'), 'tmc_rm', 'scope.xml')

export default function convert () {
  fs.readFile(pathFileMxl, function (err, data) {
    if (err) throw err
    JSZip.loadAsync(data).then(function (zip) {
      zip.file(pathFileScope).async('string').then(function (data) {
        const json = parser.xml2json(data, { compact: false, spaces: 4 })
        fs.writeFile(pathFileJson, JSON.stringify(json, null, 4), function (err) {
          if (err) {
            console.log(err)
          } else {
            console.log('JSON saved to ' + pathFileJson)
          }
        })
      })
    })
  })
  return 0
}

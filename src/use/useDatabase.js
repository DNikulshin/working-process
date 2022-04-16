const Datastore = require('nedb-promise')
const path = require('path')
const { remote } = window.require('electron')

const pathFile = path.join(remote.app.getPath('userData'), 'database.db')

export default function useDatabase () {
  const DB = Datastore({
    filename: pathFile,
    autoload: true
  })
  const addData = async (data) => await DB.insert(
    {
      description: data,
      timestamp: new Date().toLocaleString(),
      status: 'создано'
    })
  const getAllData = async () => await DB.cfind({}).exec() || {}
  const removeData = async () => await DB.remove({})
  // const updateData = async (data) => await DB.update({ description: data, status: 'обновлено' })
  return {
    addData,
    getAllData,
    removeData
    // updateData
  }
}

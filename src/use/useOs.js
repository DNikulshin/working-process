import { ref, reactive } from 'vue'

const {
  userInfo,
  hostname,
  uptime
} = window.require('os')
export default function useOs () {
  const userName = ref(userInfo().username)
  const hostName = ref(hostname())
  const dateTime = ref(null)
  const upTime = reactive({
    hours: 0,
    minute: 0
  })
  const SET_TIME_MS = 1000
  setInterval(() => {
    upTime.hours = Math.floor(uptime / 60 / 60)
    upTime.minutes = Math.floor(uptime / 60)
  }, SET_TIME_MS)
  setInterval(() => {
    dateTime.value = new Date().toLocaleString()
  }, SET_TIME_MS)
  return {
    userName,
    hostName,
    upTime,
    dateTime
  }
}

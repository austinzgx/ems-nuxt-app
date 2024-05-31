import { defineStore } from 'pinia'
import { useSystemStore } from './system'

const time = useDateFormat(useNow(), 'YYYY-MM-DD HH:mm:ss')

export const useMatricStore = defineStore('matric', () => {
  const systemStore = useSystemStore()

  const sp_url = `http://${systemStore.host}:${systemStore.flask_port}`
  function getMatric(name: string) {
    const params = systemStore.data.filter(i => i.name === name)[0].params
    const data = $fetch(`${sp_url}/api/sp`, {
      method: 'POST',
      body: params,
    })
    return data
  }
  function changeSize(name: string, type: string) {
    const params = systemStore.data.filter(i => i.name === name)[0].params
    const data = $fetch(`${sp_url}/api/sp`, {
      method: 'POST',
      body: {
        ...params,
        size: type,
      },
    })
    return data
  }
  return {
    getMatric,
    changeSize,
  }
})

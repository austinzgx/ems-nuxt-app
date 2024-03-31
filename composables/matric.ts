import { defineStore } from 'pinia'

const time = useDateFormat(useNow(), 'YYYY-MM-DD HH:mm:ss')

export const useMatricStore = defineStore('matric', () => {
  const normStore = useNormStore()
  const systemStore = useSystemStore()

  const sp_url = `http://${systemStore.host}:${systemStore.flask_port}`
  function getMatric(name: string) {
    const params = normStore.state.filter(i => i.name === name)[0].params
    const data = $fetch(`${sp_url}/api/sp`, {
      method: 'POST',
      body: params,
    })
    return data
  }
  function changeSize(name: string, type: string) {
    const params = normStore.state.filter(i => i.name === name)[0].params
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

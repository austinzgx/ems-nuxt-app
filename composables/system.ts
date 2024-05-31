import { defineStore } from 'pinia'

interface ReturnConfig {
  system: System
  config: Config[]
}
export interface Config {
  name: string
  data: ConfigData[]
}

interface System {
  sql_port: number
  interval: number
  sql_username: string
  sql_password: string
}
export interface ConfigData {
  id: number
  type: number
  name: string
  value: number
  unit: string
  ref?: number
  src: string
  params: any
}

export const useSystemStore = defineStore('system', () => {
  const host = ref<string>('localhost') // ('10.198.74.241')
  const port = ref<number>(5432)
  const config = ref<Config[]>([])
  const system = ref<System>()
  const admin_password = ref('pims#1234')

  const url = `http://${host.value}:${port.value}/api/config`

  async function fetchConf() {
    const res: ReturnConfig = await $fetch(url)
    config.value = res.config
    system.value = res.system
  }

  function addData(formData: any) {
    config.value.push(formData)
  }
  function removeData(formData: any) {
    config.value.splice(config.value.indexOf(formData), 1)
  }

  async function saveData() {
    await $fetch(url, {
      method: 'POST', body: config.value,
    })
  }

  return {
    config,
    system,
    host,
    port,
    admin_password,
    fetchConf,
    addData,
    saveData,
    removeData,
  }
})

import { defineStore } from 'pinia'

export interface ReturnConfig {
  system: System
  config: Config[]
}
export interface Config {
  name: string
  data: ConfigData[]
}

export interface System {
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
  const admin_password = ref('pims#1234')
  const config = ref<Config[]>()
  const system = ref<System>()
  const url = `http://${host.value}:${port.value}/api/config`

  async function fetchConf() {
    const data: ReturnConfig = await $fetch(url)
    config.value = data.config as Config[]
    system.value = data.system
    return data
  }

  function addData(formData: any) {
    config.value!.push(formData)
  }
  function removeData(formData: any) {
    config.value!.splice(config.value!.indexOf(formData), 1)
  }

  async function saveData() {
    await $fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        config: config.value,
        system: system.value,
      },
    })
  }

  return {
    host,
    port,
    config,
    system,
    admin_password,
    fetchConf,
    addData,
    saveData,
    removeData,
  }
})

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
  params: Param
}

export interface Param {
  org1: string
  org2: string
  org3: string
  org4: string
  sheetName: string
  vtype: string
}

export const useSystemStore = defineStore('system', () => {
  const host = ref<string>('localhost') // ('10.198.74.241') //
  const port = ref<number>(5432)
  const admin_password = ref('pims#1234')
  const config = ref<Config[]>()
  const system = ref<System>()
  const url = `http://${host.value}:${port.value}`

  async function fetchConf() {
    const data: ReturnConfig = await $fetch(`${url}/api/config`)
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

  async function getMatric(config: ConfigData) {
    const data = await $fetch(`${url}/api/sp`, {
      method: 'POST',
      body: config.params,
    })
    if (!data) {
      const mock_data = [[5, 100], [6, 200]]
      return mock_data
    }
    return data
  }
  async function changeMatricSize(config: ConfigData, type: string) {
    const data = await $fetch(`${url}/api/sp`, {
      method: 'POST',
      body: {
        ...config.params,
        size: type,
      },
    })
    if (!data) {
      const mock_data = [['5/30', '220'], ['5/31', '100'], ['6/1', '200']]
      return mock_data
    }
    return data
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
    getMatric,
    changeMatricSize,
  }
})

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
  const host = ref<string>('localhost') // ('10.198.74.241')
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
  async function fetchData(name: string) {
    const data = await $fetch<ConfigData[]>(`${url}/api/data`, {
      method: 'POST',
      body: { name },
    })
    return data
  }
  function addData(formData: any) {
    config.value!.push(formData)
  }
  function removeData(formData: any) {
    config.value!.splice(config.value!.indexOf(formData), 1)
  }

  async function saveData() {
    await $fetch(`${url}/api/config`, {
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
    const { data, error } = await useFetch(`${url}/api/sp`, {
      method: 'POST',
      body: { ...config.params, type: config.type },
    })
    if (error.value) {
      const mock_data = [
        [4, 0, 'Tue, 04 Jun 2024 08:00:00 GMT', '1232000', null, '无'],
        [5, 0, 'Tue, 04 Jun 2024 08:00:00 GMT', '1532000', null, '无'],
      ]
      return mock_data
    }
    else {
      return data.value
    }
  }

  async function changeMatricSize(config: ConfigData, size: string) {
    const { data, error } = await useFetch<[any]>(`${url}/api/sp`, {
      method: 'POST',
      body: {
        ...config.params,
        size,
        type: config.type,
        period: size,
      },
    })
    if (error.value) {
      const mock_data = [
        [4, 0, 'Tue, 04 Jun 2024 08:00:00 GMT', '1232000', null, '无'],
        [5, 0, 'Tue, 04 Jun 2024 08:00:00 GMT', '1132000', null, '无'],
        [6, 0, 'Tue, 04 Jun 2024 08:00:00 GMT', '1432000', null, '无'],
        [7, 0, 'Tue, 04 Jun 2024 08:00:00 GMT', '1232000', null, '无'],
        [8, 0, 'Tue, 04 Jun 2024 08:00:00 GMT', '1332000', null, '无'],
      ]
      return mock_data as [any]
    }
    else {
      return data.value
    }
  }

  return {
    host,
    port,
    config,
    system,
    admin_password,
    fetchConf,
    fetchData,
    addData,
    saveData,
    removeData,
    getMatric,
    changeMatricSize,
  }
})

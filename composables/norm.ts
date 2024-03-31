import { defineStore } from 'pinia'
import json from './data/raw.json'

export const useNormStore = defineStore('norm', () => {
  const norm = ref<Array<{
    id: number
    type: number
    name: string
    value: number
    unit: string
    ref?: number
    src: string
    params: any
  }>>([])

  const state = useLocalStorage('norm', json)

  function getData(id: number) {
    state.value.filter(i => i.id === id)
  }

  function addData(formData: any) {
    state.value.push(formData)
  }
  function removeData(formData: any) {
    state.value.splice(norm.value.indexOf(formData), 1)
  }

  function saveData() {
    // content.value = JSON.stringify(state.value)
  }

  return {
    state,
    getData,
    addData,
    saveData,
    removeData,
  }
},
)

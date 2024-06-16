import { defineStore } from 'pinia'
import json from '../data/line.json'

let base = +new Date(2020, 1, 1)
const oneDay = 24 * 3600 * 1000
const data1 = []
const data2 = []
const data3 = []
const data4 = []
const data5 = []
for (let i = 1; i < 10; i++) {
  const now = new Date((base += oneDay))
  data1.push([+now, Math.round((Math.random() - 0.5) * 100)])
  data2.push([+now, Math.round((Math.random() - 0.45) * 100)])
  data3.push([+now, Math.round((Math.random() - 0.55) * 100)])
  data4.push([+now, Math.round((Math.random() - 0.42) * 100)])
  data5.push([+now, Math.round((Math.random() - 0.41) * 100)])
}

export const useLineStore = defineStore('line', () => {
  const lineData = json
  return {
    lineData,
  }
},
)

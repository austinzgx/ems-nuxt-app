import { defineStore } from 'pinia'

export const useSystemStore = defineStore('system', () => {
  const currentId = ref(0)
  const company = ref(
    [
      { name: '分公司', id: 0 },
      { name: '粗铅', id: 1 },
      { name: '综合回收 ', id: 2 },
      { name: '电解', id: 3 },
      { name: '制液', id: 4 },
      { name: '焙烧', id: 5 },
      { name: '动力', id: 6 },
      { name: '水处理', id: 7 },
    ])
  const host = ref('10.198.74.241')
  // 10.198.74.241
  const flask_port = ref('5432')
  const sql_port = ref('1433')
  const interval = ref(5)
  const pwd = ref('')
  return {
    company,
    currentId,
    host,
    flask_port,
    sql_port,
    interval,
    pwd,
  }
})

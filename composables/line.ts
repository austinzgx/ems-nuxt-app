import { defineStore } from 'pinia'
import json from './data/line.json'

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
  const line_pre = ref()
  const line_flu = ref()
  const line_trend = ref()

  const state = useLocalStorage('line', json)

  state.value.forEach((item) => {
    if (item.type === 0) {
      line_pre.value = {
        backgroundColor: '',
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999',
            },
          },
        },

        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        legend: {
          top: 20,
          data: ['电', '天然气', '综合电价', '天然气价格'],
        },
        xAxis: [
          {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            axisPointer: {
              type: 'shadow',
            },
          },
        ],
        yAxis: [
          {
            type: 'value',
            min: 2000,
            max: 12000,
            interval: 2000,
            axisLabel: {
              formatter: '{value}kwh',
            },
          },
          {
            type: 'value',
            min: 20000,
            max: 40000,
            position: 'right',
            interval: 4000,
            axisLabel: {
              formatter: '{value}Nm3',
            },
          },
          {
            type: 'value',
            name: '综合电价',
            show: false,
            min: 4.5,
            max: 0.5,
            interval: 0.5,
            axisLabel: {
              formatter: '{value} 元/度',
            },
          },
        ],
        series: [
          {
            name: '电',
            color: 'rgba(0,245,2,0.4)',
            type: 'bar',
            tooltip: {
              valueFormatter(value) {
                return `${value} kWh`
              },
            },
            data: [
              10234, 10200, 10800, 11000, 9934, 10200, 10234, 10621, 10322, 10220, 9936.4, 10233.3,
            ],
          },

          {
            name: '天然气',
            yAxisIndex: 1,
            color: 'rgba(0,200,200,0.4)',
            type: 'bar',
            tooltip: {
              valueFormatter(value) {
                return `${value} Nm3`
              },
            },
            data: [
              39912.6, 38835.9, 392009.0, 38226.4, 38228.7, 39120.7, 39175.6, 39182.2, 39548.7, 39418.8, 39126.0, 39422.3,
            ],
          },
          {
            name: '综合电价',
            type: 'line',
            yAxisIndex: 2,
            tooltip: {
              valueFormatter(value) {
                return `${value} 元/度`
              },
            },
            data: [2.0, 2.2, 2.3, 2.5, 1.95, 1.8, 2.3, 2.4, 2.3, 2.15, 2.0, 2.2],
          },
          {
            name: '天然气价格',
            type: 'line',
            yAxisIndex: 2,
            tooltip: {
              valueFormatter(value) {
                return `${value} 元/Nm3`
              },
            },
            data: [4.0, 4.2, 4.3, 3.9, 3.95, 3.8, 3.3, 4.4, 2.3, 2.1, 2.0, 2.2],
          },
        ],
      }
    }

    if (item.type === 1) {
      line_flu.value = {
        backgroundColor: '',
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        legend: {
          top: 20,
          data: ['电', '水', '天然气', '粗铅', '锌锭'],
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: [
          {
            type: 'value',
          },
        ],
        yAxis: [
          {
            type: 'category',
            axisTick: {
              show: false,
            },
            data: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
          },
        ],
        series: [
          {
            name: '电',
            type: 'bar',
            smooth: true,
            emphasis: {
              focus: 'series',
            },
            data: [200, 170, -40, -100, 200, 220, 210],
          },
          {
            name: '水',
            type: 'bar',
            smooth: true,
            emphasis: {
              focus: 'series',
            },
            data: [120, 202, -41, 74, 190, 150, 120],
          },
          {
            name: '天然气',
            type: 'bar',
            smooth: true,
            emphasis: {
              focus: 'series',
            },
            data: [-120, -12, 91, 134, -190, -20, -10],
          },
          // {
          //   name: '粗铅',
          //   type: 'bar',
          //   smooth: true,
          //   // stack: 'Total',

          //   emphasis: {
          //     focus: 'series',
          //   },
          //   data: [-92, -100, 91, 34, 40, -50, -20],
          // },
          // {
          //   name: '锌锭',
          //   type: 'bar',
          //   smooth: true,
          //   emphasis: {
          //     focus: 'series',
          //   },
          //   data: [20, 57, 91, 114, 290, 20, -40],
          // },
        ],
      }
    }

    if (item.type === 2) {
      line_trend.value = {
        backgroundColor: '',
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          top: 20,
          data: ['电', '水', '天然气', '粗铅', '锌锭'],
        },

        xAxis: {
          type: 'time',
          boundaryGap: false,
        },
        yAxis: {
          type: 'value',
          min: -100,
          max: 100,
          boundaryGap: [0, '100%'],
        },
        dataZoom: [
          {
            type: 'inside',
            start: 0,
            end: 70,
          },
          {
            start: 0,
            end: 70,
          },
        ],
        series: [
          {
            name: '电',
            type: 'line',
            smooth: true,
            symbol: 'none',
            areaStyle: { color: 'rgba(2,2,2,0.2)' },
            data: data1,
          },
          {
            name: '天然气',
            type: 'line',
            smooth: true,
            symbol: 'none',
            areaStyle: { color: 'rgba(2,2,2,0.2)' },
            data: data2,
          },
          {
            name: '水',
            type: 'line',
            smooth: true,
            symbol: 'none',
            areaStyle: { color: 'rgba(2,2,2,0.2)' },
            data: data3,
          },
          {
            name: '粗铅',
            type: 'line',
            smooth: true,
            symbol: 'none',
            areaStyle: { color: 'rgba(2,2,2,0.2)' },
            data: data4,
          },
          {
            name: '锌锭',
            type: 'line',
            smooth: true,
            symbol: 'none',
            areaStyle: { color: 'rgba(2,2,2,0.2)' },
            data: data5,
          },
        ],
      }
    }
  })

  return {
    line_pre,
    line_flu,
    line_trend,
  }
},
)

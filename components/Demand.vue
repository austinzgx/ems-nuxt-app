<script setup lang="ts">
import VChart, { THEME_KEY } from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart, LineChart } from 'echarts/charts'
import {
  LegendComponent,
  MarkLineComponent,
  MarkPointComponent,
  TitleComponent,
  TooltipComponent,
} from 'echarts/components'

use([
  CanvasRenderer,
  BarChart,
  LineChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  MarkLineComponent,
  MarkPointComponent,
])

provide(THEME_KEY, 'dark')
const systemStore = useSystemStore()
const startTime = ref(useDateFormat(useNow(), 'YYYY-MM-DD').value)
const endTime = ref(useDateFormat(new Date().setDate(new Date().getDate() + 1), 'YYYY-MM-DD').value)
const url = `http://${systemStore.host}:${systemStore.port}`
const { data: demand, refresh } = await useFetch<[][]>(`${url}/api/demand`, {
  method: 'POST',
  body: {
    startTime,
    endTime,
  },
})
const date = computed(() => demand.value.map(item => item[0]))
const maxDemand = computed(() => demand.value.map(item => Number(item[3])))
const actDemand = computed(() => demand.value.map(item => Number(item[4])))
const refDemand = computed(() => demand.value.map(item => Number(item[5])))

// interface DemandData {
//   date: string
//   id?: number
//   fullDate?: string
//   maxDemand: string
//   actDemand: string
//   ref: string
//   limitValue?: string
//   limitType?: string
// }

const line = computed(() => {
  return {
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

    // toolbox: {
    //   feature: {
    //     dataView: { show: true, readOnly: false },
    //     magicType: { show: true, type: ['line', 'bar'] },
    //     // restore: { show: true },
    //     saveAsImage: { show: true },
    //   },
    // },
    legend: {
      top: 20,
      data: ['最大需量', '需量', '控制目标'],
    },
    xAxis: [
      {
        type: 'category',
        data: date.value,
        axisPointer: {
          type: 'shadow',
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
        min(value: any) {
          return value > 0 ? Math.floor(value.min) : 90000
        },
        max(value: any) {
          return Math.floor(value.max)
        },
        interval: 3000,

      },
    ],
    series: [
      {
        name: '最大需量',
        color: 'orange',
        type: 'line',
        data: maxDemand.value,
        markLine: {
          data: [
            {
              type: 'average',
              name: 'Avg',
              label: {
                position: 'end',
                fontSize: 13,

              },
            },
          ],
        },
      },

      {
        name: '需量',
        color: 'green',
        type: 'bar',
        data: actDemand.value,
        markPoint: {
          data: [
            { type: 'max', name: 'Max', itemStyle: { color: 'red' } },
            { type: 'min', name: 'Min', itemStyle: { color: 'lime' } },
          ],
        },
        markLine: {
          data: [
            {
              type: 'average',
              name: 'Avg',
              label: {
                position: 'end',
                fontSize: 13,

              },
            },
          ],
        },
      },
      {
        name: '控制目标',
        color: 'red',
        type: 'line',
        data: refDemand.value,
      },
    ],
  }
},
)
</script>

<template>
  <div class="chart" h-prose>
    <div float-right flex items-center gap1>
      <UInput v-model="startTime" type="date" />-
      <UInput v-model="endTime" type="date" />
      <UButton color="gray" icon="i-carbon-update-now" @click="refresh" />
    </div>
    <VChart :option="line" autoresize />
  </div>
</template>

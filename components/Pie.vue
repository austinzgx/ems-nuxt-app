<script setup lang="ts">
import VChart, { THEME_KEY } from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart, GaugeChart, LineChart, PieChart, SankeyChart } from 'echarts/charts'
import {
  DataZoomComponent,
  GridComponent,
  LegendComponent,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  VisualMapComponent,
} from 'echarts/components'
import type { darkMode } from '#tailwind-config'
import { _backgroundColor } from '#tailwind-config/theme'

use([
  CanvasRenderer,
  GridComponent,
  GaugeChart,
  PieChart,
  BarChart,
  LineChart,
  TitleComponent,
  ToolboxComponent,
  VisualMapComponent,
  TooltipComponent,
  DataZoomComponent,
  SankeyChart,
  LegendComponent,
])

provide(THEME_KEY, 'dark')

const systemStore = useSystemStore()
const url = `http://${systemStore.host}:${systemStore.port}`
const pieOption = ref<Array<any>>([])
const { data: pieData } = await useFetch<any>(`${url}/api/chart`)
for (const item of pieData?.value) {
  if (item.type === 1) {
    pieOption.value.push(
      {
        backgroundColor: '',
        series: [
          {
            type: 'gauge',
            startAngle: 180,
            endAngle: 0,
            center: ['50%', '60%'],
            radius: '90%',
            min: 0,
            max: 1,
            splitNumber: 8,
            axisLine: {
              lineStyle: {
                width: 4,
                color: [
                  [0.25, '#FF6E76'],
                  [0.5, '#FDDD60'],
                  [0.75, '#58D9F9'],
                  [1, '#7CFFB2'],
                ],
              },
            },
            axisLabel: {
              color: '#464646',
              fontSize: 20,
              distance: -60,
              rotate: 'tangential',
              formatter(value: number) {
                return ''
              },
            },
            pointer: {
              icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
              length: '12%',
              width: 10,
              offsetCenter: [0, '-60%'],
              itemStyle: {
                color: 'auto',
              },
            },
            axisTick: {
              length: 4,
              lineStyle: {
                color: 'auto',
                width: 1,
              },
            },
            splitLine: {
              length: 6,
              lineStyle: {
                color: 'auto',
                width: 3,
              },
            },
            title: {
              offsetCenter: [0, '50%'],
              fontSize: 14,
            },
            detail: {
              fontSize: 30,
              offsetCenter: [0, '20%'],
              valueAnimation: true,
              formatter(value: number) {
                return `${Math.round(value * 100)}`
              },
              color: 'auto',
            },
            data: [
              {
                value: item.value,
                name: item.name,

              },
            ],
          },
        ],
      })
  }
  // Pie
  if (item.type === 2) {
    pieOption.value.push({
      backgroundColor: '',
      tooltip: {
        trigger: 'item',
        formatter: '{b} : {c} ({d}%)',
      },

      series: [
        {
          name: '',
          type: 'pie',
          radius: '60%',
          center: ['50%', '50%'],
          data: item.data,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    })
  }
}
</script>

<template>
  <div grid="~ cols-[1fr_1fr_1.5fr_1.5fr] gap1">
    <div class="chart">
      <VChart :option="pieOption[0]" autoresize />
    </div>
    <div class="chart">
      <VChart :option="pieOption[1]" autoresize />
    </div>
    <div class="chart">
      <VChart :option="pieOption[2]" autoresize />
    </div>
    <div class="chart">
      <VChart :option="pieOption[3]" autoresize />
    </div>
  </div>
</template>

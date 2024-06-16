<script setup lang="ts">
import VChart, { THEME_KEY } from 'vue-echarts'
import { use } from 'echarts/core'
import { LineChart } from 'echarts/charts'
import {
  DataZoomComponent,
  GridComponent,
  LegendComponent,
  MarkLineComponent,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  VisualMapComponent,
} from 'echarts/components'

const props = defineProps({
  config: {
    type: Object as () => ConfigData,
  },
})

use([
  GridComponent,
  LineChart,
  TitleComponent,
  ToolboxComponent,
  VisualMapComponent,
  TooltipComponent,
  DataZoomComponent,
  LegendComponent,
  MarkLineComponent,
])
provide(THEME_KEY, 'dark')

const systemStore = useSystemStore()

const querySqlRes = ref({
  date: [],
  value: [],
})

const option = computed(() => {
  return {
    backgroundColor: '',
    xAxis: {
      type: 'category',
      data: querySqlRes.value.date,
      boundaryGap: false,
    },
    yAxis: {
      type: 'value',
      min(value: any) {
        return Math.round(Math.floor(value.min * 0.8))
      },
      max(value: any) {
        return Math.round(Math.floor(value.max * 1.1))
      },
    },
    series: [
      {
        data: querySqlRes.value.value,
        color: 'rgba(0,200,200)',
        type: 'line',
        smooth: true,
        markPoint: {
          data: [
            { type: 'max', name: 'Max', itemStyle: { color: 'red' } },
            { type: 'min', name: 'Min', itemStyle: { color: 'green' } },
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
            {
              name: '绩效考核值',
              yAxis: props.config?.ref || 0,
              label: {
                position: 'end',
                fontSize: 13,
              },
              lineStyle: {
                type: 'solid',
                color: 'red',
                witdh: 2,
              },
            },
          ],
        },
      },

    ],
    tooltip: {
      trigger: 'axis',
      position(pt) {
        return [pt[0], '10%']
      },
    },

    dataZoom: [
      {
        type: 'inside',
        start: 90,
        end: 100,
      },
      {
        start: 90,
        end: 100,
      },
    ],
  }
})
function convertMatricData(matric: any, type: number) {
  querySqlRes.value.date = []
  querySqlRes.value.value = []
  matric.forEach((m: Array<any>) => {
    querySqlRes.value.date.push(m[0])
    if (type === 0)
      querySqlRes.value.value.push(m[1])
    else
      querySqlRes.value.value.push(m[3])
  })
}

onMounted(async () => {
  const matric = await systemStore.getMatric(props.config!)
  if (matric)
    convertMatricData(matric, props.config!.type)
})

async function changeSize(config: ConfigData, size: string) {
  const matric = await systemStore.changeMatricSize(config, size)
  if (matric)
    convertMatricData(matric, config.type)
}
</script>

<template>
  <UCard>
    <template #header>
      <div flex>
        <div text-2xl fw600 text-teal>
          {{ config?.name }}
        </div>
        <div flex-auto />
        <div v-if="config?.ref" flex gap2 text-xl>
          <span> 基准值:</span>
          <span text-lime>{{ config?.ref }}</span>
          <span op70>{{ config?.unit }}</span>
        </div>
        <div flex-auto />
        <div flex gap2>
          <UButton @click="changeSize(config!, '日')">
            日
          </UButton>
          <UButton @click="changeSize(config!, '周')">
            周
          </UButton>
          <UButton @click="changeSize(config!, '月')">
            月
          </UButton>
          <UButton @click="changeSize(config!, '年')">
            年
          </UButton>
        </div>
      </div>
    </template>
    <div>
      <div class="chart" h-100>
        <VChart :option="option" autoresize />
      </div>
    </div>
  </UCard>
</template>

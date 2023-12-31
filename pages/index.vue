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
import { Vue3SeamlessScroll } from 'vue3-seamless-scroll'

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

const pieOption = ref<Array<any>>([])
const lineStore = useLineStore()
const url = `http://${systemStore.host}:${systemStore.flask_port}`
const { data: pieData, refresh: refreshChart } = await useFetch<any>(`${url}/api/chart`)
// pie chart
pieData.value.forEach((item) => {
  if (item.type === 1) {
    pieOption.value.push(
      {
        backgroundColor: '',
        series: [
          {
            type: 'gauge',
            startAngle: 180,
            endAngle: 0,
            center: ['50%', '70%'],
            radius: '100%',
            min: 0,
            max: 1,
            splitNumber: 8,
            axisLine: {
              lineStyle: {
                width: 6,
                color: [
                  [0.25, '#FF6E76'],
                  [0.5, '#FDDD60'],
                  [0.75, '#58D9F9'],
                  [1, '#7CFFB2'],
                ],
              },
            },
            pointer: {
              icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
              length: '12%',
              width: 20,
              offsetCenter: [0, '-60%'],
              itemStyle: {
                color: 'auto',
              },
            },
            axisTick: {
              length: 12,
              lineStyle: {
                color: 'auto',
                width: 2,
              },
            },
            splitLine: {
              length: 20,
              lineStyle: {
                color: 'auto',
                width: 5,
              },
            },
            axisLabel: {
              color: '#464646',
              fontSize: 10,
              distance: -40,
              rotate: 'tangential',
              formatter(value: any) {
                if (value === 0.875)
                  return 'A'
                else if (value === 0.625)
                  return 'B'
                else if (value === 0.375)
                  return 'C'
                else if (value === 0.125)
                  return 'D'

                return ''
              },
            },
            title: {
              offsetCenter: [0, '20%'],
              fontSize: 16,
            },
            detail: {
              fontSize: 40,
              offsetCenter: [0, '-30%'],
              valueAnimation: true,
              formatter(value: any) {
                return `${Math.round(value * 100)}`
              },
              color: 'inherit',
            },
            data: [
              {
                value: item.value,
                name: item.name,
              },
            ],
          },
        ],
      },
    )
  }
  // Pie
  if (item.type === 2) {
    pieOption.value.push({
      backgroundColor: '',
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
      },
      series: [
        {
          name: '',
          type: 'pie',
          radius: '55%',
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
})
// data
const { data, refresh: refreshData } = await useFetch<any>(`${url}/api/data`)
const { data: messages, refresh: refreshMsg } = await useFetch<any>(`${url}/api/msg`)
let tm: any
onMounted(() => {
  tm = setInterval(() => {
    refreshData()
    refreshChart()
    refreshMsg()
  }, systemStore.interval * 1000)
})

onUnmounted(() => {
  if (tm)
    clearInterval(tm)
})
const foucs = computed(() => data.value.filter(i => i.id === systemStore.currentId).filter(i => i.type === 0))
const other = computed(() => data.value.filter(i => i.id === systemStore.currentId).filter(i => i.type === 1))

// const ele_pre = computed(() => normStore.state.filter(i => i.id === systemStore.currentId).filter(i => i.type === 2).filter(i => i.sort === 0))
// const lng_pre = computed(() => normStore.state.filter(i => i.id === systemStore.currentId).filter(i => i.type === 2).filter(i => i.sort === 1))
// const water_pre = computed(() => normStore.state.filter(i => i.id === systemStore.currentId).filter(i => i.type === 2).filter(i => i.sort === 2))

// function getRangeColor(value: number, ref: number) {
//   let color = 'rgba(225,0,0,0.5)'
//   if (value < ref)
//     color = 'rgba(2,223,243,0.5)'
//   const rate = value / ref * 100
//   return `background: linear-gradient(90deg, ${color} ${rate}%, transparent 0%)`
// }

function getValueColor(item: any) {
  if (item.value > item.ref)
    return 'text-red-600'
  return 'text-lime'
}

function getMsgColor(item: any) {
  if (item.type === 1)
    return 'text-lime'
  if (item.type === 2)
    return 'text-red-600'
  return 'text-gray'
}
</script>

<template>
  <div grid="~ cols-[1.2fr_5fr_3fr] gap-2">
    <!-- left -->
    <div>
      <div v-for="item in other" :key="item.name" mb-2 p2 class="box">
        <!-- <div v-if="item.ref" float-right text-3 text-gray>
          {{ ((item.value - item.ref) / item.ref * 99).toFixed(1) }}%
        </div> -->
        <div text-xl :class="getValueColor(item)">
          {{ item.value.toFixed(2) }}
          <span text-sm text-gray>
            {{ item.unit }}
          </span>
        </div>
        <div text-sm>
          {{ item.name }}
        </div>
      </div>
    </div>

    <!-- mid -->
    <div grid="~ rows-[1.2fr_2fr_4fr] gap-y2">
      <!-- foucs -->
      <div flex="~ justify-between">
        <div
          v-for="item in foucs"
          :key="item.name" class="box" max-w-380px min-w-180px pt-5
        >
          <div text-4xl fw-800 :class="getValueColor(item)">
            {{ item.value.toFixed(2) }}
          </div>
          <div v-if="item.ref" text-4 text-gray>
            {{ ((item.value - item.ref) / item.ref * 99).toFixed(2) }}%
          </div>
          <div pt-3 text-sm>
            {{ item.name }}
          </div>
          <div text-gray>
            {{ item.unit }}
          </div>
        </div>
      </div>

      <!-- dashboard -->
      <div grid="~ cols-4 gap2">
        <div v-for="(option, index) in pieOption" :key="index" class="chart">
          <VChart :option="option" autoresize />
        </div>
      </div>

      <div class="chart">
        <VChart :option="lineStore.line_pre" autoresize />
      </div>

    <!-- 能源预测 -->
    <!-- <div grid="~ cols-3 gap2">
        <UCard>
          <div v-for="item in ele_pre" :key="item.name">
            <div pb-2>
              {{ item.name }} <span text-lime> {{ item.ref }}{{ item.unit }}</span>
            </div>
            <div v-for="(value, index) in item.value" :key="index" p1>
              <div grid="~ cols-[40px_auto] gap2" border="~ 1px rounded-3" p2>
                {{ index + 1 }}月
                <div :style="getRangeColor(value, item.ref)">
                  {{ value }}
                </div>
              </div>
            </div>
          </div>
        </UCard>
        <UCard>
          <div v-for="item in lng_pre" :key="item.name">
            <div pb-2>
              {{ item.name }} <span text-lime> {{ item.ref }}{{ item.unit }}</span>
            </div>
            <div v-for="(value, index) in item.value" :key="index" p1>
              <div grid="~ cols-[40px_auto] gap2" border="~ 1px rounded-3" p2>
                {{ index + 1 }}月
                <div :style="getRangeColor(value, item.ref)">
                  {{ value }}
                </div>
              </div>
            </div>
          </div>
        </UCard>
        <UCard>
          <div v-for="item in water_pre" :key="item.name">
            <div pb-2>
              {{ item.name }} <span text-lime> {{ item.ref }}{{ item.unit }}</span>
            </div>
            <div v-for="(value, index) in item.value" :key="index" p1>
              <div grid="~ cols-[40px_auto] gap2" border="~ 1px rounded-3" p2>
                {{ index + 1 }}月
                <div :style="getRangeColor(value, item.ref)">
                  {{ value }}
                </div>
              </div>
            </div>
          </div>
        </UCard>
      </div> -->
    </div>

    <!-- right -->
    <div grid="~ rows-3 gap-y2 ">
      <div class="chart">
        <VChart :option="lineStore.line_flu" autoresize />
      </div>
      <div class="chart">
        <VChart :option="lineStore.line_trend" autoresize />
      </div>
      <div class="box">
        <div flex="~ gap1" float-right p3 text-xl fw600 c-lime>
          <span i-carbon-information />
        </div>
        <Vue3SeamlessScroll
          class="scroll"
          :list="messages"
          :step="0.5"
          :limit-scroll-num="8"
          :single-height="0"
          :single-wait-time="1000 "
          :is-rem-unit="false"
          :is-watch="true"
          :delay="0"
        >
          <div v-for="(item, index) in messages" :key="index" flex="~ row gap3" p2 text-4>
            <span v-text="item.date" />
            <span :class="getMsgColor(item)" v-text="item.msg" />
          </div>
        </Vue3SeamlessScroll>
      </div>
    </div>
  </div>
</template>

<style>
.box, .chart{
  border-width: 1px;
  border-radius: 5px;
  border-color:#444;
  /* background-color: transparent !important; */
}

.box:hover{
 background: rgba(58, 229, 98, 0.4)
}

.scroll{
  height: 300px;
  overflow: hidden;
}
</style>

<script setup lang="ts">
import { Vue3SeamlessScroll } from 'vue3-seamless-scroll'

const systemStore = useSystemStore()
const url = `http://${systemStore.host}:${systemStore.port}`
const { data: messages, refresh: refreshMsg } = await useFetch<any>(`${url}/api/msg`)
function getMsgColor(item: any) {
  if (item.type === 1)
    return 'text-lime'
  if (item.type === 2)
    return 'text-red-600'
  return 'text-gray'
}
</script>

<template>
  <div flex="~ gap1" float-right p3 text-xl fw600 c-lime>
    <span i-carbon-information />
  </div>
  <div>
    <ClientOnly>
      <Vue3SeamlessScroll
        class="scroll" :list="messages" :step="0.5" :limit-scroll-num="10" :single-height="0"
        :single-wait-time="1000" :is-rem-unit="false" :is-watch="true" :delay="10"
      >
        <div v-for="(item, index) in messages" :key="index" flex="~ row gap3" p2 text-4>
          <span v-text="item.date" />
          <span :class="getMsgColor(item)" v-text="item.msg" />
        </div>
      </Vue3SeamlessScroll>
    </ClientOnly>
  </div>
</template>

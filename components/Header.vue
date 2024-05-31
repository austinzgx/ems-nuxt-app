<script setup>
import { useFullscreen } from '@vueuse/core'

const store = useSystemStore()

onMounted(async () => {
  await store.fetchConf()
})

const date = useDateFormat(useNow(), 'YYYY-MM-DD HH:mm')
const { toggle } = useFullscreen()
const config = store.config

const companys = ['分公司', '粗铅', '综合回收', '电解', '制液', '焙烧', '水处理']

const company = ref(companys[0])
</script>

<template>
  <div grid="~ cols-[200px_1fr_220px] gap2" items-center class="head">
    <div flex="~ gap5" items-center>
      <img h-11 w-15 pl-4 pt-1 src="/logo.png" @click="navigateTo('/')">
      <USelect
        v-model="company"
        :options="companys"
        size="lg"
        @change="navigateTo(`/dashboard/${company}`)"
      >
        <template #label>
          <div text-xl fw600 text-cyan style="width:200px">
            {{ current.name }}
          </div>
        </template>
      </USelect>
    </div>

    <div class="title">
      驰宏锌锗会泽冶炼超强能源管理系统
    </div>

    <div flex="~ gap4" pt-2 text-xl text-cyan-500>
      <span text-white>{{ date }}</span>
      <button i-carbon-fit-to-screen @click="toggle">
        fullscreen
      </button>
    </div>
  </div>
</template>

<style>
.head{
  background-image: url(/top.png);
  background-position: center center
}
</style>

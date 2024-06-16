<script setup lang="ts">
const route = useRoute()
const name = (route.params as { name: string }).name

const systemStore = useSystemStore()

// data
const data = ref<ConfigData[] | null>(null)
let tm: any
onMounted(async () => {
  data.value = await systemStore.fetchData(name)
  tm = setInterval(async () => {
    data.value = await systemStore.fetchData(name)
  }, (systemStore.system?.interval || 10) * 1000)
})

const kpi = computed(() => data.value?.filter(i => i.type === 0) || [])
const acc = computed(() => data.value?.filter(i => i.type === 1) || [])

onUnmounted(() => {
  if (tm)
    clearInterval(tm)
})

const show = ref(false)

const selected = ref<ConfigData | null>(null)

function showDetail(config: ConfigData) {
  selected.value = config
  show.value = true
}
</script>

<template>
  <UModal v-model="show" :ui="{ width: 'w-full max-w-280' }">
    <Detail v-if="selected" :config="selected" />
  </UModal>

  <div grid="~ cols-[1.2fr_5fr_3fr] gap-2" style="height: calc(100vh - 230px)">
    <!-- left -->
    <div space-y-3>
      <div v-for="item in acc" :key="item.name" class="box" @click="showDetail(item)">
        <Acc :data="item" />
      </div>
    </div>

    <!-- mid -->
    <div grid="~ gap2 rows-[max-content_12.5rem_auto]">
      <!-- kpi -->
      <div flex="~ justify-between">
        <div v-for="item in kpi" :key="item.name" class="box" min-w-180px w-full @click="showDetail(item)">
          <Kpi :data="item" />
        </div>
      </div>

      <Pie />

      <div v-if="name.includes('分公司')">
        <Demand />
      </div>
      <div v-else class="chart">
        <Line :type="0" />
      </div>
    </div>

    <div grid="~ rows-3 gap-y2">
      <div class="chart">
        <Line :type="1" />
      </div>
      <div class="chart">
        <Line :type="2" />
      </div>
      <div class="box">
        <Msg />
      </div>
    </div>
  </div>
</template>

<style>
.box,
.chart {
  --uno: rounded-2 p2 border-1 border-solid border-gray/30;
}

.box:hover {
  --uno: bg-lime-500:20
}

.scroll {
  height: 300px;
  overflow: hidden;
}
</style>

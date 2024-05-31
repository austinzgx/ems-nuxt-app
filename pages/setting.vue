<script setup lang="ts">
import { storeToRefs } from 'pinia'

// definePageMeta({
//   middleware: 'auth',
// })

const systemStore = useSystemStore()
const store = storeToRefs(useSystemStore())

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'type', label: 'Type', sortable: true },
  { key: 'sort', label: 'Index' },
  { key: 'unit', label: 'Unit' },
  { key: 'ref', label: 'Ref' },
  { key: 'src', label: 'API' },
  { key: 'params', label: 'Params' },
]

const conndata = ref(false)
function testSqlConn() {
  //  todo getAPItest()
  conndata.value = true
}
//
</script>

<template>
  <div grid="~ cols-[max-content_1fr] gap2" p2 text-left>
    <UCard :ui="{ background: 'dark:bg-gray:5' }">
      <template #header>
        <span text-xl fw-600 text-lime>系统配置</span>
      </template>
      <div grid="~ rows-[1fr_3fr] gap4">
        <div space-y-2>
          <h1 c-teal>
            数据刷新频率(s):
          </h1>
          <UInput v-model="store.interval.value" text-center />
        </div>
        <div space-y-2>
          <h1 c-teal>
            数据库:
          </h1>
          <div grid="~ cols-[1fr_2fr]">
            Host <UInput :value="systemStore.host" />
          </div>
          <div grid="~ cols-[1fr_2fr]">
            Sql_Port <UInput :value="systemStore.sql_port" />
          </div> <div grid="~ cols-[1fr_2fr]">
            Flask_Port <UInput :value="systemStore.flask_port" />
          </div>
          <div grid="~ cols-[1fr_2fr]">
            UserName <UInput :value="sa" />
          </div>
          <div grid="~ cols-[1fr_2fr]">
            Password: <UInput type="password" value="!QAZ2wsx" />
          </div>

          <div text-xl>
            <UButton h-8 w30 pl2 pr-2 @click="testSqlConn">
              Ping Server
            </UButton>
            <span v-if="conndata" i-carbon-connect text-lime>YES</span>
            <span v-if="!conndata" i-carbon-error text-red-600>NO</span>
          </div>

          <UButton h-8 w30 pl2 pr-2 @click="systemStore.saveData">
            Save Config
          </UButton>
        </div>
      </div>
    </UCard>

    <UCard :ui="{ background: 'dark:bg-gray:5' }">
      <UTable :rows="data" :columns="columns" />
    </UCard>

    <!-- <div>
        <span text-xl fw-600 text-green>Line</span>
        <button i-carbon:add-filled bg-lime pl-10 @click="addData" />
        <div v-for="(item, index) of data.line[0].series" :key="index" grid="~ cols-[1fr_1fr_2fr_2fr_2fr_4fr_5fr_20fr] gap-1" p-1>
          <button i-carbon- i-carbon:close-filled bg-red @click="deleteData(item)" />
          <input :value="index + 1" w-20 text-center>
          <input :value="item.name" w-40 pl-4>
          <input :value="item.data" w-80 pl-4>
          <input :value="item.src ? item.src : '/api/DSFW20'" w-80 pl-4>
        </div>

        <button i-carbon:add-filled bg-lime pl-10 @click="addData" />
        <div v-for="(item, index) of data.line[1].series.data" :key="index" grid="~ cols-[1fr_1fr_2fr_2fr_2fr_4fr_5fr_20fr] gap-1" p-1>
          <button i-carbon- i-carbon:close-filled bg-red @click="deleteData(item)" />
          <input :value="item.data" w-100 text-center>
          <input :value="item.src ? item.src : '/api/DSFW20'" w-80 pl-4>
        </div>
      </div>

      <div>
        <span text-xl fw-600 text-green>Pie</span>
        <button i-carbon:add-filled bg-lime pl-10 @click="addData" />
        <div>
          <span>铅系统能耗评分</span>
          <input :value="data.pie[0].series[0].data[0].value" w-40 pl-4>
          <input value="https://localhost:3423/api/DSFW20" w-80 pl-4>
        </div>
        <div>
          <span>锌系统能耗评分</span>
          <input :value="data.pie[1].series[0].data[0].value" w-40 pl-4>
          <input value="https://localhost:3423/api/DSFW20" w-80 pl-4>
        </div>
        <div>
          <span>能耗单元构成</span>
          <div v-for="(item, index) of data.pie[2].series[0].data" :key="index">
            <button i-carbon- i-carbon:close-filled bg-red @click="deleteData(item)" />
            <input :value="index + 1" w-20 text-center>
            <input :value="item.name" w-40 pl-4>
            <input :value="item.value" w-40 pl-4>
            <input :value="item.src ? item.src : '/api/DSFW20'" w-80 pl-4>
          </div>
        </div>
        <div>
          <span>能耗介质构成</span>
          <div v-for="(item, index) of data.pie[3].series[0].data" :key="index">
            <button i-carbon- i-carbon:close-filled bg-red @click="deleteData(item)" />
            <input :value="index + 1" w-20 text-center>
            <input :value="item.name" w-40 pl-4>
            <input :value="item.value" w-40 pl-4>
            <input :value="item.src ? item.src : '/api/DSFW20'" w-80 pl-4>
          </div>
        </div>
      </div> -->
  </div>
</template>

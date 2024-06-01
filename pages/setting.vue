<script setup lang="ts">
// definePageMeta({
//   middleware: 'auth',
// })

const store = useSystemStore()
const system = ref(store.system!)
const config = ref(store.config!)

const columns = [
  { key: 'name', label: '指标项' },
  { key: 'type', label: '类型', sortable: true },
  { key: 'sort', label: '排序', sortable: true },
  { key: 'unit', label: '单位' },
  { key: 'ref', label: '参考值' },
  { key: 'src', label: 'API接口' },
  { key: 'params', label: '采集参数' },
  { key: 'actions', label: '编辑' },
]

const conndata = ref(false)
function testSqlConn() {
  //  todo getAPItest()
  conndata.value = true
}
</script>

<template>
  <div grid="~ cols-[max-content_1fr] gap2" p2 text-left>
    <UCard :ui="{ background: 'dark:bg-gray:5' }">
      <template #header>
        <div flex gap4>
          <i i-carbon-settings text-xl c-lime />
          <span text-xl fw-600 text-lime>系统配置</span>
        </div>
      </template>
      <div space-y-10>
        <div space-y-2>
          <h1 c-teal>
            数据刷新频率(s):
          </h1>
          <UInput v-model="system.interval" text-center type="number" />
        </div>

        <div space-y-2>
          <h1 c-teal>
            服务器地址:
          </h1>
          <div grid="~ cols-[1fr_2fr]">
            Host <UInput v-model="store.host" />
          </div>
          <div grid="~ cols-[1fr_2fr]">
            Port <UInput v-model="store.port" />
          </div>
        </div>

        <div space-y-2>
          <h1 c-teal>
            SQL数据库:
          </h1>
          <div text-xl>
            <UButton h-8 w30 pl2 pr-2 @click="testSqlConn">
              Ping Server
            </UButton>
            <i class="conndata ? 'i-carbon-connect' : 'i-carbon-error'" text-lime />
          </div>

          <div grid="~ cols-[1fr_2fr]">
            Sql_Port <UInput v-model="system.sql_port" />
          </div>
          <div grid="~ cols-[1fr_2fr]">
            UserName <UInput v-model="system.sql_username" />
          </div>
          <div grid="~ cols-[1fr_2fr]">
            Password: <UInput v-model="system.sql_password" type="password" />
          </div>
        </div>

        <UButton h-8 w-full justify-center @click="store.saveData">
          Save Config
        </UButton>
      </div>
    </UCard>

    <div space-y-2>
      <div v-for="item of config" :key="item.name">
        <UCard :ui="{ background: 'dark:bg-gray:5' }">
          <template #header>
            <div flex items-center gap4>
              <i i-carbon-commit text-xl c-lime />
              <span text-xl fw-600 text-lime>{{ item.name }}  </span>
              <span text-gray op50> {{ item.data.length }}</span>
            </div>
          </template>
          <UTable :rows="item.data" :columns="columns">
            <template #data-Actions="{ actions }">
              <div c-teal>
                <UButton label="row" />
              </div>
            </template>
          </UTable>
        </UCard>
      </div>
    </div>
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

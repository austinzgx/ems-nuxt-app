<script setup>
import { useFullscreen } from '@vueuse/core'

const store = useSystemStore()

onMounted(async () => {
  await store.fetchConf()
})

const date = useDateFormat(useNow(), 'YYYY-MM-DD HH:mm')

const { toggle } = useFullscreen()

const companys = ['分公司', '粗铅', '综合回收', '电解', '制液', '焙烧', '水处理']

const company = ref(companys[0])

const router = useRouter()
const pwd = ref('pims#1234')
function go() {
  if (pwd.value === 'pims#1234')
    router.push('/setting')
}
const isOpen = ref(false)
const login = ref(false)
</script>

<template>
  <USlideover v-model="isOpen" :ui="{ width: 'w-screen max-w-160' }">
    <Config />
  </USlideover>

  <UModal v-model="login">
    <UCard>
      <div flex>
        <input
          v-model="pwd" placeholder="管理员权限密码" type="password" autocomplete="off" p="x-4 y-2" w-full text="center"
          border="~ rounded gray-200 dark:gray-700" outline="none active:none" @keydown.enter="go"
        >
        <div>
          <button ml-1 h-10 text-sm btn :disabled="!pwd" @click="go">
            GO
          </button>
        </div>
        <div>
          <button ml-1 h-10 bg-red text-sm btn @click="isOpen = false">
            X
          </button>
        </div>
      </div>
    </UCard>
  </UModal>

  <div grid="~ cols-[240px_1fr_240px] gap2" items-center class="head">
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

    <div flex="~ gap2" pt-2 text-xl text-cyan-500>
      <span text-white>{{ date }}</span>
      <button i-carbon-fit-to-screen @click="toggle">
        fullscreen
      </button>
      <button i-carbon-settings @click="isOpen = true" />
    </div>
  </div>
</template>

<style>
.head{
  background-image: url(/top.png);
  background-position: center center;
  height: 60px;
}
</style>

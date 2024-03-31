<script setup>
import { useFullscreen } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { _backgroundColor } from '#tailwind-config/theme'

const { pwd } = storeToRefs(useSystemStore())

const isOpen = ref(false)
const router = useRouter()
function go() {
  if (pwd.value === 'pims#1234') {
    router.push('/setting')
    isOpen.value = false
  }
}
function demo() {
  router.push('/hot')
}
const date = useDateFormat(useNow(), 'YYYY-MM-DD HH:mm')
const { toggle } = useFullscreen()
const store = useSystemStore()
const company = store.company

const selectd = ref(company[0].id)
const current = computed(() => company.find(item => item.id === selectd.value))
</script>

<template>
  <div grid="~ cols-[80px_140px_1fr_260px] gap2" justify-center class="head">
    <img inline-block h-11 w-15 pl-4 pt-1 src="/logo.png" @click="navigateTo('/')">
    <USelectMenu
      v-model="selectd"
      :options="company"
      value-attribute="id"
      option-attribute="name"
      @change="store.currentId = selectd"
    >
      <template #label>
        <div text-xl fw600 text-cyan style="width:200px">
          {{ current.name }}
        </div>
      </template>
    </USelectMenu>
    <div class="title">
      驰宏锌锗会泽冶炼超强能源管理系统
    </div>
    <div flex="~ gap1" pt-2 text-xl text-cyan-500>
      <span text-white>{{ date }}</span>

      <button i-carbon-container-registry @click="isOpen = true">
        check
      </button>
      <UModal v-model="isOpen">
        <UCard>
          <div flex>
            <input
              v-model="pwd"
              placeholder="管理员权限密码"
              type="password" autocomplete="off"
              p="x-4 y-2" w-full
              text="center"
              border="~ rounded gray-200 dark:gray-700"
              outline="none active:none"
              @keydown.enter="go"
            >
            <div>
              <button
                ml-1 h-10 text-sm btn
                :disabled="!pwd"
                @click="go"
              >
                GO
              </button>
            </div>
            <div>
              <button
                ml-1 h-10 bg-red text-sm btn
                @click="isOpen = false"
              >
                X
              </button>
            </div>
          </div>
        </UCard>
      </UModal>
      <button i-carbon-fit-to-screen @click="toggle">
        fullscreen
      </button>
      <button i-carbon-3d-curve-manual @click="demo">
        HOT
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

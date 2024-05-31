<script setup lang="ts">
const router = useRouter()
const pwd = ref('pims#1234')
function go() {
  if (pwd.value === 'pims#1234')
    router.push('/setting')
}
const isOpen = ref(false)
onMounted(() => {
  navigateTo('/dashboard/分公司')
})
</script>

<template>
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

  <!-- <div style="height: calc(100vh - 40px);">
    <div mx-auto h40 flex justify-center gap4 pt20 text-3xl>
      <button w-50 bg-red:50 p2>
        <NuxtLink to="/dashboard/分公司">
          分公司
        </NuxtLink>
      </button>
      <button w-50 bg-lime:50 p2>
        <NuxtLink to="/dashboard/粗铅">
          粗铅
        </NuxtLink>
      </button>
      <button w-50 bg-lime:50 p2>
        <NuxtLink to="/dashboard/综合回收">
          综合回收
        </NuxtLink>
      </button>
      <button w-50 bg-lime:50 p2>
        <NuxtLink to="/dashboard/电解">
          电解
        </NuxtLink>
      </button>
      <button w-50 bg-lime:50 p2>
        <NuxtLink to="/dashboard/制液">
          制液
        </NuxtLink>
      </button>
      <button w-50 bg-lime:50 p2>
        <NuxtLink to="/dashboard/焙烧">
          焙烧
        </NuxtLink>
      </button>
      <button w-50 bg-lime:50 p2>
        <NuxtLink to="/dashboard/水处理">
          水处理
        </NuxtLink>
      </button>
      <button w-50 bg-gray:50 p2>
        <NuxtLink to="/setting">
          系统设置
        </NuxtLink>
      </button>
    </div>
  </div> -->
</template>

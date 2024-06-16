<script setup lang="ts">
const props = defineProps({ data: Object })
function getValueColor(data: any) {
  if (data.value > data.ref)
    return 'text-red-600'
  return 'text-lime'
}
</script>

<template>
  <div>
    <div>
      <div text-3xl fw600 :class="getValueColor(data)">
        {{ Number(data?.value) }}
      </div>
      <div v-if="data?.ref" float-right flex items-center pr-4 text-sm op50>
        <span :class="(Number(data?.value) - data.ref) > 0 ? 'i-carbon-arrow-up' : 'i-carbon-arrow-down' ">ii</span>
        <span>
          {{ ((Number(data?.value) - data.ref) / data.ref * 100).toFixed(0) }}%
        </span>
      </div>
      <div pt-8 text-sm>
        <div clear-both>
          {{ data?.name }}
        </div>
        <div op70>
          {{ data?.unit }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({ data: Object })
function getValueColor(data: any) {
  if (data.unit.includes('t'))
    return 'text-red-600'
  if (data.unit.includes('W'))
    return 'text-green'
  return 'text-orange'
}
</script>

<template>
  <div>
    <div flex items-center justify-center gap1>
      <div text-xl fw400 :class="getValueColor(data)">
        {{ Number(data?.value) }}
      </div>
      <div op70>
        {{ data?.unit }}
      </div>
    </div>

    <div text-sm>
      {{ data?.name }}
    </div>
  </div>
</template>

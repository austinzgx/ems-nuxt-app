<script setup>
const { data, refresh } = useFetch('http://localhost:5432/api/sp')
</script>

<template>
  <UButton @click="refresh">
    Refresh
  </UButton>
  <div v-for="item in data" :key="item" flex="~ col gap2">
    <UCard>
      {{ item }}
    </UCard>
  </div>
</template>

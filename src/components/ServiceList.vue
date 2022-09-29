<template>
  <Empty v-if="campaignData.items === null" />
  <ServiceCard
    v-else
    v-for="item in campaignData.items"
    :key="item.itemId"
    :item="item"
  />
</template>

<script>
import { useAppStore } from '@/store/app'
import { storeToRefs } from 'pinia'

export default {
  setup() {
    const store = useAppStore();
    const { campaignData } = storeToRefs(store)
    return {
      store,
      campaignData
    }
  },
};
</script>

<style>
</style>

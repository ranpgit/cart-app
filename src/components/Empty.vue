<template>
  <n-card class="margin-bottom margin-large">
    <n-empty description="The cart is empty">
      <template #icon>
        <n-icon size="32">
          <ph-shopping-cart weight="bold" />
        </n-icon>
      </template>
      <template #extra>
        <n-button size="small"> Start Shopping </n-button>
      </template>
    </n-empty>
  </n-card>
</template>

<script>
  import { NCard, NEmpty, NIcon, NButton } from "naive-ui";
  import { PhShoppingCart } from "phosphor-vue";
  export default {
    components: {
      NCard,
      NEmpty,
      NIcon,
      NButton,
      PhShoppingCart
    }
  };
</script>

<style>
</style>

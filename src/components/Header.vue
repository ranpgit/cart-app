<template>
  <a href="/" class="button-link with-icon">
    <n-icon size="24">
      <ph-arrow-left />
    </n-icon>
    <div>Back to Website</div>
  </a>
  <n-space>
    <h1>Cart</h1>
    <n-tag>{{ itemLength }}</n-tag>
  </n-space>
</template>

<script>
import { NIcon, NTag, NSpace } from "naive-ui";
import { PhArrowLeft } from "phosphor-vue";

export default {
  props: ["itemLength"],
  components: {
    NIcon,
    PhArrowLeft,
    NTag,
    NSpace,
  },
};
</script>

<style>
</style>

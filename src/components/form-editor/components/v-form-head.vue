<template>
  <div class="sc u-shadow">
    <a-typography-title :heading="4">开发平台</a-typography-title>
  </div>
</template>

<script lang="ts" setup></script>

<style scoped lang="less">
  .sc {
    position: relative;
    height: 50px;
    margin-bottom: 8px;
    padding: 10px 20px;
    box-sizing: border-box;
    background-color: var(--color-bg-2);

    :deep(.arco-typography) {
      margin: 0;
    }
  }
</style>

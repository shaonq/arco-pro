<template>
  <div class="scoped--label" style="text-align: center; padding: 20px">当期控件不可编辑</div>
</template>

<script lang="ts" setup>
  defineProps({
    options: {
      type: Object,
      default() {
        return {};
      },
    },
  });
</script>

<style scoped lang="less">
  .scoped {
    &--label {
      font-size: 13px;
      user-select: text;
      color: var(--color-text-3);
      line-height: 28px;
    }
  }
</style>

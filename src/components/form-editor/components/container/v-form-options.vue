<template>
  <a-space direction="vertical" fill>
    <slot><component :is="getOptionsComponentName(prop.field.type)" :options="options" :category="field.category"></component></slot>
  </a-space>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import { getOptionsComponentName } from '../panel/index';
  import useVFormStore from '../store/index';
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  import { isReadonlyView } from '../config/index';
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const formStore = useVFormStore();
  /**
   * @desc 用于编辑器统一控制控件 例 拖动
   *
   */
  const prop = defineProps({
    field: {
      type: Object,
      default() {
        return {};
      },
    },
  });

  const options = computed(() => prop.field?.options ?? {});
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

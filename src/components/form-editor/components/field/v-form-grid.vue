<template>
  <a-row v-for="i in row" :key="i" align="stretch">
    <a-col v-for="j in span" :key="j" :span="colspan">
      <!-- 计算path[index] -->
      <vFormToolbox :field="updateField(getIndex(i, j))" :path="createPath(prop.path, getIndex(i, j))" style="height: 100%" :disabled="prop.disabled" />
    </a-col>
  </a-row>
</template>

<script lang="ts" setup>
  import { PropType, computed, watch } from 'vue';
  import { RecordStringAny } from '@/utils/index';
  import { createView, createPath } from '../config/index';
  import useVFormStore from '../store/index';

  import vFormToolbox from '../container/v-form-toolbar.vue';

  const formStore = useVFormStore();

  const prop = defineProps({
    field: Object as PropType<RecordStringAny>,
    path: String,
    disabled: Boolean,
  });

  const row = computed(() => prop.field?.options?.row ?? 1);
  const span = computed(() => prop.field?.options?.span ?? 2);
  const colspan = computed(() => Math.ceil(24 / span.value));

  function getIndex(a: number, b: number): number {
    return (a - 1) * span.value + (b - 1);
  }

  // 生成新的栅格
  function updateField(index: number) {
    const item = prop.field?.list?.[index] ?? createView({ label: '栅格列', options: { label: '栅格列' } });
    formStore.setPath(`${createPath(prop.path, index)}`, item);
    return item;
  }

  // 删除多入的栅格列
  watch([row, span], (value) => {
    if (!prop.path) return;
    const item = formStore.getPath(prop.path);
    if (!item) return;
    const list: RecordStringAny[] = item?.list ?? [];
    const number: number = value[0] * value[1];
    if (list.length > number) {
      formStore.setPath(`${prop.path}.list`, list.slice(0, number));
    }
  });
</script>

<style scoped lang="less">
  .sc {
    padding: 0 !important;
    &,
    &--content {
      position: relative;
      height: 100%;
      width: 100%;
      box-sizing: border-box;
    }
    &--content {
      min-height: 100px;
      border: 1px dashed rgb(var(--primary-5));
      background: var(--color-menu-light-bg);
      box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.08);
      padding-bottom: 8px;
    }
  }
</style>

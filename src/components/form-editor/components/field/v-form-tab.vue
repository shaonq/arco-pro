<template>
  <a-tabs type="card-gutter" class="fe-form-tab">
    <a-tab-pane v-for="index in row" :key="index" :title="updateField(index - 1)?.label">
      <vFormToolbox :field="updateField(index - 1)" :path="createPath(prop.path, index - 1)" style="height: 100%" :disabled="prop.disabled" />
    </a-tab-pane>
  </a-tabs>
</template>

<script lang="ts" setup>
  import { PropType, computed } from 'vue';
  import { RecordStringAny } from '@/utils/index';
  import { createView, createPath } from '../config/index';
  import useVFormStore from '../store/index';

  import vFormToolbox from '../container/v-form-toolbar.vue';

  const vFormStore = useVFormStore();

  const prop = defineProps({
    field: Object as PropType<RecordStringAny>,
    path: String,
    disabled: Boolean,
  });

  const row = computed(() => prop.field?.options?.row ?? 1);

  function updateField(index: number) {
    const item = prop.field?.list?.[index] ?? createView({ label: '标签列', options: { label: '标签列' } });
    vFormStore.setPath(`${createPath(prop.path, index)}`, item);
    return item;
  }
</script>

<style scoped lang="less">
  .fe-form-tab {
    background: #fff;
  }
</style>

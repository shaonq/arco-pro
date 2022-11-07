<template>
  <draggable
    :list="prop.field.list"
    class="sc--content arco-row arco-row-align-start arco-row-justify-start"
    group="toolsGroup"
    animation="300"
    drag-class="fe-drag"
    ghost-class="fe-ghost"
    chosen-class="fe-chosen"
    item-key="id"
    handle=".fe-moving"
    @update="vFormStore.onHistoryChange"
  >
    <template #item="{ element, index }">
      <a-col :span="prop.field.span" class="sc--item">
        <v-form-toolbox :field="element" :path="setPath(index)" :disabled="prop.disabled" />
      </a-col>
    </template>
  </draggable>
</template>

<script lang="ts" setup>
  import { PropType } from 'vue';
  import draggable from 'vuedraggable';
  import { RecordStringAny } from '@/utils/index';

  import vFormToolbox from '../container/v-form-toolbar.vue';

  import useVFormStore from '../store/index';

  const vFormStore = useVFormStore();

  const prop = defineProps({
    field: Object as PropType<RecordStringAny>,
    path: String,
    disabled: Boolean,
  });

  function setPath(index: number): string {
    return `${prop.path}.list[${index}]`;
  }
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

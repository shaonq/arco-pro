<template>
  <draggable
    :list="prop.field.list"
    group="toolsGroup"
    class="fe-form-view"
    :class="{ 'is-disabled': prop.disabled }"
    animation="300"
    drag-class="fe-drag"
    ghost-class="fe-ghost"
    chosen-class="fe-chosen"
    item-key="id"
    handle=".fe-moving"
    @update="vFormStore.onHistoryChange"
  >
    <template #item="{ element, index }">
      <v-form-toolbox :field="element" :path="createPath(prop.path, index)" :disabled="prop.disabled" />
    </template>
  </draggable>
</template>

<script lang="ts" setup>
  /**
   * @desc 可添加控件的容器
   *
   */
  import { PropType } from 'vue';
  import draggable from 'vuedraggable';
  import { RecordStringAny } from '@/utils/index';

  import vFormToolbox from '../container/v-form-toolbar.vue';

  import useVFormStore from '../store/index';
  import { createPath } from '../config/index';

  const vFormStore = useVFormStore();

  const prop = defineProps({
    field: Object as PropType<RecordStringAny>,
    path: String,
    disabled: Boolean,
  });
</script>

<style lang="less">
  .fe-form-view {
    padding: 0 !important;
    position: relative;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    min-height: 30px;
    outline: 1px dashed rgb(var(--primary-5));
    // background: var(--color-menu-light-bg);
    // box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.08);
    &.is-disabled {
      outline: none;
    }
  }
</style>

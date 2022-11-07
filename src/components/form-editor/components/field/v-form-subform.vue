<template>
  <div class="fe-form-subform" :class="{ 'is-disabled': prop.disabled }">
    <a-scrollbar style="width: 100%; overflow: auto">
      <draggable
        :list="prop.field.list"
        group="toolsGroup"
        class="fe-form-subform-warp"
        :class="{ 'is-disabled': prop.disabled }"
        animation="300"
        drag-class="fe-form-subform-drag"
        ghost-class="fe-form-subform-ghost"
        chosen-class="fe-form-subform-chosen"
        item-key="id"
        handle=".fe-moving"
        @update="formStore.onHistoryChange"
        @add="(ev) => onItemAdd(ev, prop.path)"
      >
        <template #item="{ element, index }">
          <v-form-toolbox :field="element" :path="createPath(prop.path, index)" :disabled="prop.disabled">
            <div class="arco-table-th fe-form-subform-th" style="">
              {{ element.options?.label }}
            </div>
            <div class="arco-table-td fe-form-subform-td"></div>
            <div class="arco-table-td fe-form-subform-td"></div>
          </v-form-toolbox>
        </template>
      </draggable>
    </a-scrollbar>
  </div>
</template>

<script lang="ts" setup>
  /**
   * @desc 可添加控件的容器
   *
   */
  import { PropType } from 'vue';
  import draggable from 'vuedraggable';
  import { RecordStringAny } from '@/utils/index';
  import { Message } from '@/hooks/arco';
  import vFormToolbox from '../container/v-form-toolbar.vue';

  import useFormStore from '../store/index';
  import { createPath } from '../config/index';

  const formStore = useFormStore();

  const prop = defineProps({
    field: Object as PropType<RecordStringAny>,
    path: String,
    disabled: Boolean,
  });

  // 添加节点之后要处理的操作
  function onItemAdd({ newDraggableIndex }: { newDraggableIndex: number }, defPath = '') {
    const path = defPath ? `${defPath}.list[${newDraggableIndex}]` : `list[${newDraggableIndex}]`;
    const item: RecordStringAny | undefined = formStore.getPath(path, true);
    if (!item) return;
    // 不允许添加非 field 的节点
    if (item.category !== 'field') {
      formStore.deleteSelected(path);
      Message.info('不支持的类型');
    }
  }
</script>

<style lang="less">
  .fe-form-subform {
    outline: 1px dashed rgb(var(--primary-5));
    width: 100%;
    border: 1px solid var(--color-neutral-3);
    &.is-disabled {
      outline: none;
    }
  }
  .fe-form-subform-warp {
    position: relative;
    min-height: 100px;
    display: flex;
  }
  .fe-form-subform-ghost {
    width: 100px !important;
    z-index: 9;
  }
  .fe-form-subform-td,
  .fe-form-subform-th {
    height: 36px;
    line-height: 36px;
    width: 100px;
    border-bottom: none;
    text-indent: 0.4em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .fe-form-subform-td {
    border-top: 1px solid var(--color-neutral-3);
  }
</style>

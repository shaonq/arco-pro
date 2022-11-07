<template>
  <div class="fe-canvas">
    <!-- 工具条 -->
    <div class="fe-toolbar">
      <a-space>
        <a-button @click="formStore.reset()">
          <template #icon> <icon-refresh /> </template>
          清空
        </a-button>
        <a-button :disabled="disabled" @click="formStore.repeatSelected()">
          <template #icon> <icon-copy /> </template>
          重复
        </a-button>
        <a-button :disabled="disabled" @click="formStore.deleteSelected()">
          <template #icon> <icon-close /></template>
          删除
        </a-button>
        <a-button :disabled="isUndoDisabled" @click="formStore.undoHistory()">
          <template #icon> <icon-rotate-left /></template>
          撤销
        </a-button>
        <a-button :disabled="isRedoDisabled" @click="formStore.redoHistory()">
          <template #icon> <icon-rotate-right /></template>
          重做
        </a-button>
        <a-divider direction="vertical" />
        <slot name="buttons"> </slot>
      </a-space>
    </div>
    <!-- 画布区 -->
    <div class="fe-content">
      <a-form
        class="fe-form"
        :model="form"
        :layout="formStore.formConfig.labelPosition"
        :label-align="formStore.formConfig.labelAlign"
        :size="formStore.formConfig.size"
      >
        <draggable
          :list="list"
          class="fe-list"
          group="toolsGroup"
          animation="300"
          drag-class="fe-drag"
          ghost-class="fe-ghost"
          chosen-class="fe-chosen"
          item-key="id"
          handle=".fe-moving"
          @update="formStore.onHistoryChange"
          @add="(ev) => onItemAdd(ev)"
        >
          <template #item="{ element, index }">
            <v-form-Toolbar :field="element" :path="createPath(null, index)" />
          </template>
          <template #footer> <a-empty v-if="!list.length" /></template>
        </draggable>
      </a-form>
    </div>
    <!-- footer-bar -->
    <div class="fe-footer">
      <div class="fe-footer__content">
        <a-breadcrumb>
          <template #separator> <icon-right /> </template>
          <a-breadcrumb-item><a-link>编辑器</a-link></a-breadcrumb-item>
          <template v-if="selectedTree">
            <a-breadcrumb-item v-for="(item, index) in selectedTree" :key="index">
              <a-link @click="formStore.getPath(item.path, true)">{{ item.options?.label ?? item.label }}</a-link>
            </a-breadcrumb-item>
          </template>
        </a-breadcrumb>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, computed, watch } from 'vue';
  import draggable from 'vuedraggable';
  import { RecordStringAny } from '@/utils/index';
  import useVFormStore from './store/index';
  import vFormToolbar from './container/v-form-toolbar.vue';
  import { createPath, isReadonlyView } from './config/index';

  const formStore = useVFormStore();
  const list = computed(() => formStore.list);
  const form = ref({});
  const disabled = computed(() => {
    return !isReadonlyView(formStore.selectedConfig);
  });

  const selectedTree = computed(() => {
    if (formStore.selectedPath) {
      const l = String(formStore.selectedPath).split('.');
      const li: RecordStringAny[] = [];
      l.reduce((path, b) => {
        path = !path ? b : `${path}.${b}`;
        const v = formStore.getPath(path);
        if (v) li.push(v);
        return path;
      }, '');
      return li;
    }
    return false;
  });

  const isUndoDisabled = computed(() => !formStore.history.isUndo);
  const isRedoDisabled = computed(() => !formStore.history.isRedo);

  // 选择新添加的容器
  function onItemAdd({ newDraggableIndex }: { newDraggableIndex: number }, defPath = '') {
    const path = defPath ? `${defPath}.list[${newDraggableIndex}]` : `list[${newDraggableIndex}]`;
    return formStore.getPath(path, true);
  }
  // 自动选择容器
  watch(
    () => [formStore.selectedId, formStore.selectedPath],
    (newValue, oldValue) => {
      if (!newValue[0]) {
        const arr = oldValue[1].split('.');
        const loop = (a: string[]): boolean => {
          if (a.length === arr.length) {
            const b = a[a.length - 1];
            let idx = Number(b.slice(5, -1)) - 1;
            if (Number.isNaN(idx)) idx = 0;
            if (idx < 0) {
              const parent = formStore.getPath(a.slice(0, -1).join('.'));
              if (!parent) return false;
              if (parent.list?.length > 0) idx = 0;
              else return false;
            }
            a[a.length - 1] = `list[${idx}]`;
          }
          return Boolean(formStore.getPath(a.join('.'), true));
        };
        for (let i = arr.length; i > 0; i -= 1) {
          const isFlag = loop(arr.slice(0, i));
          if (isFlag) return;
        }
        // 兜底
        if (formStore.list[0]) formStore.setSelected(formStore.list[0]);
      }
    }
  );
</script>

<style lang="less">
  .fe-canvas {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    min-height: 200px;
  }
  .fe-form {
    display: block;
    height: 100%;
  }
  .fe-list {
    display: block;
    padding: 2px;
    height: 100%;
    min-height: 120px;
    box-sizing: border-box;
  }
  .fe-toolbar {
    position: relative;
    padding: 3px 12px 0;
    height: 40px;
    box-sizing: border-box;
    background: var(--color-menu-light-bg);
    overflow: hidden;
    border: 1px solid var(--color-neutral-3);
    border-top: 0;
    box-sizing: border-box;
  }
  .fe-content {
    display: block;
    position: relative;
    padding: 8px;
    height: calc(100% - 100px);
    box-sizing: border-box;
    overflow: auto;
  }
  .fe-footer {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 24px;
    line-height: 24px;
    box-sizing: border-box;
    overflow: hidden;
    &__content {
      border: 1px solid var(--color-neutral-3);
      padding-left: 3px;
      background: var(--color-bg-2);
      box-shadow: 0 2px 5px 0 rgb(0 0 0 / 8%);
      .arco-link {
        font-size: 12px;
      }
    }
  }
</style>

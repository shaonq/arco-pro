<template>
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
      >
        <template #item="{ element }">
          <v-form-toolbox :field="element" :disabled="true" />
        </template>
        <template #footer> <a-empty v-if="!list.length" /></template>
      </draggable>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
  import { ref, computed } from 'vue';
  import draggable from 'vuedraggable';
  import useVFormStore from './components/store/index';
  import vFormToolbox from './components/container/v-form-toolbar.vue';
  import { useProvide } from './components/config/event';

  const emit = defineEmits(['onToolbarClick']);

  useProvide(emit);

  const formStore = useVFormStore();
  const list = computed(() => formStore.list);
  const form = ref({});
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
    // box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.08);
    // background: var(--color-menu-light-bg);
    // padding: 20px 20px 80px;
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

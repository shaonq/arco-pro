<template>
  <a-layout class="fe-inherit">
    <a-layout class="fe-inherit">
      <a-layout-sider :width="210">
        <v-from-side></v-from-side>
      </a-layout-sider>
      <a-layout-content>
        <div class="fe-inherit">
          <v-from-body>
            <template #buttons>
              <a-button @click="handleFromList()">
                <template #icon> <icon-eye /></template>
                预览
              </a-button>
              <a-button @click="handleFromSave()">
                <template #icon> <icon-save /></template>
                保存
              </a-button>
            </template>
          </v-from-body>
        </div>
      </a-layout-content>
      <a-layout-sider :width="280">
        <v-from-panel></v-from-panel>
      </a-layout-sider>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
  import { deepClone } from '@/utils';
  import VFromBody from './components/v-form-body.vue';
  import VFromSide from './components/v-form-side.vue';
  import VFromPanel from './components/v-form-panel.vue';
  import useVFormStore from './components/store/index';
  import { useProvide } from './components/config/event';

  const formStore = useVFormStore();

  const emit = defineEmits(['onPreview', 'onSave', 'onToolbarClick']);

  useProvide(emit);

  /**
   * ============================================================
   * 编辑器专属事件
   */
  // save
  function handleFromList() {
    emit(
      'onPreview',
      {
        list: deepClone(formStore.list),
        formConfig: deepClone(formStore.formConfig),
        formData: deepClone(formStore.formData),
      },
      formStore.reset
    );
  }
  function handleFromSave() {
    emit(
      'onSave',
      {
        list: deepClone(formStore.list),
        formConfig: deepClone(formStore.formConfig),
        formData: deepClone(formStore.formData),
      },
      formStore.reset
    );
  }
</script>

<style lang="less">
  .fe-inherit {
    position: relative;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }
</style>

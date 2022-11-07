<template>
  <div class="sc">
    <a-tabs default-active-key="1">
      <a-tab-pane key="1">
        <template #title>控件属性</template>
        <div class="sc--content">
          <VFormOptions v-if="formStore.selectedId" :field="formStore.selectedConfig" />
          <a-empty v-else />
        </div>
      </a-tab-pane>
      <a-tab-pane key="2">
        <template #title>表单属性</template>
        <div class="sc--content">
          <a-space direction="vertical" fill>
            <a-row v-for="(value, key, index) in asHTMLElement(formStore.formConfig)" :key="index" align="center">
              <!-- 过滤系统属性 -->
              <template v-if="!['nameOfIndex'].includes(key)">
                <a-col v-if="typeName(value) !== 'Object'" :span="7" class="sc--label"> {{ $t(`form.editor.formConfig.${key}`) }} </a-col>
                <a-col :span="17">
                  <template v-if="['labelWidth'].includes(key)">
                    <a-input-number :model-value="+value" :min="0" size="mini" mode="button" @update:model-value="(v) => formStore.updateFormConfig(key, v)">
                      <template #suffix> px </template>
                    </a-input-number>
                  </template>
                  <template v-else-if="['labelAlign'].includes(key)">
                    <a-radio-group :model-value="value" type="button" size="mini" @update:model-value="(v) => formStore.updateFormConfig(key, v)">
                      <a-radio value="left">居左</a-radio>
                      <a-radio value="right">居右</a-radio>
                    </a-radio-group>
                  </template>
                  <template v-else-if="['labelPosition'].includes(key)">
                    <a-radio-group :model-value="value" type="button" size="mini" @update:model-value="(v) => formStore.updateFormConfig(key, v)">
                      <a-radio value="horizontal">水平</a-radio>
                      <a-radio value="vertical">垂直</a-radio>
                    </a-radio-group>
                  </template>
                  <template v-else-if="['size'].includes(key)">
                    <a-radio-group :model-value="value" type="button" size="mini" @update:model-value="(v) => formStore.updateFormConfig(key, v)">
                      <a-radio value="medium">默认</a-radio>
                      <a-radio value="small">中等</a-radio>
                      <a-radio value="mini">紧凑</a-radio>
                    </a-radio-group>
                  </template>
                  <template v-else>
                    <a-input :model-value="String(value)" size="mini" @update:model-value="(v) => formStore.updateFormConfig(key, v)" />
                  </template>
                </a-col>
              </template>
            </a-row>
          </a-space>
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script lang="ts" setup>
  import { asHTMLElement, typeName } from '@/utils/index';
  import useVFormStore from './store/index';
  import VFormOptions from './container/v-form-options.vue';

  const formStore = useVFormStore();
</script>

<style scoped lang="less">
  .sc {
    user-select: none;

    &--content {
      padding: 8px;
    }
    :deep(.arco-tabs-content) {
      padding-top: 0;
    }
    &--label {
      font-size: 13px;
      user-select: text;
      color: var(--color-text-3);
      line-height: 28px;
    }
  }
</style>

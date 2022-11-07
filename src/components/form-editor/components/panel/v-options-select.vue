<template>
  <a-space direction="vertical" fill>
    <a-row v-for="(value, key) in options" :key="key" align="center">
      <template v-if="typeName(value) === 'String'">
        <a-col :span="7" class="scoped--label">
          {{ $t(`form.editor.options.${key}`) }}
        </a-col>
        <a-col :span="17">
          <a-input :model-value="value" size="mini" @update:model-value="(value) => updateOptions(key, value)" />
        </a-col>
      </template>
      <template v-else-if="typeName(value) === 'Boolean'">
        <a-col :span="7" class="scoped--label">
          {{ $t(`form.editor.options.${key}`) }}
        </a-col>
        <a-col :span="17">
          <a-switch :model-value="value" size="small" @update:model-value="(value) => updateOptions(key, value)" />
        </a-col>
      </template>
      <template v-else-if="typeName(value) === 'Number'">
        <a-col :span="7" class="scoped--label">
          {{ $t(`form.editor.options.${key}`) }}
        </a-col>
        <a-col :span="17">
          <a-input-number :model-value="+value" mode="button" :min="1" size="small" @update:model-value="(value) => updateOptions(key, value)" />
        </a-col>
      </template>
      <template v-else>
        <a-col :span="24" class="scoped--label">
          {{ $t(`form.editor.options.${key}`) }}
        </a-col>
        <a-col :span="24">
          <a-space direction="vertical" fill>
            <a-space v-for="(a, index) in value" :key="index">
              <a-input-group>
                <a-input :model-value="a.label" size="mini" @update:model-value="(v) => updateList(key, value, index, 'label', v)" />
                <a-input :model-value="a.value" size="mini" @update:model-value="(v) => updateList(key, value, index, 'value', v)" />
              </a-input-group>
              <a-button size="mini" shape="circle" @click="() => addList(key, value, index)">+</a-button>
              <a-button size="mini" shape="circle" :disabled="value.length <= 1" @click="() => deleteList(key, value, index)">-</a-button>
            </a-space>
          </a-space>
        </a-col>
      </template>
    </a-row>
  </a-space>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import { typeName, deepClone, RecordStringAny } from '@/utils/index';
  import useVFormStore from '../store/index';
  import { createSelectOption } from '../config/widget/common';

  const { updateOptions } = useVFormStore();
  const prop = defineProps({
    options: {
      type: Object,
      default() {
        return {};
      },
    },
  });

  const options = computed(() => prop.options);

  function updateList(key: string, value: RecordStringAny[], index: number, k: string, v: string) {
    const newList = deepClone(value);
    newList[index][k] = v;
    updateOptions(key, newList);
  }
  function addList(key: string, value: RecordStringAny[], index: number) {
    const newList = deepClone(value);
    newList.splice(index + 1, 0, createSelectOption(newList.length + 1));
    updateOptions(key, newList);
  }
  function deleteList(key: string, value: RecordStringAny[], index: number) {
    const newList = deepClone(value);
    newList.splice(index, 1);
    updateOptions(key, newList);
  }
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

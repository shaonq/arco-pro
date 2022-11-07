<template>
  <a-space direction="vertical" fill>
    <a-row v-for="(value, key) in options" :key="key" align="center">
      <template v-if="key === 'name'">
        <template v-if="category === 'field'">
          <a-col :span="7" class="scoped--label">
            {{ getLabelName(key) }}
            <a-popover :content-style="{ padding: '0 12px 3px' }">
              <icon-info-circle-fill style="font-size: 15px; cursor: help" />
              <template #content> <div class="scoped--label">唯一，修改需按回车确认</div> </template>
            </a-popover>
          </a-col>
          <a-col :span="17">
            <a-input
              :model-value="name"
              size="mini"
              @update:model-value="(value) => (name = value)"
              @press-enter="(event) => updateOptionsName(key, asHTMLElement(event.target)?.value)"
            />
          </a-col>
        </template>
      </template>
      <template v-else-if="key === 'elementType'">
        <a-col :span="7" class="scoped--label"> {{ getLabelName(key) }} </a-col>
        <a-col :span="17">
          <span class="scoped--label"> {{ value }}</span>
        </a-col>
      </template>
      <template v-else-if="typeName(value) === 'String'">
        <a-col :span="7" class="scoped--label"> {{ getLabelName(key) }} </a-col>
        <a-col :span="17">
          <a-input :model-value="value" size="mini" @update:model-value="(value) => updateOptions(key, value)" />
        </a-col>
      </template>
      <template v-else-if="typeName(value) === 'Boolean'">
        <a-col :span="7" class="scoped--label">
          {{ getLabelName(key) }}
        </a-col>
        <a-col :span="17">
          <a-switch :model-value="value" size="small" @update:model-value="(value) => updateOptions(key, value)" />
        </a-col>
      </template>
      <template v-else-if="typeName(value) === 'Number'">
        <a-col :span="7" class="scoped--label">
          {{ getLabelName(key) }}
        </a-col>
        <a-col :span="17">
          <a-input-number :model-value="+value" mode="button" :min="1" size="mini" @update:model-value="(value) => updateOptions(key, value)" />
        </a-col>
      </template>
      <template v-else>
        <a-col :span="24" class="scoped--label">
          {{ getLabelName(key) }}
        </a-col>
        <a-col :span="24">
          {{ value }}
        </a-col>
      </template>
    </a-row>
  </a-space>
</template>

<script lang="ts" setup>
  import { ref, watch } from 'vue';
  import { Message } from '@/hooks/arco';
  import { typeName, asHTMLElement } from '@/utils/index';
  import { regTest } from '@/utils/validators';
  import useLocale from '@/hooks/locale';
  import useVFormStore from '../store/index';

  const prop = defineProps({
    options: {
      type: Object,
      default() {
        return {};
      },
    },
    category: {
      type: String,
      default: '',
    },
  });

  const { t } = useLocale();
  const { updateOptions, formData } = useVFormStore();

  function getLabelName(key: string): string {
    return t(`form.editor.options.${key}`);
  }
  const name = ref<string>(prop.options.name ?? '');

  watch(
    () => prop.options.name,
    (value) => {
      name.value = value;
    }
  );

  function updateOptionsName(key: string, value?: string) {
    if (!value || value === prop.options.name) return;
    if (typeName(formData[value]) === 'Undefined') {
      if (regTest('account', value)) {
        updateOptions(key, value);
        Message.success(`${value} 修改成功`);
      } else {
        Message.warning(` ${name.value} 格式不正确`);
        name.value = prop.options.name;
      }
    } else {
      Message.warning(` ${name.value} 已存在`);
      name.value = prop.options.name;
    }
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

<template>
  <a-form-item :label="field.options.label" :label-col-flex="vFormStore.formConfig.labelWidth + 'px'">
    <a-space direction="vertical" :style="{ width: '100%' }">
      <a-upload action="/" :list-type="prop.field.options?.pictureMode ? 'picture-card' : undefined" />
    </a-space>
  </a-form-item>
</template>

<script lang="ts" setup>
  import useVFormStore from '../store/index';

  const vFormStore = useVFormStore();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const prop = defineProps({
    field: Object,
    state: {
      type: Boolean,
      default: false,
    },
    disabled: Boolean,
  });
</script>

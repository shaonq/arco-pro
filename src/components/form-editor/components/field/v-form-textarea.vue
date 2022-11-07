<template>
  <a-form-item :label="field.options.label" :label-col-flex="vFormStore.formConfig.labelWidth + 'px'">
    <a-textarea />
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

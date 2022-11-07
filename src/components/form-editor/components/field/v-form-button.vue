<template>
  <a-form-item :label-col-flex="vFormStore.formConfig.labelWidth + 'px'">
    <a-button>{{ field.options.label }}</a-button>
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

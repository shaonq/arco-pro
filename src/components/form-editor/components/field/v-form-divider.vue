<template>
  <!-- <a-form-item :label="field.options.label" :label-col-flex="field.options.columnWidth"> -->
  <a-divider />
  <!-- </a-form-item> -->
</template>

<script lang="ts" setup>
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

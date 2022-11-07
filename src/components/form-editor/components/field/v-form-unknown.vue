<template>
  <a-card size="small"> 404 - {{ prop.field.label }} / {{ prop.field.type }} </a-card>
</template>

<script lang="ts" setup>
  const prop = defineProps({
    field: Object,
    disabled: Boolean,
  });
</script>

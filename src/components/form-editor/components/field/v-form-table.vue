<template>
  <CommonTable ref="tableRef" :url="'http://172.16.10.74:9000/oss-application-center/domainapp/queryMyAppData'" :columns="columns"></CommonTable>
</template>

<script lang="ts" setup>
  import CommonTable, { CommonTableColumnsType } from '@/components/common-table/index';
  import useVFormStore from '../store/index';
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const formStore = useVFormStore();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const prop = defineProps({
    field: Object,
    path: String,
    disabled: Boolean,
  });

  const columns: CommonTableColumnsType[] = [
    { name: 'name', label: '应用名称' },
    { name: 'code', label: '应用编码' },
    { name: 'icon', label: '图标' },
    { name: 'datasourceName', label: '数据库' },
    { name: 'status', label: '状态' },
  ];
</script>

<style scoped lang="less">
  .sc {
    padding: 0 !important;
    &,
    &--content {
      position: relative;
      height: 100%;
      width: 100%;
      box-sizing: border-box;
    }
    &--content {
      min-height: 100px;
      border: 1px dashed rgb(var(--primary-5));
      background: var(--color-menu-light-bg);
      box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.08);
      padding-bottom: 8px;
    }
  }
</style>

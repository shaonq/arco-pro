<template>
  <div class="container">
    <!-- <Breadcrumb :items="['menu.list', 'menu.list.searchTable']" /> -->
    <a-card class="general-card" :title="$t('menu.list.searchTable')">
      <a-row>
        <a-col :flex="1">
          <a-form :model="formModel" :label-col-props="{ span: 6 }" :wrapper-col-props="{ span: 18 }" label-align="left">
            <a-row :gutter="16">
              <a-col :span="8">
                <a-form-item field="number" :label="$t('searchTable.form.number')">
                  <a-input v-model="formModel.number" :placeholder="$t('searchTable.form.number.placeholder')" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="name" :label="$t('searchTable.form.name')">
                  <a-input v-model="formModel.name" :placeholder="$t('searchTable.form.name.placeholder')" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="contentType" :label="$t('searchTable.form.contentType')">
                  <a-select v-model="formModel.contentType" :options="contentTypeOptions" :placeholder="$t('searchTable.form.selectDefault')" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="filterType" :label="$t('searchTable.form.filterType')">
                  <a-select v-model="formModel.filterType" :options="filterTypeOptions" :placeholder="$t('searchTable.form.selectDefault')" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="createdTime" :label="$t('searchTable.form.createdTime')">
                  <a-range-picker v-model="formModel.createdTime" style="width: 100%" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="status" :label="$t('searchTable.form.status')">
                  <a-select v-model="formModel.status" :options="statusOptions" :placeholder="$t('searchTable.form.selectDefault')" />
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </a-col>
        <a-divider style="height: 84px" direction="vertical" />
        <a-col flex="86px" style="text-align: right">
          <a-space direction="vertical" :size="18">
            <a-button type="primary" :loading="loading" @click="search">
              <template #icon>
                <icon-search />
              </template>
              {{ $t('searchTable.form.search') }}
            </a-button>
            <a-button @click="reset">
              <template #icon>
                <icon-refresh />
              </template>
              {{ $t('searchTable.form.reset') }}
            </a-button>
          </a-space>
        </a-col>
      </a-row>

      <OrchiskyTable ref="tableRef" v-model:selected-keys="selectedKeys" :option="tableOptions" :height="480" :size="(size as any)">
        <template #default>
          <a-space style="margin-left: -8px">
            <a-button type="primary" size="small">
              <template #icon>
                <icon-plus />
              </template>
              {{ $t('searchTable.operation.create') }}
            </a-button>
            <a-radio-group
              v-model="size"
              type="button"
              :options="[
                { label: '小', value: 'mini' },
                { label: '中', value: 'small' },
                { label: '大', value: 'medium' },
              ]"
            />
            <a-upload action="/" size="small">
              <template #upload-button>
                <a-button>
                  {{ $t('searchTable.operation.import') }}
                </a-button>
              </template>
            </a-upload>
          </a-space>
        </template>
        <template #cell="{ record, dataIndex }">
          <template v-if="dataIndex === 'contentType'">
            <a-space>
              <a-avatar v-if="record.contentType === 'img'" :size="16" shape="square">
                <img alt="avatar" src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/581b17753093199839f2e327e726b157.svg~tplv-49unhts6dw-image.image" />
              </a-avatar>
              <a-avatar v-else-if="record.contentType === 'horizontalVideo'" :size="16" shape="square">
                <img alt="avatar" src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/77721e365eb2ab786c889682cbc721c1.svg~tplv-49unhts6dw-image.image" />
              </a-avatar>
              <a-avatar v-else :size="16" shape="square">
                <img alt="avatar" src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/ea8b09190046da0ea7e070d83c5d1731.svg~tplv-49unhts6dw-image.image" />
              </a-avatar>
              {{ $t(`searchTable.form.contentType.${record.contentType}`) }}
            </a-space>
          </template>
          <div v-if="dataIndex === 'status'" class="arco-table-cell">
            <span v-if="record.status === 'offline'" class="circle"></span>
            <span v-else class="circle pass"></span>
            {{ $t(`searchTable.form.status.${record.status}`) }}
          </div>
          <template v-if="dataIndex === 'operations'">
            <a-button v-permission="['admin']" type="text" :size="size">
              {{ $t('searchTable.columns.operations.view') }}
            </a-button>
          </template>
        </template>
      </OrchiskyTable>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref, reactive, watch } from 'vue';
  import { useI18n } from 'vue-i18n';
  import useLoading from '@/hooks/loading';
  import { queryPolicyList, PolicyRecord, PolicyParams } from '@/api/list';
  import { Pagination } from '@/types/global';
  import type { SelectOptionData } from '@arco-design/web-vue/es/select/interface';
  import type { TableColumnData } from '@arco-design/web-vue/es/table/interface';
  import OrchiskyTable, { useOrchiskyVxe } from '@/components/orchisky-vxe';
  import { cloneDeep } from '@/utils';

  type SizeProps = 'mini' | 'small' | 'medium' | 'large';
  type Column = TableColumnData & { checked?: true };

  const generateFormModel = () => {
    return {
      number: '',
      name: '',
      contentType: '',
      filterType: '',
      createdTime: [],
      status: '',
    };
  };
  const { loading, setLoading } = useLoading(true);
  const { t } = useI18n();
  const renderData = ref<PolicyRecord[]>([]);
  const formModel = ref(generateFormModel());
  const cloneColumns = ref<Column[]>([]);
  const showColumns = ref<Column[]>([]);

  const size = ref<SizeProps>('small');

  const basePagination: Pagination = {
    current: 1,
    pageSize: 20,
  };
  const pagination = reactive({
    ...basePagination,
  });

  const columns = computed<TableColumnData[]>(() => [
    {
      title: t('searchTable.columns.index'),
      dataIndex: 'index',
      slotName: 'index',
      width: 20,
    },
    {
      title: t('searchTable.columns.number'),
      dataIndex: 'number',
    },
    {
      title: t('searchTable.columns.name'),
      dataIndex: 'name',
    },
    {
      title: t('searchTable.columns.contentType'),
      dataIndex: 'contentType',
      slotName: 'contentType',
      cell: true,
      div: true,
    },
    {
      title: t('searchTable.columns.filterType'),
      dataIndex: 'filterType',
    },
    {
      title: t('searchTable.columns.count'),
      dataIndex: 'count',
    },
    {
      title: t('searchTable.columns.createdTime'),
      dataIndex: 'createdTime',
    },
    {
      title: t('searchTable.columns.status'),
      dataIndex: 'status',
      slotName: 'status',
      cell: true,
      div: true,
    },
    {
      title: t('searchTable.columns.operations'),
      dataIndex: 'operations',
      slotName: 'operations',
      cell: true,
      div: true,
    },
  ]);
  const contentTypeOptions = computed<SelectOptionData[]>(() => [
    {
      label: t('searchTable.form.contentType.img'),
      value: 'img',
    },
    {
      label: t('searchTable.form.contentType.horizontalVideo'),
      value: 'horizontalVideo',
    },
    {
      label: t('searchTable.form.contentType.verticalVideo'),
      value: 'verticalVideo',
    },
  ]);
  const filterTypeOptions = computed<SelectOptionData[]>(() => [
    {
      label: t('searchTable.form.filterType.artificial'),
      value: 'artificial',
    },
    {
      label: t('searchTable.form.filterType.rules'),
      value: 'rules',
    },
  ]);
  const statusOptions = computed<SelectOptionData[]>(() => [
    {
      label: t('searchTable.form.status.online'),
      value: 'online',
    },
    {
      label: t('searchTable.form.status.offline'),
      value: 'offline',
    },
  ]);

  const { tableRef, selectedKeys, tableOptions } = useOrchiskyVxe({
    method: 'POST',
    selectedType: 'checkbox',
    scrollX: { enabled: true },
    scrollY: { enabled: true },
    columns: [],
    resolveColumns: () => {
      return columns.value.concat([{ title: 'other' }]) as any;
    },
  });

  const fetchData = async (params: PolicyParams = { current: 1, pageSize: 20 }) => {
    setLoading(true);
    try {
      const { data } = await queryPolicyList(params);
      renderData.value = data.list;
      pagination.current = params.current;
      pagination.total = data.total;
      tableRef.value?.loadData(renderData.value);
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      setLoading(false);
    }
  };

  const search = () => {
    fetchData({
      ...basePagination,
      ...formModel.value,
    } as unknown as PolicyParams);
  };

  fetchData();
  const reset = () => {
    formModel.value = generateFormModel();
  };

  watch(
    () => columns.value,
    (val) => {
      cloneColumns.value = cloneDeep(val);
      cloneColumns.value.forEach((item, index) => {
        item.checked = true;
      });
      showColumns.value = cloneDeep(cloneColumns.value);
    },
    { deep: true, immediate: true }
  );
</script>

<script lang="ts">
  export default {
    name: 'SearchTable',
  };
</script>

<style scoped lang="less">
  .container {
    position: relative;
    height: 100%;
    width: 100%;
    padding: 16px;
    box-sizing: border-box;
  }
  :deep(.arco-table-th) {
    &:last-child {
      .arco-table-th-item-title {
        margin-left: 16px;
      }
    }
  }
  .action-icon {
    margin-left: 12px;
    cursor: pointer;
  }
  .active {
    color: #0960bd;
    background-color: #e3f4fc;
  }
  .setting {
    display: flex;
    align-items: center;
    width: 200px;
    .title {
      margin-left: 12px;
      cursor: pointer;
    }
  }
</style>

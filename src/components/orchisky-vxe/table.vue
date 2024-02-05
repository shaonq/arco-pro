<template>
  <div class="orchisky-vxe">
    <vxe-toolbar v-if="!props.hideToolbar" size="mini" class-name="orchisky-vxe__toolbar">
      <template #buttons>
        <slot>
          <div> {{ props.title }}</div>
        </slot>
      </template>
      <template #tools>
        <a-space size="small">
          <slot name="tools"></slot>
          <a-tooltip content="表格斑马纹" mini>
            <a-switch v-model="stripe" size="small">
              <template #checked> 开 </template>
              <template #unchecked> 关 </template>
            </a-switch>
          </a-tooltip>
          <a-tooltip content="刷新" mini>
            <a-button :loading="loading" size="small" class="arco-btn-light" style="border: 0" @click="onUserReset()">
              <template #icon> <icon-refresh :size="16" /> </template>
            </a-button>
          </a-tooltip>

          <vxe-pulldown ref="settingRef" transfer>
            <template #default>
              <a-tooltip content="设置" mini>
                <a-button size="small" class="arco-btn-light" style="border: 0">
                  <template #icon>
                    <icon-settings :size="16" @click="openSetting(true)" />
                  </template>
                </a-button>
              </a-tooltip>
            </template>
            <template #dropdown>
              <div class="u-card orchisky-vxe__setting">
                <div class="u-card__hd" style="height: auto; padding: 4px 12px; line-height: 28px">
                  <span style="font-size: 14px">设置</span>
                  <a-tooltip content="重置" mini>
                    <a-button size="small" class="arco-btn-light" style="border: 0" :loading="setting.loading" @click="defSetting()">
                      <template #icon> <icon-refresh /> </template>
                    </a-button>
                  </a-tooltip>
                </div>
                <div class="u-card__floor" style="padding: 0px">
                  <div class="orchisky-vxe__draggable">
                    <draggable
                      :list="setting.columns"
                      style="user-select: none"
                      class="orchisky-vxe__draggable-list"
                      group="toolsGroup"
                      animation="300"
                      drag-class="orchisky-vxe__draggable-drag"
                      ghost-class="orchisky-vxe__draggable-ghost"
                      chosen-class="orchisky-vxe__draggable-chosen"
                      item-key="id"
                      handle=".orchisky-vxe__draggable-moving"
                    >
                      <template #item="{ element }">
                        <div class="orchisky-vxe__draggable-item">
                          <template v-if="element.title">
                            <div class="u-flex">
                              <icon-drag-dot-vertical class="orchisky-vxe__draggable-moving" />
                              <a-checkbox v-model="element.show" />
                              <label class="u-flex__item u-clamp" :title="element.title">
                                <span style="padding: 0 0.75em">{{ element.title }}</span>
                              </label>
                              <a-input-number v-model="element.width" size="mini" style="width: 50px"></a-input-number>
                            </div>
                          </template>
                          <template v-else>
                            <div class="orchisky-vxe__draggable-moving"> <a-divider :margin="6" type="dashed"></a-divider></div>
                          </template>
                        </div>
                      </template>
                    </draggable>
                  </div>
                </div>
                <div class="u-card__floor u-flex" style="padding: 6px 12px">
                  <vxe-button size="mini" class="u-flex__item" type="text" status="info" @click="clearSetting()">取消</vxe-button>
                  <vxe-button size="mini" class="u-flex__item" type="text" status="primary" @click="confirmSetting()">确认</vxe-button>
                </div>
              </div>
            </template>
          </vxe-pulldown>
        </a-space>
      </template>
    </vxe-toolbar>
    <vxe-table
      :ref="props.option.ref"
      :data="tableData"
      :height="props.height"
      :stripe="stripe"
      :keep-source="false"
      :edit-config="{ trigger: 'click', mode: 'row', showIcon: false, autoClear: false, showStatus: false }"
      :column-config="{ isCurrent: false, resizable: true }"
      :row-config="{ isHover: true, isCurrent: false, keyField: props.option.rowKey }"
      :show-overflow="props.option.tooltip || 'tooltip'"
      :show-header-overflow="props.option.tooltip || 'tooltip'"
      :size="props.size"
      :loading="loading"
      :radio-config="disabledList"
      :checkbox-config="{ ...disabledList, checkField: props.option.checkKey }"
      :header-cell-style="props.option.headerStyle"
      :show-footer="isFunction(props.option.footerMethod)"
      :footer-method="props.option.footerMethod"
      :footer-cell-style="props.option.footerStyle"
      :merge-footer-items="props.option.mergeFooter"
      :filter-config="props.option.filterConfig"
      :edit-rules="props.option.rules"
      :scroll-y="props.option.scrollY"
      :scroll-x="props.option.scrollX"
      @checkbox-change="selectChangeEvent"
      @checkbox-all="selectChangeEvent"
      @radio-change="radioChangeEvent"
      @resizable-change="settingColumnWidth"
      @cell-click="onCellClick"
    >
      <!-- selectedKeys -->
      <vxe-column v-if="['checkbox'].includes(props.option.selectedType ?? '')" type="checkbox" width="30" fixed="left" />
      <vxe-column v-else-if="['radio'].includes(props.option.selectedType ?? '')" type="radio" width="30" fixed="left" />
      <!-- column -->
      <template v-for="(item, index) in computedColumns.filter((a) => a.show)" :key="index">
        <vxe-column
          v-if="['index'].includes(item.dataIndex)"
          type="seq"
          :field="item.dataIndex"
          :width="item.width"
          :title="item.title"
          :sortable="item.sort"
          :header-align="item.headerAlign"
          :footer-align="item.footerAlign"
          :align="item.align"
          :show-header-overflow="item.tooltip"
          :show-overflow="item.tooltip"
          :fixed="item.fixed"
          :title-prefix="item.help"
          :filters="item.filters"
          :filter-multiple="item.filterMultiple"
          :filter-method="item.filterMethod"
        >
        </vxe-column>
        <vxe-column
          v-else
          :field="item.dataIndex"
          :width="item.width"
          :title="item.title"
          :sortable="item.sort"
          :header-align="item.headerAlign"
          :footer-align="item.footerAlign"
          :align="item.align"
          :show-header-overflow="item.tooltip"
          :show-overflow="item.tooltip"
          :fixed="item.fixed"
          :title-prefix="item.help"
          :filters="item.filters"
          :filter-multiple="item.filterMultiple"
          :filter-method="item.filterMethod"
          :edit-render="{ enabled: Boolean(item.cell), placeholder: item.placeholder }"
        >
          <!-- slot = edit  -->
          <template v-if="item.cell" #edit="{ row: record, rowIndex, columnIndex }">
            <slot
              name="cell"
              :record="record"
              :data-index="item.dataIndex"
              :row-index="rowIndex"
              :column-index="columnIndex"
              :value="record[item.dataIndex]"
              :update-value="setValue(record, item.dataIndex)"
              :format-value="setFormat(record, item)"
            >
              <template v-if="isVNode(item.cell)">
                <component :is="item.cell" :record="record" />
              </template>
              <span v-else :style="setStyle(record, item)"> {{ setFormat(record, item) }} </span>
            </slot>
          </template>
          <!-- slot = default  -->
          <template v-if="item.cell && item.div" #default="{ row: record, rowIndex, columnIndex }">
            <slot
              name="cell"
              :record="record"
              :data-index="item.dataIndex"
              :row-index="rowIndex"
              :column-index="columnIndex"
              :value="record[item.dataIndex]"
              :update-value="setValue(record, item.dataIndex)"
              :format-value="setFormat(record, item)"
            >
              <template v-if="isVNode(item.cell)">
                <component :is="item.cell" :record="record" />
              </template>
              <span v-else :style="setStyle(record, item)"> {{ setFormat(record, item) }} </span>
            </slot>
          </template>
          <template v-else #default="{ row: record, rowIndex: rowIndex }">
            <!-- 跳过可以编辑单元格的对比 -->
            <template v-if="props.option.skinRow && !item.cell">
              <span v-if="rowIndex > 0 && isSkinRow(tableData, rowIndex, item.dataIndex) && item.width" class="not-light-text">
                {{ props.option.skinRowText }}
              </span>
              <span v-else :style="setSkinRowStyle(tableData, rowIndex, item.dataIndex)">
                {{ setFormat(record, item) }}
              </span>
            </template>
            <span v-else :style="setStyle(record, item)"> {{ setFormat(record, item) }} </span>
          </template>
        </vxe-column>
      </template>

      <template #empty> <a-empty /> </template>
      <template #loading> <a-spin /> </template>
    </vxe-table>
    <div v-if="isServer && !props.hidePagination" class="orchisky-vxe__pagination">
      <div class="u-flex u-flex--start">
        <div class="u-flex__item"> <slot name="footer"></slot></div>
        <div style="width: 500px">
          <a-space fill direction="vertical" align="end">
            <a-pagination
              :current="page.page"
              :default-page-size="page.size"
              :total="total"
              :auto-adjust="false"
              :size="props.size"
              show-total
              show-page-size
              :page-size-options="pageSizeOptions"
              @page-size-change="onPageSizeChange"
              @change="onPageChange"
            >
              <template #total>
                <template v-if="selectedKeys.length"> 选 {{ selectedKeys.length }} </template>
                共 {{ total }} 条
              </template>
            </a-pagination>
          </a-space>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed, isVNode, ref, shallowRef, PropType, watch } from 'vue';
  import draggable from 'vuedraggable';
  import { useErrData } from '@/hooks/request';
  import { setFormat, setStyle, useStaticTableConfig, isFunction } from './util';
  import type { RecordAny, TableColumnType, TableOptionType } from './table.d';
  import useOption from './option';

  const props = defineProps({
    title: String,
    /** auto(铺满父容器,必须确保存在父节点且不允许存在相邻元素 ,), %, px */
    height: [Number, String],
    /** 隐藏工具栏  */
    hideToolbar: Boolean,
    hidePagination: Boolean,
    size: {
      type: String as PropType<'medium' | 'small' | 'mini'>,
      default: 'mini',
    },
    /** 用户选择列表 */
    selectedKeys: { type: Array, default: () => [] },
    /** 与 loadData 行为一致  */
    data: { type: Array, default: () => [] },
    /** 配置文件  */
    option: {
      type: Object as PropType<TableOptionType>,
      default: () => ({ columns: [] }),
    },
    /** 用户保存数据钩子函数 */
    hook: Object as PropType<{
      getColumn: () => Promise<[boolean, RecordAny[]]>;
      setColumn: (list: RecordAny[]) => void;
    }>,
  });

  const emits = defineEmits(['update:selectedKeys', 'cellClick', 'onReset', 'change', 'confirm']);
  function setValue(record, key: string) {
    return (value: any) => {
      if (typeof value === 'object') {
        // console.log(value);
        Object.keys(value).forEach((k) => {
          record[k] = value[k];
        });
      } else record[key] = value;
    };
  }
  const defaultPageSize = computed<number>(() => props.option?.pageSize ?? 50);
  const pageSizeOptions = computed<number[]>(() => props.option?.pageSizeOptions ?? [10, 20, 50, 100, 200]);
  const page = ref<{ page: number; size: number }>({ page: 1, size: defaultPageSize.value });

  const { disabledList, selectChangeEvent, radioChangeEvent } = useStaticTableConfig(props, emits);

  const { $grid, $gridTwo } = useOption(props.option);
  function onCellClick(record: RecordAny) {
    // { row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, $event }
    // $grid.value.setEditRow(record.row);
    emits('cellClick', record);
  }

  function isSkinRow(tableData: RecordAny[], rowIndex: number, dataIndex: string) {
    const item = tableData[rowIndex] ?? {};
    const prev = tableData[rowIndex - 1] ?? {};
    /** skip empty rows */
    if (!['string', 'number'].includes(typeof item[dataIndex])) return false;
    if (props.option.skinRow && typeof props.option.skinRow === 'string') {
      return item[props.option.skinRow] === prev[props.option.skinRow] && item[dataIndex] === prev[dataIndex];
    }
    return item[dataIndex] === prev[dataIndex];
  }
  function setSkinRowStyle(tableData: RecordAny[], rowIndex: number, dataIndex: string) {
    let st: any = {};
    try {
      st =
        rowIndex > 0 &&
        !isSkinRow(tableData, rowIndex, dataIndex) &&
        props.option.skinRow &&
        tableData[rowIndex][String(props.option.skinRow)] === tableData[rowIndex - 1][String(props.option.skinRow)]
          ? props.option.skinRowStyle
          : {};
    } catch (error) {
      //
    }
    return st;
  }
  // computed
  const userColumns = ref<RecordAny[]>([]);
  function getStaticColumn() {
    const list = [...props.option.columns] as any[];
    const columns = props.option.resolveColumns && isFunction(props.option.resolveColumns) ? props.option.resolveColumns(list) : list;
    const staticColumn = Object.assign([], columns)
      .filter((o) => Boolean(o))
      .map((item: any) => {
        item.show = item.show ?? true; // 默认都显示
        if (item.tooltip) item.ellipsis = true;
        return item;
      });
    return staticColumn as TableColumnType[];
  }
  const computedColumns = computed(() => {
    const staticColumn = getStaticColumn();
    const userColumn = Object.assign([], userColumns.value) as { dataIndex: string }[];
    // dataIndex 排序
    const titles = [
      ...new Set(
        [...userColumn]
          .map((f) => f.dataIndex)
          .filter((f) => staticColumn.find((c) => c.dataIndex === f))
          .concat([...staticColumn].map((f) => f.dataIndex))
          .filter((b) => !!b)
      ),
    ];
    return titles.map((dataIndex) => {
      const staticItem = staticColumn.find((item) => item.dataIndex === dataIndex);
      const userItem = userColumn.find((item) => item.dataIndex === dataIndex) ?? Object.create({});
      return { ...staticItem, ...userItem };
    }) as TableColumnType[];
  });

  /** 计算分页信息 */
  const computedPage = computed(() => {
    return props.option.resolvePage && isFunction(props.option.resolvePage) ? props.option.resolvePage(page.value) : props.option.resolvePage;
  });
  const isServer = computed(() => Boolean(props.option.url));

  const loading = ref(false);
  const stripe = ref(false);
  const total = ref(0);

  /** 未修改之前的数据 */
  const tableData = shallowRef((props.data ?? []) as RecordAny[]);

  function networkService() {
    let pageParam: RecordAny = Object.create({});
    if (!computedPage.value) {
      pageParam = {};
    } else if (isFunction(props.option.resolvePage)) {
      pageParam = { ...computedPage.value };
    } else {
      pageParam = { page: page.value };
    }
    const params = {
      [String(props.option.method).toUpperCase() === 'GET' ? 'params' : 'data']: { ...pageParam, ...props.option.data },
    };
    const option: RecordAny = { url: props.option.url, method: props.option.method, ...params };
    if (props.option.timeout) option.timeout = props.option.timeout;
    return useErrData<RecordAny>(option);
  }

  // page
  const selectedKeys = computed({
    get: () => {
      return props.selectedKeys as string[];
    },
    set: (val: string[]) => {
      emits('update:selectedKeys', val);
    },
  });
  function setLoading(val = true) {
    loading.value = val;
  }
  const dataInit = async () => {
    if (isServer.value) {
      setLoading(true);
      const [err, data] = await networkService();
      setLoading(false);
      if (!err) {
        const list =
          props.option.resolveData && isFunction(props.option.resolveData)
            ? props.option.resolveData(data, { ...page.value })
            : (data?.rows as RecordAny[]) ?? (data as RecordAny[]) ?? [];
        if (Object.prototype.toString.call(list).slice(8, -1) !== 'Array') throw new Error('[orchisky-vxe] :Not in Array format data ');
        tableData.value = list as RecordAny[];
        total.value = props.option.resolveTotal && isFunction(props.option.resolveTotal) ? props.option.resolveTotal(data) : (data?.total as number) ?? 0;
        if (isFunction(props.option.success)) props.option.success?.(data);
      } else if (isFunction(props.option.error)) props.option.error?.(data);
    }
  };
  async function onUserReset() {
    if (!loading.value) {
      emits('onReset');
      await dataInit();
    }
  }

  /** 跳转到第 current 页 */
  function onPageChange(current?: number, isClear = false) {
    if (current) page.value.page = current;
    if (!props.option.reserve || isClear) {
      selectedKeys.value = [];
      $gridTwo.clearSelection();
    }
    dataInit();
  }
  async function onPageSizeChange(num: number) {
    page.value.size = num;
    onPageChange(1, true);
  }

  // user setting
  const settingRef = ref(Object.create({}));
  const setting = ref({
    loading: false,
    columns: [] as any[],
    tempWidth: Object.create({}) as Record<string, number>,
  });
  async function getHookUseColumn() {
    if (typeof props.hook?.getColumn === 'function') {
      const [err, list] = await props.hook.getColumn();
      if (!err && list) userColumns.value = list;
    }
  }
  getHookUseColumn();
  const openSetting = (isToggle = false) => {
    if (!settingRef.value) return;
    // console.log(isToggle)
    if (isToggle) settingRef.value.togglePanel();
    else settingRef.value.showPanel();
    setting.value.columns = Object.assign([] as any[], [...computedColumns.value]).map((item) => {
      const width = setting.value.tempWidth[item.dataIndex];
      if (width) item.width = width;
      return item;
    });
  };

  const clearSetting = () => {
    if (!settingRef.value) return;
    settingRef.value.hidePanel();
  };
  function defSetting() {
    setting.value.loading = true;
    userColumns.value = [];
    setting.value.tempWidth = Object.create({});
    setting.value.columns = getStaticColumn();
    openSetting();
    setTimeout(() => {
      setting.value.loading = false;
    }, 500);
  }
  function settingColumnWidth(e: any) {
    let dataIndex = e.column.property;
    if (!dataIndex && e.column.type === 'seq') dataIndex = 'index';
    if (dataIndex && e.column.resizeWidth > 0) {
      setting.value.tempWidth[dataIndex] = e.column.resizeWidth;
      clearSetting();
    }
  }
  const confirmSetting = () => {
    if (!settingRef.value) return;
    userColumns.value = setting.value.columns as any;
    emits('confirm', computedColumns.value);
    if (typeof props.hook?.setColumn === 'function') {
      props.hook.setColumn(computedColumns.value);
    }
    setting.value.tempWidth = Object.create({});
    clearSetting();
  };

  /** run */
  if (props.option.firstLoad !== false) dataInit();

  watch(
    () => props.option.firstLoad,
    (v) => {
      if (v === true) dataInit();
    }
  );

  // expose
  defineExpose({
    loading,
    setLoading,
    /** 执行搜索 ,是否返回第一页 */
    dataInit(isFirst?: boolean) {
      if (isFirst !== false) page.value.page = 1;
      selectedKeys.value = [];
      $gridTwo.clearSelection();
      return dataInit();
    },
    /** 加载数据 */
    loadData(list: any[]) {
      if ($grid.value) {
        $grid.value.reloadData(list);
        tableData.value = list;
      }
    },
    ...$gridTwo,
  });
</script>

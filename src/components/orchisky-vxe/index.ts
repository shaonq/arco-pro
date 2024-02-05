import { ref } from 'vue';
import XEUtils from 'xe-utils';
// import type { TablePublicMethods, VxeTableDataRow } from 'vxe-table';
import OrchiskyVxe from './table.vue';
import useOption from './option';

import type { RecordAny, TableOptionType, TableExposeType } from './table.d';
import './style.less';

/** 行数据格式化 千分位|日期   */
export const formatTable = {
  /** 千分位|保留小数 */
  tf: (val: any, digits?: any) => {
    // 只处理数字
    if (typeof val !== 'number') return val;
    // 默认读取小数位
    if (typeof digits !== 'number') {
      const decimal = String(val).split('.');
      if (decimal.length === 2) digits = decimal[1].length;
    }
    return XEUtils.commafy(val, { digits });
  },
  /** 快捷格式化日期 */
  t: (val: any) => {
    return XEUtils.toDateString(val, 'yyyy-MM-dd');
  },
  /** 完整格式化日期  yyyy-MM-dd HH:mm:ss */
  time: (val: any, f = 'yyyy-MM-dd HH:mm:ss') => {
    return XEUtils.toDateString(val, f);
  },
  /** percent 格式化百分比 */
  p: (val: any, digits?: any, percent = '%'): string => {
    // 只处理数字
    if (typeof val !== 'number') return val;
    // 默认保留2位小数位
    if (typeof digits !== 'number') digits = 2;
    // 百分比数据放大 100 倍
    return (val * 100).toFixed(digits) + percent;
  },
};

// export type GridRef = RecordAny & TablePublicMethods;

export const useOrchiskyVxe = (option: TableOptionType) => {
  // 快捷初始化表格
  const tableRef = ref<TableExposeType>(Object.create({}));
  const selectedKeys = ref<string[]>([]);
  const { tableOption, $grid, $gridTwo } = useOption(option);
  const tableUtil = {
    rowKey: $gridTwo.getRowKey(), // 兼容写法
    addKey(rowIndex: number) {
      const tableData = $gridTwo.getTableData();
      const row = tableData[rowIndex];
      if (row.disabled) return;
      if ($grid.value) {
        const rowKey = $gridTwo.getRowKey();
        if (tableOption.selectedType === 'checkbox') {
          // 辅助多选
          const $table = $grid.value;
          const { fullData } = $table.getTableData();
          if (option.checkboxKey) {
            const checkboxKey = option.checkboxKey as string;
            const list = fullData.filter((a) => a[checkboxKey] && a[checkboxKey] === row[checkboxKey]);
            if (list.length) $table.setCheckboxRow(list, true);
          } else {
            $grid.value.setCheckboxRow(row, true);
          }
          if (rowKey) selectedKeys.value = ($grid.value.getCheckboxRecords() ?? []).map((a: RecordAny) => a[rowKey]);
        }
        if (tableOption.selectedType === 'radio') {
          $grid.value.setRadioRow(row);
          if ($grid.value.getRadioRecord() && rowKey) selectedKeys.value = [$grid.value.getRadioRecord()].map((a: any) => a[rowKey]);
        }
      }
    },
    setTableData(list: RecordAny[]) {
      if ($grid.value) {
        $grid.value.reloadData(list);
      }
    },
    setTableRow(rowIndex: number, dataIndex: string | RecordAny, value?: any) {
      if ($grid.value) {
        const tableData = $gridTwo.getTableData();
        if (typeof dataIndex === 'string') {
          tableData[rowIndex][dataIndex] = value;
        } else {
          Object.keys({ ...dataIndex }).forEach((key) => {
            tableData[rowIndex][key] = dataIndex[key];
          });
        }
        tableUtil.addKey(rowIndex);
        if (typeof option.footerMethod === 'function') $grid.value.updateFooter();
      }
    },
  };

  return {
    tableRef,
    tableOptions: tableOption,
    tableUtils: {
      ...tableUtil,
      ...$gridTwo,
    },
    $grid,
    selectedKeys,
  };
};

export default OrchiskyVxe;

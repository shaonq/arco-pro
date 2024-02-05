import { ref } from 'vue';
import { TablePublicMethods } from 'vxe-table';
import type { RecordAny, TableOptionType, TableGridTwoType } from './table.d';
import { getRowKey } from './util';

const $grid = ref<TablePublicMethods & RecordAny>(Object.create({}));
/**
 * 基于 VxeTable $grid 二次封装
 */
export default function useOption(option: TableOptionType) {
  const tableOption = {
    ...option,
    // set $ref
    ref: (el: any) => {
      if (el) $grid.value = el as TablePublicMethods;
    },
  };
  const $gridTwo: TableGridTwoType = {
    getRowKey() {
      return getRowKey(option);
    },
    getRowIndex(row) {
      return $grid.value.getRowIndex(row);
    },
    getRowSeq(row) {
      return $grid.value.getRowSeq(row);
    },
    getTableData() {
      if ($grid.value) {
        return $grid.value?.getTableData().fullData ?? [];
      }
      return [];
    },
    getSelection() {
      if ($grid.value) {
        if (tableOption.selectedType === 'checkbox') return $grid.value.getCheckboxRecords();
        if (tableOption.selectedType === 'radio') return [$grid.value.getRadioRecord() as any];
        return [];
      }
      return [];
    },
    getReserveSelection() {
      if ($grid.value) {
        if (tableOption.selectedType === 'checkbox') {
          const list = $grid.value.getCheckboxRecords();
          // 是否开启跨分页选择
          if (option.reserve) return list.concat($grid.value.getCheckboxReserveRecords());
          return list;
        }
        if (tableOption.selectedType === 'radio') {
          let item = $grid.value.getRadioRecord();
          if (option.reserve && !item) item = $grid.value.getRadioReserveRecord();
          return item ? [item] : [];
        }
        return [];
      }
      return [];
    },
    getCheckboxKeySelection(checkboxKeys) {
      const checkboxKey = option.checkboxKey as string;
      if (!checkboxKeys) checkboxKeys = (this.getSelection() as RecordAny[]).map((a) => a[checkboxKey]);
      const list = (this.getTableData() as RecordAny[]).filter((a) => checkboxKeys && checkboxKeys.includes(a[checkboxKey]));
      return list;
    },
    clearSelection() {
      if ($grid.value) {
        if (tableOption.selectedType === 'checkbox') {
          if (option.reserve) $grid.value.clearCheckboxReserve();
          $grid.value.clearCheckboxRow();
        }
        if (tableOption.selectedType === 'radio') {
          if (option.reserve) $grid.value.clearRadioReserve();
          $grid.value.clearRadioRow();
        }
      }
    },
    insertRow(record: RecordAny, row?: RecordAny | number, isNext = true) {
      const towKey = this.getRowKey();
      if (row && typeof row === 'object' && isNext) {
        const rowIndex: number = $grid.value.getRowIndex(row);
        if (rowIndex >= 0) row = this.getTableData()[rowIndex + 1] ?? -1;
      }
      if (record[towKey]) delete record[towKey];
      const rowN = $grid.value.insertAt(record, row);
      // $grid.value.reloadData(this.getTableData());
      return rowN;
    },
    removeRows() {
      if ($grid.value) {
        if (tableOption.selectedType === 'checkbox') $grid.value.removeCheckboxRow();
        if (tableOption.selectedType === 'radio') $grid.value.removeRadioRow();
      }
    },
    removerRowIndex(rowIndex: number) {
      if ($grid.value) {
        const list = this.getTableData();
        list.splice(rowIndex, 1);
        $grid.value.reloadData(list);
      }
    },
    async checkRows(list = undefined) {
      list = list ?? this.getSelection();
      let err = '';
      const errMap = await $grid.value.validate(list);
      if (errMap)
        Object.values(errMap as Record<string, RecordAny[]>).forEach((errList) => {
          errList.forEach(({ rowIndex, column, rules }) => {
            rules.forEach((rule: RecordAny) => {
              err = `序号${rowIndex + 1} ${column.title} ${rule.message}`;
            });
          });
        });
      return [err, list];
    },
  };

  return {
    tableOption,
    $grid,
    $gridTwo,
  };
}

import { ref } from 'vue';
import { VxeTableEvents, VxeTablePropTypes } from 'vxe-table';
import { RecordAny, TableOptionType, TableColumnType } from './table.d';

export const isFunction = <T>(obj: T): boolean => obj && typeof obj === 'function';

// cell format
export function setFormat(record: RecordAny, item: TableColumnType) {
  const val = record[item.dataIndex] ?? '';
  return item.format && isFunction(item.format) ? item.format(val, record) : val;
}
export function setStyle(record: RecordAny, item: RecordAny) {
  return isFunction(item.style) ? item.style(record) : { ...item.style };
}

export function getRowKey(option: any) {
  return option?.rowKey || '_X_ROW_KEY';
}
// static config
export function useStaticTableConfig(props: { option: TableOptionType }, emits: any) {
  // default editable rows
  // const maxEditLen = 1;
  // const editRowIndexList = reactive<number[]>([...Array(maxEditLen)].map((_, i) => i));
  // function addEditRowIndexList(record: RecordAny) {
  //   if (!editRowIndexList.includes(record.rowIndex)) {
  //     if (editRowIndexList.length >= maxEditLen) editRowIndexList.shift();
  //     editRowIndexList.push(record.rowIndex);
  //   }
  // }

  // disabled rows
  const disabledList = ref<VxeTablePropTypes.CheckboxConfig<RecordAny>>({
    highlight: true,
    reserve: props.option.reserve, // 是否保留勾选状态
    checkMethod: ({ row }) => !row.disabled,
  });
  // checkbox selected
  const selectChangeEvent: VxeTableEvents.CheckboxChange<RecordAny> = ({ $table, checked, row }) => {
    // get this list OR other list
    // 辅助多选
    const { option } = props;
    const { fullData } = $table.getTableData();
    if (row && option.checkboxKey) {
      const checkboxKey = option.checkboxKey as string;
      const list = fullData.filter((a) => a[checkboxKey] && a[checkboxKey] === row[checkboxKey]);
      if (list.length) $table.setCheckboxRow(list, checked);
    }

    const records = $table.getCheckboxRecords().concat($table.getCheckboxReserveRecords());
    const rowKey = getRowKey(props.option);
    if (rowKey)
      emits(
        'update:selectedKeys',
        records.map((a) => {
          return a[rowKey as string];
        })
      );
  };
  const radioChangeEvent: VxeTableEvents.RadioChange<RecordAny> = ({ row }) => {
    const records = [row];
    const rowKey = getRowKey(props.option);
    if (rowKey)
      emits(
        'update:selectedKeys',
        records.map((a) => a[rowKey as string])
      );
  };
  return { disabledList, selectChangeEvent, radioChangeEvent };
}

export default null;

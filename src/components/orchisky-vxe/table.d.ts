import { VxeColumnPropTypes } from 'vxe-table';

// TableEditMethods 编辑方法

export type RecordAny = Record<string, any>;
// type CssType = Partial<CSSStyleDeclaration>;

interface CssType extends Partial<CSSStyleDeclaration>, RecordAny {}

// column type
export interface TableColumnType extends RecordAny {
  show?: boolean;
  dataIndex: string;
  title?: string;
  width?: number;
  sort?: boolean;
  /** 开启编辑 */
  cell?: boolean;
  /** 影响性能 cell = true 有效 只显示编辑内容 */
  div?: boolean;
  /** 没内容时候得提示 */
  placeholder?: string;

  tooltip?: boolean;
  ellipsis?: boolean;
  align?: VxeColumnPropTypes.Align;
  headerAlign?: VxeColumnPropTypes.HeaderAlign;
  footerAlign?: VxeColumnPropTypes.FooterAlign;
  format?: (val: any, record?: RecordAny) => string;
  style?: CssType | ((record: RecordAny) => CssType);
  /** 同 :title-prefix "{ content: '必填', icon: 'vxe-cell--required-icon' }" */
  help?: VxeColumnPropTypes.TitlePrefix;
  filters?: VxeColumnPropTypes.Filter[];
  filterMultiple?: VxeColumnPropTypes.FilterMultiple;
  filterMethod?: VxeColumnPropTypes.FilterMethod;
}

// option type
export interface TableOptionType extends RecordAny {
  /** 请求地址 */
  url?: string;
  /** 请求类型 */
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  /** 是否保留多选状态 */
  reserve?: boolean;
  /** 原 checkbox-config.checkField 在行中存储 bool 值,不存在则无效 */
  checkKey?: string;
  /** 行主键[自动生成] */
  rowKey?: string;
  /** 多选时 同kay选择 */
  checkboxKey?: string;
  /** 自定义列  同 resolveColumns() */
  columns: TableColumnType[];
  /** 默认分页条数 */
  pageSize?: number;
  /** 默认分页列表 */
  pageSizeOptions?: number[];
  /** 开启行选中 */
  selectedType?: 'checkbox' | 'radio';
  /** 行必填数据 指定 [dataIndex] */
  requiredKeys?: string[];
  /** 表单组件第一次自动请求接口 */
  firstLoad?: boolean;
  /** 原来 show-overflow  ellipsis（只显示省略号）, title（并且显示为原生 title）, tooltip（并且显示为 tooltip 提示） */
  tooltip?: ('ellipsis' | 'title' | 'tooltip') | boolean;
  /** 给表头单元添加 style : ({ column, columnIndex })=> {} , dataIndex as column.property  */
  headerStyle?: (record: RecordAny & { column: { property: string } & RecordAny }) => CssType;
  /** 给表尾单元添加 style : any | (({ $rowIndex, column, columnIndex, $columnIndex }) => any) */
  footerStyle?: (record: RecordAny & { column: { property: string } & RecordAny }) => CssType;
  /** 表尾的数据获取方法，返回一个二维数组  (columns, data) => string[][] */
  footerMethod?: VxeTablePropTypes.FooterMethod;
  /** 同 merge-footer-items 临时合并表尾 (不能用于展开行，不建议用于固定列、树形结构) */
  mergeFooter?: VxeTablePropTypes.mergeFooter;
  /** 自定义列  同 columns */
  resolveColumns?: (columns?: TableColumnType[]) => TableColumnType[];
  /** 请求超时时间 */
  timeout?: number;
  /** 静态参数 */
  data?: RecordAny;
  /** 自定义分页 */
  resolvePage?: (page?: RecordAny) => any;
  /** 自定义数据 */
  resolveData?: (data: RecordAny, page?: RecordAny) => RecordAny[];
  /** 数据请求成功 */
  success?: (data?: any) => void;
  /** 数据请求失败 */
  error?: (data?: any) => void;
  /** 开启重复行省略 group by  */
  skinRow?: string;
  /** 非重复行且未被跳过的样式 */
  skinRowStyle?: CssType;
  /** 重复行显示内容 */
  skinRowText?: string;
  /** 同 edit-rules , demo :  {  sex: [ { required: true, message: '性别必须填写' } ] } */
  rules?: VxeTablePropTypes.EditRules;
  /** 数据筛选 {remote:服务器筛选 ,filterMethod :({ options, values, cellValue, row, column }) => boolean } */
  filterConfig?: VxeTablePropTypes.FilterConfig;
  /** 横向虚拟滚动配置  { enabled, gt }  */
  scrollX?: VxeTablePropTypes.ScrollX;
  /** 纵向虚拟滚动配置  { enabled, gt }  */
  scrollY?: VxeTablePropTypes.ScrollY;
}

export interface TableGridTwoType extends RecordAny {
  /** 读取配置的rowKey 默认 _X_ROW_KEY  */
  getRowKey(): string;
  /** 读取当前页数据 */
  getTableData(): RecordAny[];
  /** 读取选中行 */
  getSelection(): RecordAny[];
  /** 不支持夸行选择，可读取rowKey重复的数据 */
  getCheckboxKeySelection(keys?: string[]): RecordAny[];
  /** option.reserve = true  读取所有跨页选中数据 */
  getReserveSelection(): RecordAny[];
  /** 清空选中行 */
  clearSelection(): void;
  /** 原insertAt 往表格插入临时数据，从指定位置插入一行或多行；第二个参数：row 指定( isNext +1 )位置、null从第一行插入、-1 从最后插入  */
  insertRow(record: RecordAny, row?: RecordAny | number, isNext?: boolean): Promise<{ row; rows }>;
  /** 删除复选框选中的行数据 */
  removeRows(): void;
  /**
   * 选中行数据校验
   * @param list  默认 所有选择的数据
   */
  checkRows(list?: RecordAny[]): Promise<[string, RecordAny[]]>;
  /**
   * 根据 row 获取行的序号
   * @param row 行对象
   */
  getRowSeq(row: any): string | number;
  /**
   * 根据 row 获取相对于 data 中的索引
   * @param row 行对象
   */
  getRowIndex(row: any): number;
  /**
   * 删除RowIndex这一行
   */
  removerRowIndex(rowIndex: number): void;
}
export interface TableExposeType extends TableGridTwoType {
  loading: boolean;
  setLoading: (loading?: boolean) => void;
  /** 请求数据 */
  dataInit: () => Promise<void>;
  /** 重置表单数据 */
  loadData: (list: RecordAny[]) => void;
}

export default null;

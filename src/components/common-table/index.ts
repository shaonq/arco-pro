import e from './list-demo.vue';

export type CommonTableType = {
  title?: string; // 1
  name: string;
  url: string;
  method?: string;
  postData?: Record<string, any>; //  传入数据
  data?: Record<string, any>;
  children?: CommonTableType;
};

export type CommonTableColumnsType = {
  name: string; // key
  label: string; // 名称
  isShow?: boolean; // 是否显示
};

export default e;

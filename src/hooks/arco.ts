import { Message, Modal, Notification } from '@arco-design/web-vue';
import type { ValidatedError } from '@arco-design/web-vue/es/form/interface';
import type { SelectOptionData } from '@arco-design/web-vue/es/select/interface';
import type { TreeNodeData } from '@arco-design/web-vue/es/tree/interface';

/**
 * 删除确认
 */
export function deleteConfirmation(callback: () => void, options?: Record<string, any>) {
  Modal.warning({
    title: '删除提示',
    simple: false,
    width: 360,
    titleAlign: 'start',
    content: '是否要删除当前数据,此操作不可撤销 ?',
    hideCancel: false,
    ...(options ?? {
      okButtonProps: { status: 'danger' },
      okText: '删除',
    }),
    async onOk() {
      if (callback) callback();
    },
  });
}

export type FormRef = {
  validate: (errors: any) => void;
  validateField: (field: any, callback: any) => void;
  resetFields: (field?: any) => void;
  clearValidate: (field?: any) => void;
  setFields: (field: any) => void;
};

export { Notification, Modal, Message, ValidatedError, SelectOptionData, TreeNodeData };
export default null;

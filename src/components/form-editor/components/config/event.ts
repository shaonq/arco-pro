import { provide, inject } from 'vue';

const eventName = 'onToolbarClick';

export const eventList: Record<string, unknown>[] = [
  { type: 'add', name: '新增', show: true },
  { type: 'delete', name: '删除', show: true },
  { type: 'save', name: '保存', show: true },
  { type: 'print', name: '打印', show: true },
  { type: 'quit', name: '退出', show: true },
];

export function useProvide(emit?: any) {
  if (typeof emit !== 'function') return;
  provide(eventName, (type: string, message?: unknown) => {
    emit(eventName, type, message);
  });
}

export function useInject() {
  const onToolbarClick = inject(eventName);
  return { onToolbarClick };
}

export default null;

<template>
  <a-card :body-style="{ padding: '5px' }" :aria-disabled="prop.disabled">
    <a-space :size="size">
      <a-button v-for="(item, idx) in btnList" :key="idx" type="primary" :size="size" @click="(ev) => onToolbarClick(item.type, ev)">
        {{ item.name }}
      </a-button>
      <a-button :size="size" @click="() => setVisible(true)"> <icon-plus /> </a-button>
    </a-space>
    <a-modal v-model:visible="visible" title="添加按钮">
      <a-table :data="defList" :pagination="false" size="small" @row-click="onRowClick">
        <template #columns>
          <a-table-column title="事件" data-index="type"></a-table-column>
          <a-table-column title="名称" data-index="name"></a-table-column>
        </template>
      </a-table>
    </a-modal>
  </a-card>
</template>

<script lang="ts" setup>
  import { computed, ref } from 'vue';
  import { deepClone } from '@/utils';
  import useVisible from '@/hooks/visible';
  import useVFormStore from '../store/index';
  import { useInject, eventList } from '../config/event';

  const { onToolbarClick } = useInject();
  const formStore = useVFormStore();
  const { visible, setVisible } = useVisible();
  const size = computed(() => formStore.formConfig.size);

  const defList = deepClone(eventList).filter((i) => i.show);
  const btnList = ref(defList);

  const prop = defineProps({
    field: Object,
    disabled: Boolean,
  });

  const onRowClick = (ev: Record<string, unknown>) => {
    btnList.value.push(ev);
    setVisible(false);
  };
</script>

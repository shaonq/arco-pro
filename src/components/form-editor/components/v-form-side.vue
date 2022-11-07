<template>
  <div class="fe-side">
    <a-tabs default-active-key="1">
      <a-tab-pane key="1">
        <template #title>控件</template>
        <div class="fe-side__pr">
          <!-- 读取定义的控件 -->
          <template v-for="({ title, list }, index) in FormSidePanelOptions" :key="index">
            <a-typography-text class="fe-side__title">{{ title }}</a-typography-text>
            <div>
              <draggable
                :group="{ name: 'toolsGroup', pull: 'clone', put: false, animation: 300 }"
                :list="list"
                class="fe-side__ul"
                ghost-class="ghost"
                chosen-class="chosen"
                :clone="formStore.onSideFieldClone"
                item-key="id"
                :sort="false"
                :move="() => true"
              >
                <template #item="{ element }">
                  <div class="fe-side__li">
                    <div style="padding-left: 12px" :title="element.icon">
                      <div class="fe-side__item" @dblclick="formStore.onSideFieldDBclick(element)">
                        <FormFont :type="element.icon" />
                        {{ element.label }}
                      </div>
                    </div>
                  </div>
                </template>
              </draggable>
            </div>
          </template>
        </div>
      </a-tab-pane>
      <a-tab-pane key="2">
        <template #title>结构</template>
        <div class="fe-side__pl fe-fe-side__pr">
          <a-tree :selected-keys="[formStore.selectedPath]" :data="tree1" show-line @update:selected-keys="onTreeClick"> </a-tree>
        </div>
      </a-tab-pane>
      <a-tab-pane key="3">
        <template #title>表单</template>
        <div class="fe-side__pl fe-fe-side__pr">
          <a-tree :selected-keys="[formStore.selectedPath]" :data="tree2" show-line @update:selected-keys="onTreeClick"> </a-tree>
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script lang="ts" setup>
  import { computed, h } from 'vue';
  import draggable from 'vuedraggable';
  import { deepClone, RecordStringAny } from '@/utils/index';
  import { TreeNodeData } from '@/hooks/arco';
  import useFormStore from './store/index';
  import { FormSidePanelOptions, FormFont } from './config/index';

  const formStore = useFormStore();

  function anaItem(item: RecordStringAny, type = 0): TreeNodeData {
    const ne: TreeNodeData = { title: type === 0 ? item.options?.label : item.label, key: item.path };
    if (!item?.list?.length) {
      ne.switcherIcon = () => h(FormFont, { type: item.icon, size: 12 });
    } else {
      ne.icon = () => h(FormFont, { type: item.icon, size: 12 });
    }
    return ne;
  }

  const tree1 = computed(() => {
    function loop(item: RecordStringAny) {
      // const newItem: SelectOptionData = { title: item?.label, key: item?.path };
      const newItem: TreeNodeData = anaItem(item, 1);
      if (item?.list) {
        newItem.children = item.list.map((a: RecordStringAny) => loop(a));
      }
      return newItem;
    }
    const root: TreeNodeData = {
      title: '表单',
      key: '',
      children: deepClone(formStore.list).map((item: RecordStringAny) => loop(item)),
      disabled: false,
      icon: () => h(FormFont, { type: 'icon-subform', size: 12 }),
    };
    return [root];
  });
  const tree2 = computed(() => {
    const arr: TreeNodeData[] = [];
    function loop(item: RecordStringAny) {
      // const newItem: SelectOptionData = { title: item?.options?.label ?? item?.label, key: item?.path };
      const newItem: TreeNodeData = anaItem(item);
      if (item.category === 'form') {
        // 模拟子表单分层
        newItem.title = `子表单[${item.options.tableName || '未命名'}]`;
        newItem.children = deepClone<RecordStringAny[]>(item.list).map((a) => anaItem(a)) as TreeNodeData[];
        arr.push(newItem);
      } else {
        if (item?.list) item.list.forEach((a: RecordStringAny) => loop(a));
        if (item.category === 'field') arr.push(newItem);
      }
    }
    deepClone(formStore.list).forEach((item: RecordStringAny) => loop(item));
    const root: TreeNodeData = {
      title: `表单[${formStore.formConfig.name || '未命名'}]`,
      key: '',
      children: arr,
      disabled: false,
      icon: () => h(FormFont, { type: 'icon-subform', size: 12 }),
    };
    return [root];
  });

  function onTreeClick([path]: any[]) {
    const item = formStore.getPath(path, true);
    if (item) return item.path as string;
    return '';
  }
</script>

<style lang="less">
  .fe-side {
    user-select: none;

    &__pl {
      padding-left: 12px;
    }
    &__pr {
      padding-right: 12px;
    }

    &__ul {
      position: relative;
      font-size: 0;
    }
    &__li {
      display: inline-block;
      margin: 0;
      padding: 0;
      width: 50%;
      font-size: 14px;
      list-style: none;
    }
    &__title {
      display: block;
      margin: 3px 0 6px 12px;
    }
    &__item {
      position: relative;
      height: 28px;
      line-height: 28px;
      width: 100%;
      float: left;
      cursor: move;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      color: var(--color-text-2);
      background-color: var(--color-secondary);
      border: 1px solid transparent;
      border-radius: var(--border-radius-small);
      padding-left: 20px;
      margin-bottom: 8px;
      font-size: 13px;

      .arco-icon {
        position: absolute;
        left: 2px;
        top: 7px;
        color: rgb(var(--primary-6));
      }
    }
    .arco-tabs-content {
      padding-top: 8px;
      box-sizing: border-box;
      height: 100%;
    }
  }
  .fe-side__content {
    position: relative;
  }
</style>

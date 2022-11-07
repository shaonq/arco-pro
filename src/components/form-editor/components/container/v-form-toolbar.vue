<template>
  <div
    class="fe-form-toolbar"
    :class="{
      'is-selected': selected,
      'is-disabled': prop.disabled,
      [`fe-category__${prop.field.category}`]: !!prop.field.category,
    }"
    @click.stop="onViewClick"
  >
    <!-- tools -->
    <template v-if="!prop.disabled">
      <div v-if="selected" class="fe-form-toolbar__tools">
        <a-button size="mini">
          <template v-if="isReadonlyView(prop.field)" #icon><icon-drag-dot-vertical class="fe-moving" /></template>
          {{ prop.field.label }}
        </a-button>
      </div>
    </template>
    <!-- component  -->
    <div class="fc-component">
      <slot>
        <component :is="getComponentName(prop.field.type)" :field="prop.field" :path="path" :disabled="prop.disabled" />
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { PropType, watch, computed, onUnmounted } from 'vue';
  import { getComponentName } from '../field/index';
  import useVFormStore from '../store/index';
  import { isReadonlyView, FormViewType } from '../config/index';

  const formStore = useVFormStore();
  /**
   * @desc 用于编辑器统一控制控件
   *       根据控件的生命周期 生成或销毁 必要数据
   *
   */
  const prop = defineProps({
    field: {
      type: Object as PropType<FormViewType>,
      default() {
        return {};
      },
    },
    path: String,
    disabled: Boolean,
  });
  // parent field data
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const parentField = computed(() => {
    const pathArr = prop.path?.split('.') || [];
    const item = formStore.getPath(pathArr.slice(0, -1).join('.'));
    if (item) return item.options?.label;
    return item;
  });

  // selected
  const selected = computed(() => {
    return formStore.selectedId && formStore.selectedId === prop.field.id;
  });
  function onViewClick() {
    if (!prop.disabled) formStore.setSelected(prop.field);
  }

  // options name
  // parentField

  // async formConfig path
  function asyncFormItemPath(path?: string) {
    if (!path) return;
    if (prop.disabled) return;
    formStore.setPath(`${path}.path`, path);
  }
  asyncFormItemPath(prop.path);
  watch(
    () => prop.path,
    (path) => asyncFormItemPath(path)
  );

  // async options.name
  function asyncOptionsName() {
    if (prop.disabled) return;
    const { options } = prop.field;
    if (!options || !options.name) return;
    // console.log(options);
    formStore.updateFormValue(options.name, options.defaultValue);
  }
  asyncOptionsName();

  watch(
    () => prop.field.options?.name,
    (name, oldName) => {
      asyncOptionsName();
      if (prop.disabled) return;
      formStore.deleteFormName(oldName);
    }
  );
  onUnmounted(() => {
    if (prop.disabled) return;
    formStore.deleteFormName(prop.field.options?.name);
  });
</script>

<style lang="less">
  .fe-form-toolbar {
    position: relative;
    padding: 2px;
    box-sizing: border-box;
    z-index: 1;

    &__tools {
      position: absolute;
      left: 0;
      top: 0;
      z-index: 2;
      opacity: 0.9;
    }

    &.is-selected {
      outline: 2px solid rgb(var(--primary-5));
      z-index: 9;
    }
    &.is-disabled {
      outline: none;
      padding: 0;
    }
  }

  * + .fe-category__container,
  .fe-category__container + .fe-category__field {
    margin-top: 20px;
  }
</style>

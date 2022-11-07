<template>
  <a-card :size="formStore.formConfig.size">
    <!-- :body-style="{ padding: 0 }" -->
    <template #title>
      <div>
        <icon-caret-down v-if="visible" class="fe-form-card__icon" @click="toggle()" />
        <icon-caret-right v-else class="fe-form-card__icon" @click="toggle()" />
        {{ prop.field.options?.label }}
      </div>
    </template>
    <!-- <template #extra> <a-link>More</a-link> </template> -->
    <template v-if="visible">
      <slot>
        <draggable
          :list="prop.field.list"
          class="fe-form-card"
          :class="{ 'is-disabled': prop.disabled }"
          group="toolsGroup"
          animation="300"
          drag-class="fe-drag"
          ghost-class="fe-ghost"
          chosen-class="fe-chosen"
          item-key="id"
          handle=".fe-moving"
          @update="formStore.onHistoryChange"
        >
          <template #item="{ element, index }">
            <v-form-toolbox :field="element" :path="createPath(prop.path, index)" :disabled="prop.disabled" />
          </template>
        </draggable>
      </slot>
    </template>
  </a-card>
</template>

<script lang="ts" setup>
  /**
   * @desc 可添加控件的容器
   *
   */
  import { PropType } from 'vue';
  import draggable from 'vuedraggable';
  import { RecordStringAny } from '@/utils/index';
  import useVisible from '@/hooks/visible';

  import vFormToolbox from '../container/v-form-toolbar.vue';

  import useVFormStore from '../store/index';
  import { createPath } from '../config/index';

  const { visible, toggle } = useVisible(true);
  const formStore = useVFormStore();

  const prop = defineProps({
    field: Object as PropType<RecordStringAny>,
    path: String,
    disabled: Boolean,
  });
</script>

<style lang="less">
  .fe-form-card {
    padding: 0 !important;
    position: relative;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    min-height: 30px;
    outline: 1px dashed rgb(var(--primary-5));
    // background: var(--color-menu-light-bg);
    // box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.08);
    &.is-disabled {
      outline: none;
    }
  }
  .fe-form-card__icon {
    position: relative;
    display: inline-block;
    color: var(--color-neutral-7);
    font-size: 14px;
    vertical-align: middle;
    transition: transform 0.2s cubic-bezier(0.34, 0.69, 0.1, 1);
  }
</style>

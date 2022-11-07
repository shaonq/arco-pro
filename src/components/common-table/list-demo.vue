<template>
  <a-space v-if="props && props.url" direction="vertical" fill>
    <div style="display: flex; justify-content: center; align-content: center">
      <div style="flex: 1">
        <a-space>
          <slot name="title">
            <a-typography-title :heading="6" style="margin: 0">{{ title }}</a-typography-title>
          </slot>
        </a-space>
      </div>
      <div>
        <a-space>
          <slot name="tool"></slot>
          <a-tooltip content="表格斑马纹" mini>
            <a-switch v-model="stripe">
              <template #checked> 开 </template>
              <template #unchecked> 关 </template>
            </a-switch>
          </a-tooltip>
          <a-tooltip content="刷新" mini>
            <a-button @click="dataInit()">
              <template #icon> <icon-refresh style="font-size: 16px; stroke-width: 3" /> </template>
            </a-button>
          </a-tooltip>
          <a-tooltip content="密度" mini>
            <a-dropdown position="br">
              <a-button>
                <template #icon> <icon-layers style="font-size: 16px; stroke-width: 3" /> </template>
              </a-button>
              <template #content>
                <a-doption @click="onChangeSize('medium')">默认</a-doption>
                <a-doption @click="onChangeSize('small')">中等</a-doption>
                <a-doption @click="onChangeSize('mini')">紧凑</a-doption>
              </template>
            </a-dropdown>
          </a-tooltip>
          <a-tooltip content="设置" mini>
            <!-- 自定义列 -->
            <a-popover size="mini" position="br" trigger="click" :show-arrow="false">
              <template #title>
                <a-typography-text class="u-flex__item">属性</a-typography-text>
              </template>
              <a-button>
                <template #icon><icon-settings style="font-size: 16px" /> </template>
              </a-button>
              <template #content>
                <draggable
                  :list="columnsTemp"
                  style="user-select: none"
                  class="fe-list"
                  group="toolsGroup"
                  animation="300"
                  drag-class="fe-drag"
                  ghost-class="fe-ghost"
                  chosen-class="fe-chosen"
                  item-key="id"
                  handle=".fe-moving"
                >
                  <template #item="{ element }">
                    <a-space direction="vertical" fill>
                      <a-space>
                        <icon-drag-dot-vertical class="fe-moving" />
                        <a-checkbox v-model="element.isShow" size="mini" />
                        <span>{{ element.label }}</span>
                      </a-space>
                    </a-space>
                  </template>
                </draggable>
              </template>
            </a-popover>
          </a-tooltip>
        </a-space>
      </div>
    </div>
    <a-table :data="list" :pagination="false" :size="size" :loading="loading" :stripe="stripe">
      <template #columns>
        <template v-for="(item, index) in columnsTemp" :key="index">
          <a-table-column v-if="item.isShow === true" :title="item.label" :data-index="item.name"></a-table-column>
        </template>
        <!-- Operation -->
        <a-table-column v-if="props.operation" title="操作" :width="props.operation" fixed="right">
          <template #cell="{ record }">
            <slot name="operation" :record="record" />
          </template>
        </a-table-column>
      </template>
    </a-table>
    <a-space fill style="justify-content: flex-end">
      <a-pagination
        v-model:current="page.page"
        :total="page.total"
        :default-page-size="page.size"
        :size="size"
        show-total
        :virtual-list-props="{ height: 400 }"
        show-page-size
        @change="dataInit()"
      />
    </a-space>
  </a-space>
  <slot></slot>
</template>

<script lang="ts" setup>
  import draggable from 'vuedraggable';
  import { ref, watch, computed } from 'vue';
  import { useErrData } from '@/hooks/request';
  import useLoading from '@/hooks/loading';

  const props = defineProps({
    title: { type: String },
    url: { type: String },
    method: { type: String, default: 'POST' },
    postData: { type: Object },
    dataFormat: { type: Function },
    operation: { type: Number }, // 操作 slot = 宽度
    columns: { type: Array }, // columns 格式化
  });

  const emits = defineEmits(['click']);
  type TypeSize = 'mini' | 'medium' | 'large' | 'small';
  type StringAnyType = Record<string, any>;
  const stripe = ref<boolean>(false);
  const size = ref<TypeSize>('medium');
  function onChangeSize(type: TypeSize) {
    size.value = type;
  }

  const page = ref({ page: 1, size: 10, total: 0 });

  const list = ref<StringAnyType[]>([]);
  const colKeys = ref<string[]>([]);
  const { loading, setLoading } = useLoading();
  const dataInit = async () => {
    if (props.url) {
      setLoading(true);
      const [err, data] = await useErrData<StringAnyType>({
        url: props.url, // 'http://172.16.10.74:9000/oss-application-center/domainapp/data',
        method: (props.method || 'POST') as 'POST' | 'GET',
        data: {
          page: page.value,
          ...(props.postData ?? {}),
        },
      });
      if (!err) {
        const value = (data?.rows as StringAnyType[]) ?? (data as StringAnyType[]) ?? [];
        list.value = value;
        page.value.total = (data?.total as number) ?? 0;
        if (list.value && list.value.length) {
          colKeys.value = Object.keys(list.value[0]);
        }
      }
      setLoading(false);
    }
  };

  dataInit();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function onUpdate(row: Record<string, any>) {
    emits('click', row);
  }

  const columns = computed(() => {
    return [...colKeys.value].map((key) => {
      const item: any = props.columns?.find((q) => (q as StringAnyType).name === key) ?? undefined;
      const t = item ? { ...item, isShow: true } : { name: key, label: key, isShow: !props.columns };
      return t;
    });
  });

  watch(
    () => props.postData,
    () => dataInit()
  );

  defineExpose({ dataInit });

  // Options

  const columnsTemp = ref(columns.value);
  watch(
    () => columns.value,
    (v) => {
      columnsTemp.value = v;
    }
  );
</script>

<style lang="less" scoped></style>

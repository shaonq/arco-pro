<template>
  <a-config-provider :locale="locale">
    <router-view />
    <global-setting />
  </a-config-provider>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import enUS from '@arco-design/web-vue/es/locale/lang/en-us';
  import zhCN from '@arco-design/web-vue/es/locale/lang/zh-cn';
  import GlobalSetting from '@/components/global-setting/index.vue';
  import useLocale from '@/hooks/locale';

  const { currentLocale } = useLocale();
  const locale = computed(() => {
    switch (currentLocale.value) {
      case 'zh-CN':
        return zhCN;
      case 'en-US':
        return enUS;
      default:
        return zhCN;
    }
  });
</script>

<style lang="less">
  /* 自定义样式 */
  .arco-spin,
  .panel {
    border-radius: 2px;
    box-shadow: 0 1px 3px rgba(18, 18, 18, 0.08);
  }
  .arco-card-bordered {
    border: 1px solid #ebebeb;
    border-radius: 2px;
    box-shadow: 0 1px 3px rgba(18, 18, 18, 0.08);
  }

  .arco-result-icon-success,
  .arco-result-icon-error,
  .arco-result-icon-info {
    .arco-result-icon-tip {
      width: 86px;
      height: 86px;
    }
    svg {
      width: 32px;
      height: 32px;
    }
  }
</style>

<style lang="less">
  /** 修改浅色主题 */
  @sideThemeColor: #00163a;
  @sideThemeSubColor: #00081a;
  body {
    // mobile
    .layout-logo {
      cursor: pointer;
    }
    .layout-mobile .layout-logo {
      width: auto !important;
      white-space: nowrap;
    }
    &:not([arco-theme='dark']) {
      .layout-content {
        background: var(--color-fill-1);
      }
      .layout:not(.layout-mobile) .layout-logo {
        background: @sideThemeColor;
        box-shadow: -1px 0 0 1px @sideThemeColor;
        &__name {
          color: rgba(#fff, 0.85);
        }
      }
      // mobile  drawer
      .layout-menu--drawer .arco-drawer-body {
        padding: 0;
      }
      // desktop menu
      .arco-menu-light.layout-menu {
        background: @sideThemeColor;
        // menu content
        .arco-menu-inner {
          padding-left: 0;
          padding-right: 0;
        }
        .arco-menu-inline-content {
          background: @sideThemeSubColor;
        }
        // default text color
        .arco-menu-inline-header,
        .arco-menu-icon svg,
        .arco-menu-icon-suffix svg,
        .arco-menu-item {
          background: transparent;
          color: rgba(#fff, 0.65);
          transition: 300ms;
        }
        // hover
        .arco-menu-inline-header:hover,
        .arco-menu-item:hover {
          background: rgba(#fff, 0.1);
        }
        // selected
        .arco-menu-inline-header.arco-menu-selected {
          &,
          .arco-menu-icon svg,
          .arco-menu-icon-suffix svg {
            color: rgba(#fff, 0.9);
          }
        }
        .arco-menu-item.arco-menu-selected {
          background: rgb(var(--primary-6));
          color: rgba(#fff, 1);
        }
        .arco-menu-collapse-button,
        .arco-menu-pop {
          background: transparent;
        }
      }

      /** 修改回传统的input样式 */
      .arco-input-wrapper,
      .arco-textarea-wrapper,
      .arco-form-item-content-wrapper,
      .arco-picker-range:not(.arco-picker-error),
      .arco-select-view {
        &,
        &:hover {
          background-color: transparent;
        }
        &,
        & + .arco-input-append {
          border-color: var(--color-fill-3);
        }
        & + .arco-input-append {
          border-left-color: transparent;
        }
        &:hover {
          border-color: var(--color-fill-4);
        }
      }
      .arco-form-item-status-error {
        .arco-select-view:not(.arco-select-view-disabled),
        .arco-input-tag:not(.arco-input-tag-disabled),
        .arco-input-wrapper:not(.arco-input-disabled),
        .arco-textarea-wrapper:not(.arco-textarea-disabled),
        .arco-picker-error {
          border-color: var(--color-danger-light-2);
        }
      }
    }
  }
</style>

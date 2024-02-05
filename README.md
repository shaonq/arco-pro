<div align="center">
  <h1>Arco Design Pro</h1>
</div>

<div align="center">

基于 [Arco Design](https://arco.design/) Vue 组件库的开箱即用的中后台前端解决方案。

Admin 中后台管理页面，创新的多架构方案。

[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/arco-design/arco-design-pro/blob/main/LICENSE)

</div>

<div align="center">

</div>

## ✨ Features

- **TypeScript** - 代码完全使用 TypeScript 书写。
- **Vue3** - 面向未来，拥抱 Vue3。
- **Pinia** - 紧跟潮流，美味可口。
- **Arco Design** - 由 [ArcoDesign Vue](https://github.com/arco-design/arco-design-vue) 组件库强力驱动。
- **Templates** - 16+ 页面模版，覆盖表格、列表、表单、工作台、可视化等场景。
- **Themes** - 基于「[风格配置平台](https://arco.design/themes)」丰富的主题市场，让你的项目千变万化。
- **Dark Theme** - 一键丝滑切换暗黑风格。
- **Mock** - 内置 api 模拟方案，代码即注释，更加仿真线上环境。
- **I18n** - 内置国际化多语言解决方案。
- **Config** - 灵活配置页面配色、布局等。

## 🌈 Usage

```bash
# yarn
$ npm install -g yarn --registry https://registry.npm.taobao.org
$ yarn config set registry https://registry.npm.taobao.org -g

#pnpm
$ npm install -g pnpm --registry https://registry.npm.taobao.org
$ pnpm config set registry https://registry.npm.taobao.org -g

# other registry
# npm default registry  http://registry.npmjs.org
# tencent npm registry   http://mirrors.cloud.tencent.com/npm/
# huawei npm registry  https://repo.huaweicloud.com/repository/npm/
```

## 🌈 Issues

```bash
# stylelint v13 => stylelint v14 缺少部分依赖包 无法查看语法问题提示
$ yarn add -D postcss postcss-less postcss-html stylelint-config-prettier stylelint-config-recommended-less stylelint-config-standard stylelint-config-standard-vue stylelint-less stylelint-order
# 根目录 .stylelintrc.js 新增
  {
   # ...
    overrides: [
    {
      files: ["*.html", "**/*.html"],
      customSyntax: "postcss-html"
    },
    {
      files: ["**/*.{less,css}"],
      customSyntax: "postcss-less"
    }
  ]
   # ...
  }

```

## 🔗 Link

- [Arco Design Pro 官网](https://pro.arco.design)
- [预览](https://vue-pro.arco.design)

## 💎 Changelog

- [中文版](https://github.com/arco-design/arco-design-pro-vue/blob/main/docs/changelog.zh-CN.md)

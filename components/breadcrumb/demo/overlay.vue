<docs>
---
order: 5
title:
  zh-CN: 带下拉菜单的面包屑
  en-US: Bread crumbs with drop down menu
---

## zh-CN

面包屑支持下拉菜单。

## en-US

Breadcrumbs support drop down menu.

</docs>

<template>
  <xy-breadcrumb>
    <xy-breadcrumb-item>Ant Design Vue</xy-breadcrumb-item>
    <xy-breadcrumb-item><a href="">Component</a></xy-breadcrumb-item>
    <xy-breadcrumb-item>
      <a href="">General</a>
      <template #overlay>
        <xy-menu>
          <xy-menu-item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">General</a>
          </xy-menu-item>
          <xy-menu-item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">Layout</a>
          </xy-menu-item>
          <xy-menu-item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">Navigation</a>
          </xy-menu-item>
        </xy-menu>
      </template>
    </xy-breadcrumb-item>
    <xy-breadcrumb-item>Button</xy-breadcrumb-item>
  </xy-breadcrumb>
</template>

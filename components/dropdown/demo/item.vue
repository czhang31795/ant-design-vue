<docs>
---
order: 2
title:
  zh-CN: 其他元素
  en-US: Other elements
---

## zh-CN

分割线和不可用菜单项。

## en-US

Divider and disabled menu item.

</docs>

<template>
  <xy-dropdown>
    <a class="xy-dropdown-link" @click.prevent>
      Hover me
      <DownOutlined />
    </a>
    <template #overlay>
      <xy-menu>
        <xy-menu-item key="0">
          <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
            1st menu item
          </a>
        </xy-menu-item>
        <xy-menu-item key="1">
          <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
            2nd menu item
          </a>
        </xy-menu-item>
        <xy-menu-divider />
        <xy-menu-item key="3" disabled>3rd menu item（disabled）</xy-menu-item>
      </xy-menu>
    </template>
  </xy-dropdown>
</template>
<script lang="ts" setup>
import { DownOutlined } from '@ant-design/icons-vue';
</script>

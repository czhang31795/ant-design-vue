<docs>
---
order: 1
title:
  zh-CN: 弹出位置
  en-US: Placement
---

## zh-CN

支持 6 个弹出位置。

## en-US

Support 6 placements.

</docs>

<template>
  <div id="components-dropdown-demo-placement">
    <template v-for="(placement, index) in placements" :key="placement">
      <xy-dropdown :placement="placement">
        <xy-button>{{ placement }}</xy-button>
        <template #overlay>
          <xy-menu>
            <xy-menu-item>
              <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
                1st menu item
              </a>
            </xy-menu-item>
            <xy-menu-item>
              <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
                2nd menu item
              </a>
            </xy-menu-item>
            <xy-menu-item>
              <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
                3rd menu item
              </a>
            </xy-menu-item>
          </xy-menu>
        </template>
      </xy-dropdown>
      <br v-if="index === 2" />
    </template>
  </div>
</template>
<script lang="ts" setup>
import type { DropdownProps } from 'ant-design-vue';
const placements = [
  'bottomLeft',
  'bottom',
  'bottomRight',
  'topLeft',
  'top',
  'topRight',
] as DropdownProps['placement'][];
</script>
<style scoped>
#components-dropdown-demo-placement .xy-btn {
  margin-right: 8px;
  margin-bottom: 8px;
}
</style>

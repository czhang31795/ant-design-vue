<docs>
---
order: 3
title:
  zh-CN: 箭头指向
  en-US: Arrow pointing at the center
---

## zh-CN

设置 `arrow` 为 `{ pointAtCenter: true }` 后，箭头将指向目标元素的中心。

## en-US

By specifying `arrow` prop with `{ pointAtCenter: true }`, the arrow will point to the center of the target element.

</docs>

<template>
  <xy-space style="display: flex; flex-wrap: wrap">
    <template v-for="placement in placements" :key="placement">
      <xy-dropdown :placement="placement" :arrow="{ pointAtCenter: true }">
        <xy-button>{{ placement }}</xy-button>
        <template #overlay>
          <xy-menu>
            <xy-menu-item>
              <a href="javascript:;">1st menu item</a>
            </xy-menu-item>
            <xy-menu-item>
              <a href="javascript:;">2nd menu item</a>
            </xy-menu-item>
            <xy-menu-item>
              <a href="javascript:;">3rd menu item</a>
            </xy-menu-item>
          </xy-menu>
        </template>
      </xy-dropdown>
    </template>
  </xy-space>
</template>
<script lang="ts" setup>
const placements = ['topLeft', 'top', 'topRight', 'bottomLeft', 'bottom', 'bottomRight'] as const;
</script>

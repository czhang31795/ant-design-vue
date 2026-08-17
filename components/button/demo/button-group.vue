<docs>
---
order: 99
title:
  zh-CN: 废弃的 Block 组
  en-US: Deprecated Button Group
debug: true
---

## zh-CN

Debug usage

## en-US

Debug usage
</docs>

<template>
  <div id="components-button-demo-button-group">
    <h4>Basic</h4>
    <xy-button-group>
      <xy-button>Cancel</xy-button>
      <xy-button type="primary">OK</xy-button>
    </xy-button-group>
    <xy-button-group>
      <xy-button disabled>L</xy-button>
      <xy-button disabled>M</xy-button>
      <xy-button disabled>R</xy-button>
    </xy-button-group>
    <xy-button-group>
      <xy-button type="primary">L</xy-button>
      <xy-button>M</xy-button>
      <xy-button>M</xy-button>
      <xy-button type="dashed">R</xy-button>
    </xy-button-group>
    <h4>With Icon</h4>
    <xy-button-group>
      <xy-button type="primary">
        <LeftOutlined />
        Go back
      </xy-button>
      <xy-button type="primary">
        Go forward
        <RightOutlined />
      </xy-button>
    </xy-button-group>
    <xy-button-group>
      <xy-button type="primary">
        <template #icon><CloudOutlined /></template>
      </xy-button>
      <xy-button type="primary">
        <template #icon><CloudDownloadOutlined /></template>
      </xy-button>
    </xy-button-group>
  </div>
</template>

<script lang="ts" setup>
import {
  LeftOutlined,
  RightOutlined,
  CloudDownloadOutlined,
  CloudOutlined,
} from '@ant-design/icons-vue';
</script>

<style scoped>
#components-button-demo-button-group > h4 {
  margin: 16px 0;
  font-size: 14px;
  line-height: 1;
  font-weight: normal;
}
#components-button-demo-button-group > h4:first-child {
  margin-top: 0;
}
#components-button-demo-button-group .xy-btn-group {
  margin-right: 8px;
}
</style>
```

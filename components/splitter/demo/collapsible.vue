<docs>
---
order: 3
title:
  zh-CN: 可折叠
  en-US: Collapsible
---

## zh-CN

配置 `collapsible` 提供快捷收缩能力。可以通过 `min` 限制收缩后不能通过拖拽展开。

## en-US

Configure `collapsible` to quickly collapse panels. Use `min` to prevent expanding by dragging after collapse.

</docs>

<template>
  <div class="demo-splitter">
    <a-splitter>
      <a-splitter-panel collapsible min="20%">
        <div class="demo-panel">First</div>
      </a-splitter-panel>
      <a-splitter-panel collapsible>
        <div class="demo-panel">Second</div>
      </a-splitter-panel>
    </a-splitter>
  </div>
</template>

<style scoped>
.demo-splitter {
  height: 200px;
  border: 1px solid #f0f0f0;
  border-radius: 6px;
  overflow: hidden;
}
.demo-panel {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 16px;
  color: rgba(0, 0, 0, 0.45);
  background: rgba(0, 0, 0, 0.02);
}
[data-theme='dark'] .demo-splitter {
  border-color: #303030;
}
[data-theme='dark'] .demo-panel {
  color: rgba(255, 255, 255, 0.45);
  background: rgba(255, 255, 255, 0.04);
}
</style>

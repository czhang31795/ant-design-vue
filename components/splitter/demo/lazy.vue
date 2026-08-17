<docs>
---
order: 6
title:
  zh-CN: 延迟渲染模式
  en-US: Lazy
---

## zh-CN

延迟渲染模式，拖拽时不会立即更新大小，而是等到松手时才更新。

## en-US

Lazy mode: size updates only after the drag ends.

</docs>

<template>
  <div class="demo-splitter">
    <xy-splitter lazy>
      <xy-splitter-panel default-size="40%">
        <div class="demo-panel">First</div>
      </xy-splitter-panel>
      <xy-splitter-panel>
        <div class="demo-panel">Second</div>
      </xy-splitter-panel>
    </xy-splitter>
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

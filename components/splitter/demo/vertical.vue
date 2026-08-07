<docs>
---
order: 2
title:
  zh-CN: 垂直方向
  en-US: Vertical
---

## zh-CN

使用垂直布局。

## en-US

Use vertical layout.

</docs>

<template>
  <div class="demo-splitter">
    <a-splitter layout="vertical">
      <a-splitter-panel>
        <div class="demo-panel">First</div>
      </a-splitter-panel>
      <a-splitter-panel>
        <div class="demo-panel">Second</div>
      </a-splitter-panel>
    </a-splitter>
  </div>
</template>

<style scoped>
.demo-splitter {
  height: 300px;
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

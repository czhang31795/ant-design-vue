<docs>
---
order: 0
title:
  zh-CN: 基本用法
  en-US: Basic
---

## zh-CN

初始化面板大小，面板大小限制。

## en-US

Initialize panel size, panel size limits.

</docs>

<template>
  <div class="demo-splitter">
    <a-splitter>
      <a-splitter-panel default-size="40%" min="20%" max="70%">
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

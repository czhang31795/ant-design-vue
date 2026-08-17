<docs>
---
order: 4
title:
  zh-CN: 多面板
  en-US: Multiple Panels
---

## zh-CN

多个面板组合。

## en-US

Multiple panels.

</docs>

<template>
  <div class="demo-splitter">
    <xy-splitter>
      <xy-splitter-panel collapsible>
        <div class="demo-panel">Panel 1</div>
      </xy-splitter-panel>
      <xy-splitter-panel>
        <div class="demo-panel">Panel 2</div>
      </xy-splitter-panel>
      <xy-splitter-panel collapsible>
        <div class="demo-panel">Panel 3</div>
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

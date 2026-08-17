<docs>
---
order: 5
title:
  zh-CN: 复杂组合
  en-US: Complex combination
---

## zh-CN

复杂组合面板，快捷折叠，禁止改变大小。

## en-US

Complex nested panels with quick collapse and disabled resize.

</docs>

<template>
  <div class="demo-splitter">
    <xy-splitter>
      <xy-splitter-panel collapsible default-size="30%" :resizable="false">
        <div class="demo-panel">Left</div>
      </xy-splitter-panel>
      <xy-splitter-panel>
        <xy-splitter layout="vertical" style="height: 100%">
          <xy-splitter-panel>
            <div class="demo-panel">Top</div>
          </xy-splitter-panel>
          <xy-splitter-panel>
            <div class="demo-panel">Bottom</div>
          </xy-splitter-panel>
        </xy-splitter>
      </xy-splitter-panel>
    </xy-splitter>
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

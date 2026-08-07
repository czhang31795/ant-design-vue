<docs>
---
order: 1
title:
  zh-CN: 受控模式
  en-US: Control
---

## zh-CN

受控调整尺寸。当 Panel 之间任意一方禁用 `resizable`，则其拖拽将被禁用。

## en-US

Controlled size. Dragging is disabled when either side sets `resizable` to false.

</docs>

<template>
  <a-space direction="vertical" style="width: 100%">
    <a-space>
      <a-button @click="enabled = !enabled">{{ enabled ? '禁用拖拽' : '启用拖拽' }}</a-button>
      <a-button @click="reset">重置</a-button>
    </a-space>
    <div class="demo-splitter">
      <a-splitter @resize="onResize">
        <a-splitter-panel :size="sizes[0]" :resizable="enabled" min="20%">
          <div class="demo-panel">First</div>
        </a-splitter-panel>
        <a-splitter-panel :size="sizes[1]" :resizable="enabled">
          <div class="demo-panel">Second</div>
        </a-splitter-panel>
      </a-splitter>
    </div>
  </a-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const enabled = ref(true);
const sizes = ref<(number | string)[]>(['50%', '50%']);

const onResize = (next: number[]) => {
  sizes.value = next;
};

const reset = () => {
  sizes.value = ['50%', '50%'];
};
</script>

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

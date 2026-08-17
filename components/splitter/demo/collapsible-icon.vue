<docs>
---
order: 3.1
title:
  zh-CN: 可折叠图标显示
  en-US: Collapsible Icon
---

## zh-CN

配置 `collapsible.showCollapsibleIcon` 控制折叠图标的显示方式：`auto` 悬停显示，`true` 始终显示，`false` 始终隐藏。

## en-US

Use `collapsible.showCollapsibleIcon` to control icon visibility: `auto` on hover, `true` always show, `false` always hide.

</docs>

<template>
  <xy-space direction="vertical" style="width: 100%" :size="16">
    <xy-space>
      <span>ShowCollapsibleIcon:</span>
      <xy-radio-group v-model:value="showIconMode" :options="options" />
    </xy-space>
    <div class="demo-splitter">
      <xy-splitter>
        <xy-splitter-panel :collapsible="collapsible" min="20%">
          <div class="demo-panel">First</div>
        </xy-splitter-panel>
        <xy-splitter-panel :collapsible="collapsible">
          <div class="demo-panel">Second</div>
        </xy-splitter-panel>
        <xy-splitter-panel :collapsible="collapsible">
          <div class="demo-panel">Third</div>
        </xy-splitter-panel>
      </xy-splitter>
    </div>
  </xy-space>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';

const showIconMode = ref<'auto' | boolean>(true);
const options = [
  { label: 'Auto', value: 'auto' },
  { label: 'True', value: true },
  { label: 'False', value: false },
];

const collapsible = computed(() => ({
  start: true,
  end: true,
  showCollapsibleIcon: showIconMode.value,
}));
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

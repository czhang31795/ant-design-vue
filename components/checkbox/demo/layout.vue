<docs>
---
order: 5
title:
  zh-CN: 布局
  en-US: Use with grid
---

## zh-CN

Checkbox.Group 内嵌 Checkbox 并与 Grid 组件一起使用，可以实现灵活的布局

## en-US

We can use Checkbox and Grid Checkbox.group, to implement complex layout

</docs>

<template>
  <xy-checkbox-group v-model:value="value" style="width: 100%">
    <xy-row>
      <xy-col :span="8">
        <xy-checkbox value="A">A</xy-checkbox>
      </xy-col>
      <xy-col :span="8">
        <xy-checkbox value="B">B</xy-checkbox>
      </xy-col>
      <xy-col :span="8">
        <xy-checkbox value="C">C</xy-checkbox>
      </xy-col>
      <xy-col :span="8">
        <xy-checkbox value="D">D</xy-checkbox>
      </xy-col>
      <xy-col :span="8">
        <xy-checkbox value="E">E</xy-checkbox>
      </xy-col>
    </xy-row>
  </xy-checkbox-group>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const value = ref([]);
</script>

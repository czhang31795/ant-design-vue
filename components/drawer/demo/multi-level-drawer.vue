<docs>
---
order: 5
title:
  zh-CN: 多层抽屉
  en-US: Multi-level drawer
---

## zh-CN

在抽屉内打开新的抽屉，用以解决多分支任务的复杂状况。

## en-US

Open a new drawer on top of an existing drawer to handle multi branch tasks.

</docs>

<template>
  <xy-button type="primary" @click="showDrawer">Open</xy-button>
  <xy-drawer
    v-model:open="open"
    title="Multi-level drawer"
    width="520"
    :closable="false"
    :footer-style="{ textAlign: 'right' }"
    @close="onClose"
  >
    <xy-button type="primary" @click="showChildrenDrawer">Two-level drawer</xy-button>
    <xy-drawer v-model:open="childrenDrawer" title="Two-level Drawer" width="320" :closable="false">
      <xy-button type="primary" @click="showChildrenDrawer">This is two-level drawer</xy-button>
    </xy-drawer>

    <template #footer>
      <xy-button style="margin-right: 8px" @click="onClose">Cancel</xy-button>
      <xy-button type="primary" @click="onClose">Submit</xy-button>
    </template>
  </xy-drawer>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const open = ref<boolean>(false);

const childrenDrawer = ref<boolean>(false);

const showDrawer = () => {
  open.value = true;
};
const onClose = () => {
  open.value = false;
};
const showChildrenDrawer = () => {
  childrenDrawer.value = true;
};
</script>

<docs>
---
order: 10
title:
  zh-CN: 自定义模态的宽度
  en-US: To customize the width of modal
---

## zh-CN

使用`width`来设置模态对话框的宽度

## en-US

Use `width` to set the width of the modal dialog

</docs>

<template>
  <div>
    <xy-button type="primary" @click="showModal">Open Modal of 1000px width</xy-button>
    <xy-modal v-model:open="open" width="1000px" title="Basic Modal" @ok="handleOk">
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </xy-modal>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const open = ref<boolean>(false);

const showModal = () => {
  open.value = true;
};

const handleOk = (e: MouseEvent) => {
  console.log(e);
  open.value = false;
};
</script>

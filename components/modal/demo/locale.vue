<docs>
---
order: 5
title:
  zh-CN: 国际化
  en-US: Internationalization
---

## zh-CN

设置 `okText` 与 `cancelText` 以自定义按钮文字。

## en-US

To customize the text of the buttons, you need to set `okText` and `cancelText` props.

</docs>

<template>
  <div>
    <xy-button type="primary" @click="showModal">Modal</xy-button>
    <xy-button @click="confirm">Confirm</xy-button>
    <xy-modal v-model:open="open" title="Modal" ok-text="确认" cancel-text="取消" @ok="hideModal">
      <p>Bla bla ...</p>
      <p>Bla bla ...</p>
      <p>Bla bla ...</p>
    </xy-modal>
  </div>
</template>
<script lang="ts" setup>
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { ref, createVNode } from 'vue';
import { Modal } from 'ant-design-vue';
const open = ref<boolean>(false);

const showModal = () => {
  open.value = true;
};
const hideModal = () => {
  open.value = false;
};

const confirm = () => {
  Modal.confirm({
    title: 'Confirm',
    icon: createVNode(ExclamationCircleOutlined),
    content: 'Bla bla ...',
    okText: '确认',
    cancelText: '取消',
  });
};
</script>

<docs>
---
order: 13
title:
  zh-CN: 扩展菜单
  en-US: Custom dropdown
---

## zh-CN

使用 `dropdownRender` 对下拉菜单进行自由扩展。

## en-US

Customize the dropdown menu via `dropdownRender`.

</docs>

<template>
  <xy-select
    v-model:value="value"
    placeholder="custom dropdown render"
    style="width: 300px"
    :options="items.map(item => ({ value: item }))"
  >
    <template #dropdownRender="{ menuNode: menu }">
      <v-nodes :vnodes="menu" />
      <xy-divider style="margin: 4px 0" />
      <xy-space style="padding: 4px 8px">
        <xy-input ref="inputRef" v-model:value="name" placeholder="Please enter item" />
        <xy-button type="text" @click="addItem">
          <template #icon>
            <plus-outlined />
          </template>
          Add item
        </xy-button>
      </xy-space>
    </template>
  </xy-select>
</template>
<script lang="ts" setup>
import { PlusOutlined } from '@ant-design/icons-vue';
import { defineComponent, ref } from 'vue';

const VNodes = defineComponent({
  props: {
    vnodes: {
      type: Object,
      required: true,
    },
  },
  render() {
    return this.vnodes;
  },
});

let index = 0;
const items = ref(['jack', 'lucy']);
const value = ref();
const inputRef = ref();
const name = ref();

const addItem = e => {
  e.preventDefault();
  console.log('addItem');
  items.value.push(name.value || `New item ${(index += 1)}`);
  name.value = '';
  setTimeout(() => {
    inputRef.value?.focus();
  }, 0);
};
</script>

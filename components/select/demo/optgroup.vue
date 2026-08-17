<docs>
---
order: 7
title:
  zh-CN: 分组
  en-US: Option Group
---

## zh-CN

用 `OptGroup` 或 `options.options` 进行选项分组。

## en-US

Using `OptGroup` or `options.options` to group the options.

</docs>

<template>
  <xy-space>
    <xy-select v-model:value="value" style="width: 200px" @change="handleChange">
      <xy-select-opt-group>
        <template #label>
          <span>
            <user-outlined />
            Manager
          </span>
        </template>
        <xy-select-option value="jack">Jack</xy-select-option>
        <xy-select-option value="lucy">Lucy</xy-select-option>
      </xy-select-opt-group>
      <xy-select-opt-group label="Engineer">
        <xy-select-option value="Yiminghe">yiminghe</xy-select-option>
        <xy-select-option value="Yiminghe1">yiminghe1</xy-select-option>
      </xy-select-opt-group>
    </xy-select>
    <xy-select
      v-model:value="value"
      :options="options"
      style="width: 200px"
      @change="handleChange"
    ></xy-select>
  </xy-space>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { UserOutlined } from '@ant-design/icons-vue';
import type { SelectProps } from 'ant-design-vue';

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};

const options = ref<SelectProps['options']>([
  {
    label: 'Manager',
    options: [
      {
        value: 'jack',
        label: 'Jack',
      },
      {
        value: 'lucy',
        label: 'Lucy',
      },
    ],
  },
  {
    label: 'Engineer',
    options: [
      {
        value: 'yiminghe',
        label: 'Yiminghe',
      },
    ],
  },
]);

const value = ref(['lucy']);
</script>

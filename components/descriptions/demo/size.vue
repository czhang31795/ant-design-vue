<docs>
---
order: 2
title:
  zh-CN: 自定义尺寸
  en-US: Custom Size
---

## zh-CN

自定义尺寸，适应在各种容器中展示。

## en-US

Custom sizes to fit in a variety of containers.

</docs>

<template>
  <div>
    <xy-radio-group v-model:value="size" @change="onChange">
      <xy-radio value="default">default</xy-radio>
      <xy-radio value="middle">middle</xy-radio>
      <xy-radio value="small">small</xy-radio>
    </xy-radio-group>
    <br />
    <br />
    <xy-descriptions bordered title="Custom Size" :size="size">
      <template #extra>
        <xy-button type="primary">Edit</xy-button>
      </template>
      <xy-descriptions-item label="Product">Cloud Database</xy-descriptions-item>
      <xy-descriptions-item label="Billing">Prepaid</xy-descriptions-item>
      <xy-descriptions-item label="Time">18:00:00</xy-descriptions-item>
      <xy-descriptions-item label="Amount">$80.00</xy-descriptions-item>
      <xy-descriptions-item label="Discount">$20.00</xy-descriptions-item>
      <xy-descriptions-item label="Official">$60.00</xy-descriptions-item>
      <xy-descriptions-item label="Config Info">
        Data disk type: MongoDB
        <br />
        Database version: 3.4
        <br />
        Package: dds.mongo.mid
        <br />
        Storage space: 10 GB
        <br />
        Replication factor: 3
        <br />
        Region: East China 1
        <br />
      </xy-descriptions-item>
    </xy-descriptions>
    <br />
    <br />
    <xy-descriptions title="Custom Size" :size="size">
      <template #extra>
        <xy-button type="primary">Edit</xy-button>
      </template>
      <xy-descriptions-item label="Product">Cloud Database</xy-descriptions-item>
      <xy-descriptions-item label="Billing">Prepaid</xy-descriptions-item>
      <xy-descriptions-item label="Time">18:00:00</xy-descriptions-item>
      <xy-descriptions-item label="Amount">$80.00</xy-descriptions-item>
      <xy-descriptions-item label="Discount">$20.00</xy-descriptions-item>
      <xy-descriptions-item label="Official">$60.00</xy-descriptions-item>
    </xy-descriptions>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import type { DescriptionsProps } from 'ant-design-vue';
const size = ref<DescriptionsProps['size']>('default');
const onChange = (e: any) => {
  console.log('size checked', e.target.value);
  size.value = e.target.value;
};
</script>

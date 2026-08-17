<docs>
---
order: 3
title: 
  zh-CN: 响应式
  en-US: Responsive
---

## zh-CN

通过响应式的配置可以实现在小屏幕设备上的完美呈现。

## en-US

Responsive configuration enables perfect presentation on small screen devices.

</docs>

<template>
  <xy-descriptions
    title="Responsive Descriptions"
    bordered
    :column="{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }"
  >
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
    </xy-descriptions-item>
  </xy-descriptions>
</template>

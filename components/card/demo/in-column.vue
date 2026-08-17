<docs>
---
order: 4
title:
  zh-CN: 栅格卡片
  en-US: Card in column
---

## zh-CN

在系统概览页面常常和栅格进行配合。

## en-US

Cards usually cooperate with grid column layout in overview page.

</docs>

<template>
  <div style="background-color: #ececec; padding: 20px">
    <xy-row :gutter="16">
      <xy-col :span="8">
        <xy-card title="Card title" :bordered="false">
          <p>card content</p>
        </xy-card>
      </xy-col>
      <xy-col :span="8">
        <xy-card title="Card title" :bordered="false">
          <p>card content</p>
        </xy-card>
      </xy-col>
      <xy-col :span="8">
        <xy-card title="Card title" :bordered="false">
          <p>card content</p>
        </xy-card>
      </xy-col>
    </xy-row>
  </div>
</template>

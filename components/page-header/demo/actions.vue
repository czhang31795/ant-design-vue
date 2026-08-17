<docs>
---
order: 5
title:
  zh-CN: 多种形态的 PageHeader
  en-US: Various forms of PageHeader
---

## zh-CN

使用操作区，并自定义子节点，适合使用在需要展示一些复杂的信息，帮助用户快速了解这个页面的信息和操作。

## en-US

Use the operating area and customize the sub-nodes, suitable for use in the need to display some complex information to help users quickly understand the information and operations of this page.

</docs>

<template>
  <div>
    <xy-page-header
      class="demo-page-header"
      style="border: 1px solid rgb(235, 237, 240)"
      title="Title"
      sub-title="This is a subtitle"
      @back="() => $router.go(-1)"
    >
      <template #extra>
        <xy-button key="3">Operation</xy-button>
        <xy-button key="2">Operation</xy-button>
        <xy-button key="1" type="primary">Primary</xy-button>
      </template>
      <xy-descriptions size="small" :column="3">
        <xy-descriptions-item label="Created">Lili Qu</xy-descriptions-item>
        <xy-descriptions-item label="Association">
          <a>421421</a>
        </xy-descriptions-item>
        <xy-descriptions-item label="Creation Time">2017-01-10</xy-descriptions-item>
        <xy-descriptions-item label="Effective Time">2017-10-10</xy-descriptions-item>
        <xy-descriptions-item label="Remarks">
          Gonghu Road, Xihu District, Hangzhou, Zhejiang, China
        </xy-descriptions-item>
      </xy-descriptions>
    </xy-page-header>
    <br />
    <xy-page-header title="Title" sub-title="This is a subtitle" @back="() => $router.go(-1)">
      <template #tags>
        <xy-tag color="blue">Running</xy-tag>
      </template>
      <template #extra>
        <xy-button key="3">Operation</xy-button>
        <xy-button key="2">Operation</xy-button>
        <xy-button key="1" type="primary">Primary</xy-button>
      </template>
      <xy-row type="flex">
        <xy-statistic title="Status" value="Pending" />
        <xy-statistic
          title="Price"
          prefix="$"
          :value="568.08"
          :style="{
            margin: '0 32px',
          }"
        />
        <xy-statistic title="Balance" prefix="$" :value="3345.08" />
      </xy-row>
    </xy-page-header>
  </div>
</template>
<style scoped>
.demo-page-header :deep(tr:last-child td) {
  padding-bottom: 0;
}
</style>

<docs>
---
order: 0
title:
  zh-CN: Success
  en-US: Success
---

## zh-CN

成功的结果。

## en-US

Show successful results.

</docs>

<template>
  <xy-result
    status="success"
    title="Successfully Purchased Cloud Server ECS!"
    sub-title="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
  >
    <template #extra>
      <xy-button key="console" type="primary">Go Console</xy-button>
      <xy-button key="buy">Buy Again</xy-button>
    </template>
  </xy-result>
</template>

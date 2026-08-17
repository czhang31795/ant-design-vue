<docs>
---
order: 6
title:
  zh-CN: Error
  en-US: Error
---

## zh-CN

复杂的错误反馈。

## en-US

Complex error feedback.

</docs>

<template>
  <xy-result
    status="error"
    title="Submission Failed"
    sub-title="Please check and modify the following information before resubmitting."
  >
    <template #extra>
      <xy-button key="console" type="primary">Go Console</xy-button>
      <xy-button key="buy">Buy Again</xy-button>
    </template>

    <div class="desc">
      <p style="font-size: 16px">
        <strong>The content you submitted has the following error:</strong>
      </p>
      <p>
        <close-circle-outlined :style="{ color: 'red' }" />
        Your account has been frozen
        <a>Thaw immediately &gt;</a>
      </p>
      <p>
        <close-circle-outlined :style="{ color: 'red' }" />
        Your account is not yet eligible to apply
        <a>Apply Unlock &gt;</a>
      </p>
    </div>
  </xy-result>
</template>
<script lang="ts" setup>
import { CloseCircleOutlined } from '@ant-design/icons-vue';
</script>
<style scoped>
.desc p {
  margin-bottom: 1em;
}
</style>

<docs>
---
order: 0
title:
  zh-CN: 基本用法
  en-US: Basic Usage
---

## zh-CN

相邻组件水平间距。


## en-US

Crowded components horizontal spacing.

</docs>

<template>
  <xy-space>
    Space
    <xy-button type="primary">Button</xy-button>
    <xy-upload>
      <xy-button>
        <UploadOutlined />
        Click to Upload
      </xy-button>
    </xy-upload>
    <xy-popconfirm title="Are you sure delete this task?" ok-text="Yes" cancel-text="No">
      <xy-button>Confirm</xy-button>
    </xy-popconfirm>
  </xy-space>
</template>
<script lang="ts" setup>
import { UploadOutlined } from '@ant-design/icons-vue';
</script>

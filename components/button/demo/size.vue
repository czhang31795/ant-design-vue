<docs>
---
order: 2
title:
  zh-CN: 按钮尺寸
  en-US: Size
---

## zh-CN

按钮有大、中、小三种尺寸。

通过设置 `size` 为 `large` `small` 分别把按钮设为大、小尺寸。若不设置 `size`，则尺寸为中。

## en-US

Ant Design supports a default button size as well as a large and small size.

If a large or small button is desired, set the `size` property to either `large` or `small` respectively. Omit the `size` property for a button with the default size.
</docs>

<template>
  <xy-space direction="vertical">
    <xy-radio-group v-model:value="size">
      <xy-radio-button value="large">Large</xy-radio-button>
      <xy-radio-button value="default">Default</xy-radio-button>
      <xy-radio-button value="small">Small</xy-radio-button>
    </xy-radio-group>
    <xy-space>
      <xy-button type="primary" :size="size">Primary</xy-button>
      <xy-button :size="size">Normal</xy-button>
      <xy-button type="dashed" :size="size">Dashed</xy-button>
      <xy-button danger :size="size">Danger</xy-button>
      <xy-button type="link" :size="size">Link</xy-button>
    </xy-space>
    <xy-space>
      <xy-button type="primary" :size="size">
        <template #icon>
          <DownloadOutlined />
        </template>
      </xy-button>
      <xy-button type="primary" shape="circle" :size="size">
        <template #icon>
          <DownloadOutlined />
        </template>
      </xy-button>
      <xy-button type="primary" shape="round" :size="size">
        <template #icon>
          <DownloadOutlined />
        </template>
        Download
      </xy-button>
      <xy-button type="primary" shape="round" :size="size">
        <template #icon>
          <DownloadOutlined />
        </template>
      </xy-button>
      <xy-button type="primary" :size="size">
        <template #icon>
          <DownloadOutlined />
        </template>
        Download
      </xy-button>
    </xy-space>
  </xy-space>
</template>
<script lang="ts" setup>
import { DownloadOutlined } from '@ant-design/icons-vue';
import type { SizeType } from 'ant-design-vue/es/config-provider';
import { ref } from 'vue';
const size = ref<SizeType>('large');
</script>

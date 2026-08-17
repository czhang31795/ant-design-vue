<docs>
---
order: 1
title:
  zh-CN: 颜色与变体
  en-US: Color & Variant
---

## zh-CN

同时设置 `color` 和 `variant` 属性，可以衍生出更多的变体按钮。

## en-US

You can set `color` and `variant` props at the same time to achieve different button combinations.

</docs>

<template>
  <xy-flex vertical gap="small">
    <xy-flex wrap="wrap" gap="small">
      <xy-button
        v-for="variant in variants"
        :key="`default-${variant}`"
        color="default"
        :variant="variant"
      >
        {{ capitalize(variant) }}
      </xy-button>
    </xy-flex>
    <xy-flex wrap="wrap" gap="small">
      <xy-button
        v-for="variant in variants"
        :key="`primary-${variant}`"
        color="primary"
        :variant="variant"
      >
        {{ capitalize(variant) }}
      </xy-button>
    </xy-flex>
    <xy-flex wrap="wrap" gap="small">
      <xy-button
        v-for="variant in variants"
        :key="`danger-${variant}`"
        color="danger"
        :variant="variant"
      >
        {{ capitalize(variant) }}
      </xy-button>
    </xy-flex>
    <xy-flex wrap="wrap" gap="small">
      <xy-button
        v-for="variant in variants"
        :key="`pink-${variant}`"
        color="pink"
        :variant="variant"
      >
        {{ capitalize(variant) }}
      </xy-button>
    </xy-flex>
    <xy-flex wrap="wrap" gap="small">
      <xy-button
        v-for="variant in variants"
        :key="`purple-${variant}`"
        color="purple"
        :variant="variant"
      >
        {{ capitalize(variant) }}
      </xy-button>
    </xy-flex>
    <xy-flex wrap="wrap" gap="small">
      <xy-button
        v-for="variant in variants"
        :key="`cyan-${variant}`"
        color="cyan"
        :variant="variant"
      >
        {{ capitalize(variant) }}
      </xy-button>
    </xy-flex>
  </xy-flex>
</template>

<script lang="ts" setup>
const variants = ['solid', 'outlined', 'dashed', 'filled', 'text', 'link'] as const;

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
</script>

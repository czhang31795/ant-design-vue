<docs>
---
order: 8
title:
  zh-CN: 大小
  en-US: Size
---

## zh-CN

大中小三种组合，可以和表单输入框进行对应配合。

## en-US

There are three sizes available: large, medium, and small. It can coordinate with input box.

</docs>
<template>
  <div>
    <div>
      <xy-radio-group v-model:value="value1" size="large">
        <xy-radio-button value="a">Hangzhou</xy-radio-button>
        <xy-radio-button value="b">Shanghai</xy-radio-button>
        <xy-radio-button value="c">Beijing</xy-radio-button>
        <xy-radio-button value="d">Chengdu</xy-radio-button>
      </xy-radio-group>
    </div>
    <div :style="{ marginTop: '16px' }">
      <xy-radio-group v-model:value="value2">
        <xy-radio-button value="a">Hangzhou</xy-radio-button>
        <xy-radio-button value="b">Shanghai</xy-radio-button>
        <xy-radio-button value="c">Beijing</xy-radio-button>
        <xy-radio-button value="d">Chengdu</xy-radio-button>
      </xy-radio-group>
    </div>
    <div :style="{ marginTop: '16px' }">
      <xy-radio-group v-model:value="value3" size="small">
        <xy-radio-button value="a">Hangzhou</xy-radio-button>
        <xy-radio-button value="b">Shanghai</xy-radio-button>
        <xy-radio-button value="c">Beijing</xy-radio-button>
        <xy-radio-button value="d">Chengdu</xy-radio-button>
      </xy-radio-group>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const value1 = ref<string>('a');
const value2 = ref<string>('a');
const value3 = ref<string>('a');
</script>

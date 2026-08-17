<docs>
---
order: 14.1
title:
  zh-CN: 选择人员
  en-US: Select Person
---

## zh-CN

使用封装好的 `PersonSelect`（模板中为 `a-person-select`），下拉项与回填内容同时展示头像和姓名。也可通过 `Select.PersonSelect` 访问。

全量引入后可直接使用标签；按需引入时：

```ts
import { PersonSelect } from '@czxingyu/ant-design-vue';
```

## en-US

Use `PersonSelect` (`a-person-select` in template) to show avatar and name in both dropdown options and the selected value. Also available as `Select.PersonSelect`.

After full import you can use the tag directly; for on-demand import:

```ts
import { PersonSelect } from '@czxingyu/ant-design-vue';
```

</docs>

<template>
  <xy-space direction="vertical" style="width: 100%" :size="16">
    <div>
      <div class="demo-label">单选</div>
      <xy-person-select v-model:value="singleValue" style="width: 100%" :options="personOptions" />
    </div>

    <div>
      <div class="demo-label">多选</div>
      <xy-person-select
        v-model:value="multipleValue"
        mode="multiple"
        style="width: 100%"
        :options="personOptions"
      />
    </div>
  </xy-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const personOptions = [
  {
    value: 'zhangsan',
    label: '张三',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
  },
  {
    value: 'lisi',
    label: '李四',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/cnrhVkzwxjPwAaCfPbdc.png',
  },
  {
    value: 'wangwu',
    label: '王五',
    avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
  },
  {
    value: 'zhaoliu',
    label: '赵六',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/gaOngJwsRYRaVAuXXcmB.png',
  },
  {
    value: 'qianqi',
    label: '钱七',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ubnKSIfAJTxIgXOKlciN.png',
  },
];

const singleValue = ref('wangwu');
const multipleValue = ref(['zhangsan', 'lisi']);
</script>

<style scoped>
.demo-label {
  margin-bottom: 8px;
  color: rgba(0, 0, 0, 0.65);
}
[data-theme='dark'] .demo-label {
  color: rgba(255, 255, 255, 0.45);
}
</style>

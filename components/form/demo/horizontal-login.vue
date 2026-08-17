<docs>
---
order: 4
title:
  zh-CN: 内联登录栏
  en-US: Inline Login Form
---

## zh-CN

水平登录栏，常用在顶部导航栏中。

## en-US

Inline login form is often used in navigation bar.
</docs>

<template>
  <xy-form
    layout="inline"
    :model="formState"
    @finish="handleFinish"
    @finishFailed="handleFinishFailed"
  >
    <xy-form-item>
      <xy-input v-model:value="formState.user" placeholder="Username">
        <template #prefix><UserOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
      </xy-input>
    </xy-form-item>
    <xy-form-item>
      <xy-input v-model:value="formState.password" type="password" placeholder="Password">
        <template #prefix><LockOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
      </xy-input>
    </xy-form-item>
    <xy-form-item>
      <xy-button
        type="primary"
        html-type="submit"
        :disabled="formState.user === '' || formState.password === ''"
      >
        Log in
      </xy-button>
    </xy-form-item>
  </xy-form>
</template>
<script lang="ts" setup>
import { reactive } from 'vue';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import type { UnwrapRef } from 'vue';
import type { FormProps } from 'ant-design-vue';

interface FormState {
  user: string;
  password: string;
}
const formState: UnwrapRef<FormState> = reactive({
  user: '',
  password: '',
});
const handleFinish: FormProps['onFinish'] = values => {
  console.log(values, formState);
};
const handleFinishFailed: FormProps['onFinishFailed'] = errors => {
  console.log(errors);
};
</script>

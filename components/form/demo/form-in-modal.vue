<docs>
---
order: 14
title:
  zh-CN: 弹出层中的新建表单
  en-US: Form in Modal to Create
---

## zh-CN

当用户访问一个展示了某个列表的页面，想新建一项但又不想跳转页面时，可以用 Modal 弹出一个表单，用户填写必要信息后创建新的项。

## en-US

When user visit a page with a list of items, and want to create a new item. The page can popup a form in Modal, then let user fill in the form to create an item.

</docs>
<template>
  <div>
    <xy-button type="primary" @click="visible = true">New Collection</xy-button>
    <xy-modal
      v-model:open="visible"
      title="Create a new collection"
      ok-text="Create"
      cancel-text="Cancel"
      @ok="onOk"
    >
      <xy-form ref="formRef" :model="formState" layout="vertical" name="form_in_modal">
        <xy-form-item
          name="title"
          label="Title"
          :rules="[{ required: true, message: 'Please input the title of collection!' }]"
        >
          <xy-input v-model:value="formState.title" />
        </xy-form-item>
        <xy-form-item name="description" label="Description">
          <xy-textarea v-model:value="formState.description" />
        </xy-form-item>
        <xy-form-item name="modifier" class="collection-create-form_last-form-item">
          <xy-radio-group v-model:value="formState.modifier">
            <xy-radio value="public">Public</xy-radio>
            <xy-radio value="private">Private</xy-radio>
          </xy-radio-group>
        </xy-form-item>
      </xy-form>
    </xy-modal>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref, toRaw } from 'vue';
import type { FormInstance } from 'ant-design-vue';

interface Values {
  title: string;
  description: string;
  modifier: string;
}

const formRef = ref<FormInstance>();
const visible = ref(false);
const formState = reactive<Values>({
  title: '',
  description: '',
  modifier: 'public',
});

const onOk = () => {
  formRef.value
    .validateFields()
    .then(values => {
      console.log('Received values of form: ', values);
      console.log('formState: ', toRaw(formState));
      visible.value = false;
      formRef.value.resetFields();
      console.log('reset formState: ', toRaw(formState));
    })
    .catch(info => {
      console.log('Validate Failed:', info);
    });
};
</script>
<style scoped>
.collection-create-form_last-form-item {
  margin-bottom: 0;
}
</style>

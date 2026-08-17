<docs>
---
order: 6
title:
  zh-CN: 信息预览抽屉
  en-US: Preview drawer
---

## zh-CN

需要快速预览对象概要时使用，点击遮罩区关闭。

## en-US

Use Drawer to quickly preview details of an object, such as those in a list.

</docs>

<template>
  <xy-list
    :data-source="[
      {
        name: 'Lily',
      },
      {
        name: 'Lily',
      },
    ]"
    bordered
  >
    <template #renderItem="{ item }">
      <xy-list-item :key="`a-${item.id}`">
        <template #actions><a @click="showDrawer">View Profile</a></template>
        <xy-list-item-meta description="Progresser XTech">
          <template #title>
            <a href="https://www.antdv.com/">{{ item.name }}</a>
          </template>
          <template #avatar>
            <xy-avatar src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" />
          </template>
        </xy-list-item-meta>
      </xy-list-item>
    </template>
  </xy-list>
  <xy-drawer width="640" placement="right" :closable="false" :open="open" @close="onClose">
    <p :style="[pStyle, pStyle2]">User Profile</p>
    <p :style="pStyle">Personal</p>
    <xy-row>
      <xy-col :span="12">
        <description-item title="Full Name" content="Lily" />
      </xy-col>
      <xy-col :span="12">
        <description-item title="Account" content="AntDesign@example.com" />
      </xy-col>
    </xy-row>
    <xy-row>
      <xy-col :span="12">
        <description-item title="City" content="HangZhou" />
      </xy-col>
      <xy-col :span="12">
        <description-item title="Country" content="China🇨🇳" />
      </xy-col>
    </xy-row>
    <xy-row>
      <xy-col :span="12">
        <description-item title="Birthday" content="February 2,1900" />
      </xy-col>
      <xy-col :span="12">
        <description-item title="Website" content="-" />
      </xy-col>
    </xy-row>
    <xy-row>
      <xy-col :span="12">
        <description-item
          title="Message"
          content="Make things as simple as possible but no simpler."
        />
      </xy-col>
    </xy-row>
    <xy-divider />
    <p :style="pStyle">Company</p>
    <xy-row>
      <xy-col :span="12">
        <description-item title="Position" content="Programmer" />
      </xy-col>
      <xy-col :span="12">
        <description-item title="Responsibilities" content="Coding" />
      </xy-col>
    </xy-row>
    <xy-row>
      <xy-col :span="12">
        <description-item title="Department" content="XTech" />
      </xy-col>
      <xy-col :span="12">
        <description-item title="Supervisor">
          <template #content><a>Lin</a></template>
        </description-item>
      </xy-col>
    </xy-row>
    <xy-row>
      <xy-col :span="24">
        <description-item
          title="Skills"
          content="C / C + +, data structures, software engineering, operating systems, computer networks, databases, compiler theory, computer architecture, Microcomputer Principle and Interface Technology, Computer English, Java, ASP, etc."
        />
      </xy-col>
    </xy-row>
    <xy-divider />
    <p :style="pStyle">Contacts</p>
    <xy-row>
      <xy-col :span="12">
        <description-item title="Email" content="ant-design-vue@example.com" />
      </xy-col>
      <xy-col :span="12">
        <description-item title="Phone Number" content="+86 181 0000 0000" />
      </xy-col>
    </xy-row>
    <xy-row>
      <xy-col :span="24">
        <description-item title="Github">
          <template #content>
            <a href="https://github.com/vueComponent/ant-design-vue">
              github.com/vueComponent/ant-design-vue
            </a>
          </template>
        </description-item>
      </xy-col>
    </xy-row>
  </xy-drawer>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import descriptionItem from './descriptionItem/index.vue';
const open = ref<boolean>(false);
const pStyle = {
  fontSize: '16px',
  color: 'rgba(0,0,0,0.85)',
  lineHeight: '24px',
  display: 'block',
  marginBottom: '16px',
};
const pStyle2 = {
  marginBottom: '24px',
};

const showDrawer = () => {
  open.value = true;
};
const onClose = () => {
  open.value = false;
};
</script>

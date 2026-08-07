<template>
  <template v-if="iframeName === 'fixed-sider'">
    <FixedSider />
  </template>
  <template v-else-if="iframeName === 'fixed-header'">
    <Fixed />
  </template>
  <template v-else-if="iframeName === 'sider'">
    <Side />
  </template>
  <template v-else-if="iframeName === 'nav-side'">
    <NavSide />
  </template>
  <template v-else-if="iframeName === 'nav-top'">
    <NavTop />
  </template>
  <template v-else-if="iframeName === 'nav-mix'">
    <NavMix />
  </template>
  <template v-else-if="iframeName === 'nav-pro'">
    <NavPro />
  </template>
  <demo-sort v-else :cols="1">
    <basic />
    <top />
    <top-side2 />
    <top-side />
    <Side />
    <custom-trigger />
    <responsive />
    <FixedSider />
    <Fixed />
    <NavSide />
    <NavTop />
    <NavMix />
    <NavPro />
  </demo-sort>
</template>

<script>
import Basic from './basic.vue';
import CustomTrigger from './custom-trigger.vue';
import Responsive from './responsive.vue';
import TopSide2 from './top-side-2.vue';
import TopSide from './top-side.vue';
import Top from './top.vue';
import FixedSider from './fixed-sider.vue';
import Fixed from './fixed.vue';
import Side from './side.vue';
import NavSide from './nav-side.vue';
import NavTop from './nav-top.vue';
import NavMix from './nav-mix.vue';
import NavPro from './nav-pro.vue';

import CN from '../index.zh-CN.md';
import US from '../index.en-US.md';
import { defineComponent, provide } from 'vue';

export default defineComponent({
  CN,
  US,
  components: {
    Basic,
    CustomTrigger,
    Responsive,
    TopSide2,
    TopSide,
    Top,
    FixedSider,
    Fixed,
    Side,
    NavSide,
    NavTop,
    NavMix,
    NavPro,
  },
  props: {
    iframeName: String,
  },
  setup(props) {
    provide(
      'iframeDemo',
      !props.iframeName
        ? {
            'fixed-sider': '/iframe/layout/#fixed-sider',
            'fixed-header': '/iframe/layout/#fixed-header',
            sider: '/iframe/layout/#sider',
            'nav-side': '/iframe/layout/#nav-side',
            'nav-top': '/iframe/layout/#nav-top',
            'nav-mix': '/iframe/layout/#nav-mix',
            'nav-pro': '/iframe/layout/#nav-pro',
          }
        : {},
    );
  },
});
</script>

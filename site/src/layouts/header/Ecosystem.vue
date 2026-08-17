<template>
  <xy-menu class="ecosystem">
    <xy-menu-item-group key="ecosystem" :title="$t('app.header.menu.ecosystem')">
      <xy-menu-item key="pro">
        <a target="_blank" href="https://pro.antdv.com">Pro For Vue2(Free)</a>
      </xy-menu-item>
      <xy-menu-item key="vip">
        <a target="_blank" href="https://store.antdv.com/pro">Pro For Vue3(VIP)</a>
      </xy-menu-item>
      <xy-menu-item key="design">
        <router-link :to="getLocalizedPathname('/docs/vue/download/', isZhCN)">
          {{ isZhCN ? '设计资源' : 'Design Resources' }}
        </router-link>
      </xy-menu-item>
      <!-- <xy-menu-item key="vscode">
        <a
          target="_blank"
          href="https://marketplace.visualstudio.com/items?itemName=ant-design-vue.vscode-ant-design-vue-helper"
        >
          VS Code Extension
        </a>
      </xy-menu-item> -->
      <xy-menu-item key="awesome">
        <a target="_blank" href="https://github.com/vueComponent/ant-design-vue-awesome">Awesome</a>
      </xy-menu-item>
      <xy-menu-item key="qq1">
        <a>QQ 1群(217490093) 已满</a>
      </xy-menu-item>
      <xy-menu-item key="qq2">
        <a>QQ 2群(809774695) 已满</a>
      </xy-menu-item>
      <xy-menu-item key="qq3">
        <a>QQ 3群(927828249)</a>
      </xy-menu-item>
    </xy-menu-item-group>
  </xy-menu>
</template>
<script lang="ts">
import { computed, defineComponent, inject } from 'vue';
import type { GlobalConfig } from '../../type';
import { GLOBAL_CONFIG } from '../../SymbolKey';
import { getLocalizedPathname } from '../../utils/util';

export default defineComponent({
  props: {
    isRTL: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const downstyle = computed(() => (props.isRTL ? '-1px 2px 0 0' : '-1px 0 0 2px'));
    return {
      downstyle,
      isZhCN: inject<GlobalConfig>(GLOBAL_CONFIG).isZhCN.value,
      getLocalizedPathname,
    };
  },
});
</script>
<style scoped>
.ecosystem a {
  color: rgba(0, 0, 0, 0.65);
}
</style>

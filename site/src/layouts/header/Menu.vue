<template>
  <Navigation @langChange="onLangChange" />
  <template v-if="!isMobile">
    <a-button
      key="lang-button"
      size="small"
      class="header-button header-lang-button"
      @click="onLangChange"
    >
      {{ $t('app.header.lang') }}
    </a-button>
    <Github />
  </template>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import Github from './Github.vue';
import Navigation from './Navigation.vue';
import { isZhCN, getLocalizedPathname } from '../../utils/util';
export default defineComponent({
  name: 'HeaderMenu',
  components: {
    Navigation,
    Github,
  },
  props: ['isMobile'],
  setup() {
    const onLangChange = () => {
      const {
        location: { pathname },
      } = window;
      const currentProtocol = `${window.location.protocol}//`;
      const currentHref = window.location.href.substring(currentProtocol.length);

      localStorage.setItem('locale', isZhCN(pathname) ? 'en-US' : 'zh-CN');

      window.location.href =
        currentProtocol +
        currentHref.replace(
          window.location.pathname,
          getLocalizedPathname(pathname, !isZhCN(pathname)).path,
        );
    };

    return {
      onLangChange,
    };
  },
});
</script>
<style lang="less" scoped></style>

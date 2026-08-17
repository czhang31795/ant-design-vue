<template>
  <section class="markdown">
    <h1>{{ isZhCN ? '组件总览' : 'Overview' }}</h1>
    <section class="markdown">
      <p>
        <code>ant-design-vue</code>
        {{
          isZhCN
            ? '为 Web 应用提供了丰富的基础 UI 组件，我们还将持续探索企业级应用的最佳 UI 实践。'
            : 'provides plenty of UI components to enrich your web applications, and we will improve components experience consistently. '
        }}
      </p>
    </section>
    <xy-divider></xy-divider>
    <xy-affix :offset-top="32" @change="handleAffixChange">
      <div
        class="components-overview-affix"
        :class="{ 'components-overview-affixed': searchBarAffixed }"
      >
        <xy-input
          ref="inputRef"
          v-model:value="search"
          :placeholder="$t('app.components.overview.search')"
          class="components-overview-search"
          auto-focus
          :style="{ fontSize: searchBarAffixed ? '18px' : '' }"
        >
          <template #suffix>
            <SearchOutlined />
          </template>
        </xy-input>
      </div>
    </xy-affix>
    <xy-divider></xy-divider>
    <template v-for="group in menuItems" :key="group.title">
      <div class="components-overview">
        <h2 class="xy-typography components-overview-group-title">
          <xy-space align="center">
            {{ isZhCN ? group.title : group.enTitle }}
            <xy-tag style="display: block">{{ group.children.length }}</xy-tag>
          </xy-space>
        </h2>
        <xy-row :gutter="[24, 24]">
          <template v-for="component in group.children" :key="component.title">
            <xy-col :xs="24" :sm="12" :lg="8" :xl="6">
              <component
                :is="component.target ? 'a' : 'router-link'"
                v-bind="
                  component.target
                    ? { href: component.path, target: component.target }
                    : { to: getLocalizedPathname(component.path, isZhCN) }
                "
              >
                <xy-card size="small" class="components-overview-card">
                  <template #title>
                    <div class="components-overview-title">
                      {{ component.title }}
                      {{ isZhCN ? component.subtitle : '' }}
                    </div>
                  </template>
                  <div class="components-overview-img">
                    <img
                      :src="isDark && component.coverDark ? component.coverDark : component.cover"
                      :alt="component.title"
                    />
                  </div>
                </xy-card>
              </component>
            </xy-col>
          </template>
        </xy-row>
      </div>
    </template>
  </section>
</template>
<script lang="ts">
import type { GlobalConfig } from '../type';
import { computed, defineComponent, inject, onMounted, ref } from 'vue';
import { SearchOutlined } from '@ant-design/icons-vue';
import { GLOBAL_CONFIG } from '../SymbolKey';
import useMenus from '../hooks/useMenus';
import { getLocalizedPathname } from '../utils/util';
export default defineComponent({
  name: 'ComponentOverview',
  components: {
    SearchOutlined,
  },
  setup() {
    const globalConfig = inject<GlobalConfig>(GLOBAL_CONFIG);
    const themeMode = inject('themeMode');
    const isDark = computed<boolean>(() => (themeMode as any).theme.value === 'dark');
    const search = ref('');
    const inputRef = ref();
    const { dataSource } = useMenus();

    const searchBarAffixed = ref(false);
    function handleAffixChange(affixed?: boolean) {
      searchBarAffixed.value = affixed;
    }

    const menuItems = computed(() => {
      return dataSource.value
        .filter(i => i.order > -1)
        .map(group => {
          const components = group.children.filter(
            (component: any) =>
              !search.value.trim() ||
              component.title.toLowerCase().includes(search.value.trim().toLowerCase()) ||
              (component.subtitle || '').toLowerCase().includes(search.value.trim().toLowerCase()),
          );
          return { ...group, children: components };
        })
        .filter(i => i.children.length);
    });
    onMounted(() => {
      inputRef.value.focus();
    });
    return {
      globalConfig,
      search,
      menuItems,
      getLocalizedPathname,
      inputRef,
      isZhCN: globalConfig?.isZhCN,
      isDark,
      searchBarAffixed,
      handleAffixChange,
    };
  },
});
</script>
<style lang="less" src="./ComponentOverview.less"></style>

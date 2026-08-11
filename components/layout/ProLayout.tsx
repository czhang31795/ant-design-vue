import type { App, ExtractPropTypes, PropType, VNodeChild } from 'vue';
import { computed, defineComponent, ref, watch } from 'vue';
import LeftOutlined from '@ant-design/icons-vue/LeftOutlined';
import RightOutlined from '@ant-design/icons-vue/RightOutlined';
import type { ItemType, MenuProps } from '../menu';
import { booleanType, someType, stringType } from '../_util/type';
import initDefaultProps from '../_util/props-util/initDefaultProps';
import Layout, { Header, Content, Footer } from './layout';
import Sider from './Sider';
import Menu from '../menu';
import Breadcrumb from '../breadcrumb';
import './style/pro-layout.css';

export type ProLayoutMode = 'side' | 'top' | 'mix';

export type ProLayoutBreadcrumbItem = {
  title: VNodeChild | string;
  path?: string;
};

type MenuNode = {
  key?: string | number;
  label?: any;
  title?: any;
  icon?: any;
  children?: MenuNode[];
  type?: string;
};

const isMenuNode = (item: ItemType | null | undefined): item is MenuNode =>
  !!item && typeof item === 'object' && !('type' in item && (item as MenuNode).type === 'divider');

const getItemKey = (item: MenuNode) => (item.key !== undefined ? String(item.key) : undefined);

const findMenuNode = (items: ItemType[] = [], key?: string): MenuNode | undefined => {
  if (!key) return undefined;
  for (const raw of items) {
    if (!isMenuNode(raw)) continue;
    if (getItemKey(raw) === key) return raw;
    if (raw.children?.length) {
      const found = findMenuNode(raw.children as ItemType[], key);
      if (found) return found;
    }
  }
  return undefined;
};

const findTopKeyBySelected = (items: ItemType[] = [], selectedKey?: string): string | undefined => {
  if (!selectedKey) return undefined;
  for (const raw of items) {
    if (!isMenuNode(raw)) continue;
    const key = getItemKey(raw);
    if (!key) continue;
    if (key === selectedKey) return key;
    if (raw.children?.length && findMenuNode(raw.children as ItemType[], selectedKey)) {
      return key;
    }
  }
  return undefined;
};

const getFirstSelectableKey = (item?: MenuNode): string | undefined => {
  if (!item) return undefined;
  if (item.children?.length) {
    for (const child of item.children) {
      if (!isMenuNode(child)) continue;
      const nested = getFirstSelectableKey(child);
      if (nested) return nested;
    }
  }
  return getItemKey(item);
};

const toTopMenus = (items: ItemType[] = []): ItemType[] =>
  items.reduce<ItemType[]>((result, raw) => {
    if (!isMenuNode(raw)) {
      result.push(raw);
      return result;
    }
    const { children: _children, ...rest } = raw;
    result.push(rest as ItemType);
    return result;
  }, []);

const proLayoutProps = () => ({
  layout: stringType<ProLayoutMode>('side'),
  title: stringType('Ant Design Pro'),
  logo: stringType('https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg'),
  collapsed: booleanType(),
  menu: someType<ItemType[]>([Array], []),
  selectedKeys: someType<string[]>([Array]),
  openKeys: someType<string[]>([Array]),
  siderWidth: someType<number>([Number], 208),
  headerTitle: stringType(),
  pageTitle: stringType(),
  breadcrumb: someType<ProLayoutBreadcrumbItem[]>([Array]),
  splitMenus: booleanType(true),
  'onUpdate:collapsed': Function as PropType<(v: boolean) => void>,
  'onUpdate:selectedKeys': Function as PropType<(v: string[]) => void>,
  'onUpdate:openKeys': Function as PropType<(v: string[]) => void>,
  onMenuClick: Function as PropType<MenuProps['onClick']>,
});

export type ProLayoutProps = Partial<ExtractPropTypes<ReturnType<typeof proLayoutProps>>>;

const ProLayout = defineComponent({
  name: 'AProLayout',
  inheritAttrs: false,
  props: initDefaultProps(proLayoutProps(), {
    layout: 'side',
    title: 'Ant Design Pro',
    logo: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
    siderWidth: 208,
    menu: [],
    splitMenus: true,
  }),
  setup(props, { attrs, slots, emit }) {
    const innerCollapsed = ref(!!props.collapsed);
    watch(
      () => props.collapsed,
      val => {
        if (val !== undefined) {
          innerCollapsed.value = !!val;
        }
      },
    );
    const mergedCollapsed = computed({
      get: () => (props.collapsed !== undefined ? !!props.collapsed : innerCollapsed.value),
      set: (val: boolean) => {
        innerCollapsed.value = val;
        emit('update:collapsed', val);
      },
    });

    const innerSelectedKeys = ref<string[]>([]);
    const selectedKeys = computed({
      get: () => props.selectedKeys || innerSelectedKeys.value,
      set: (val: string[]) => {
        innerSelectedKeys.value = val;
        emit('update:selectedKeys', val);
      },
    });

    const innerOpenKeys = ref<string[]>([]);
    const openKeys = computed({
      get: () => props.openKeys || innerOpenKeys.value,
      set: (val: string[]) => {
        innerOpenKeys.value = val;
        emit('update:openKeys', val);
      },
    });

    const layoutMode = computed<ProLayoutMode>(() => props.layout || 'side');

    const activeTopKey = computed(() => {
      const selected = selectedKeys.value[0];
      return findTopKeyBySelected(props.menu, selected) || selected;
    });

    const topMenus = computed(() => toTopMenus(props.menu));

    const sideMenus = computed<ItemType[]>(() => {
      if (layoutMode.value !== 'mix' || !props.splitMenus) return [];
      const top = findMenuNode(props.menu, activeTopKey.value);
      return (top?.children as ItemType[]) || [];
    });

    const showSider = computed(() => {
      if (layoutMode.value === 'top') return false;
      if (layoutMode.value === 'mix') return sideMenus.value.length > 0;
      return true;
    });

    const syncMixSelection = (topKey: string) => {
      const top = findMenuNode(props.menu, topKey);
      if (top?.children?.length) {
        const stillValid = !!findMenuNode(top.children as ItemType[], selectedKeys.value[0]);
        if (!stillValid) {
          const next = getFirstSelectableKey(top);
          if (next) selectedKeys.value = [next];
        }
      } else if (topKey) {
        selectedKeys.value = [topKey];
      }
    };

    watch(
      [activeTopKey, () => props.menu, layoutMode],
      () => {
        if (layoutMode.value === 'mix' && props.splitMenus && activeTopKey.value) {
          syncMixSelection(activeTopKey.value);
        }
      },
      { immediate: true },
    );

    const onTopMenuClick: MenuProps['onClick'] = info => {
      const key = String(info.key);
      if (layoutMode.value === 'mix' && props.splitMenus) {
        syncMixSelection(key);
      } else {
        selectedKeys.value = [key];
      }
      emit('menuClick', info);
    };

    const onSideMenuClick: MenuProps['onClick'] = info => {
      selectedKeys.value = [String(info.key)];
      emit('menuClick', info);
    };

    const renderLogo = (collapsed = false) => (
      <div class={['ant-pro-layout-logo', collapsed ? 'ant-pro-layout-logo-collapsed' : undefined]}>
        {slots.logo?.() || (
          <>
            {props.logo ? <img src={props.logo} alt="logo" /> : null}
            {!collapsed && props.title ? (
              <span class="ant-pro-layout-logo-title">{props.title}</span>
            ) : null}
          </>
        )}
      </div>
    );

    const renderCollapseBtn = () => (
      <button
        type="button"
        class="ant-pro-layout-collapse-btn"
        aria-label={mergedCollapsed.value ? '展开侧栏' : '收起侧栏'}
        onClick={() => {
          mergedCollapsed.value = !mergedCollapsed.value;
        }}
      >
        {mergedCollapsed.value ? <RightOutlined /> : <LeftOutlined />}
      </button>
    );

    const renderPageHeader = () => {
      const showPageHeader = !!(props.pageTitle || props.breadcrumb?.length || slots.pageHeader);
      if (!showPageHeader) return null;
      return (
        <div class="ant-pro-layout-page-header">
          {slots.pageHeader?.() || (
            <>
              {props.breadcrumb?.length ? (
                <Breadcrumb>
                  {props.breadcrumb.map((item, index) => (
                    <Breadcrumb.Item key={item.path || index}>{item.title}</Breadcrumb.Item>
                  ))}
                </Breadcrumb>
              ) : null}
              {props.pageTitle ? (
                <h1 class="ant-pro-layout-page-title">{props.pageTitle}</h1>
              ) : null}
            </>
          )}
        </div>
      );
    };

    const renderContent = () => (
      <Content class="ant-pro-layout-content">
        {renderPageHeader()}
        {slots.default?.()}
      </Content>
    );

    const renderFooter = () => {
      if (!slots.footer) return null;
      return <Footer class="ant-pro-layout-footer">{slots.footer()}</Footer>;
    };

    const renderSiderMenu = (items: ItemType[], withOpenKeys = false) => (
      <Menu
        selectedKeys={selectedKeys.value}
        openKeys={withOpenKeys ? openKeys.value : undefined}
        theme="light"
        mode="inline"
        items={items}
        style={layoutMode.value === 'mix' ? { height: '100%', borderRight: 0 } : undefined}
        onUpdate:selectedKeys={(val: string[]) => {
          selectedKeys.value = val;
        }}
        onUpdate:openKeys={
          withOpenKeys
            ? (val: string[]) => {
                openKeys.value = val;
              }
            : undefined
        }
        onClick={onSideMenuClick}
      />
    );

    const renderSider = () => {
      if (!showSider.value) return null;
      const isSide = layoutMode.value === 'side';
      return (
        <Sider
          collapsed={mergedCollapsed.value}
          class="ant-pro-layout-sider"
          collapsible
          trigger={null}
          width={props.siderWidth}
          theme="light"
          onUpdate:collapsed={(val: boolean) => {
            mergedCollapsed.value = val;
          }}
        >
          {isSide ? renderLogo(mergedCollapsed.value) : null}
          {renderSiderMenu(isSide ? props.menu : sideMenus.value, isSide)}
          {renderCollapseBtn()}
        </Sider>
      );
    };

    const renderHeader = () => {
      const mode = layoutMode.value;
      const showTopMenu = mode === 'top' || mode === 'mix';
      return (
        <Header class="ant-pro-layout-header">
          {mode !== 'side' ? renderLogo(false) : null}
          {mode === 'side' ? (
            <div class="ant-pro-layout-header-left">
              {slots.headerLeft?.() ||
                (props.headerTitle ? (
                  <div class="ant-pro-layout-header-title">{props.headerTitle}</div>
                ) : (
                  <span />
                ))}
            </div>
          ) : null}
          {showTopMenu ? (
            <Menu
              class="ant-pro-layout-top-menu"
              selectedKeys={
                mode === 'mix' && props.splitMenus
                  ? activeTopKey.value
                    ? [activeTopKey.value]
                    : []
                  : selectedKeys.value
              }
              theme="light"
              mode="horizontal"
              items={mode === 'mix' && props.splitMenus ? topMenus.value : props.menu}
              disabledOverflow
              onUpdate:selectedKeys={(val: string[]) => {
                if (!(mode === 'mix' && props.splitMenus)) {
                  selectedKeys.value = val;
                }
              }}
              onClick={onTopMenuClick}
            />
          ) : null}
          <div class="ant-pro-layout-header-right">{slots.headerRight?.()}</div>
        </Header>
      );
    };

    return () => {
      const mode = layoutMode.value;
      const rootClass = ['ant-pro-layout', `ant-pro-layout-${mode}`, attrs.class];

      if (mode === 'top') {
        return (
          <Layout class={rootClass} style={attrs.style as any}>
            {renderHeader()}
            {renderContent()}
            {renderFooter()}
          </Layout>
        );
      }

      if (mode === 'mix') {
        return (
          <Layout class={rootClass} style={attrs.style as any}>
            {renderHeader()}
            <Layout class="ant-pro-layout-body" hasSider={showSider.value}>
              {renderSider()}
              <Layout class="ant-pro-layout-main">
                {renderContent()}
                {renderFooter()}
              </Layout>
            </Layout>
          </Layout>
        );
      }

      // side
      return (
        <Layout class={rootClass} style={attrs.style as any} hasSider>
          {renderSider()}
          <Layout class="ant-pro-layout-main">
            {renderHeader()}
            {renderContent()}
            {renderFooter()}
          </Layout>
        </Layout>
      );
    };
  },
});

ProLayout.install = (app: App) => {
  app.component(ProLayout.name as string, ProLayout);
  return app;
};

export default ProLayout;

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
  children?: ItemType[];
  type?: string;
};

const asMenuNode = (item: ItemType | null | undefined): MenuNode | null => {
  if (!item || typeof item !== 'object') return null;
  const node = item as MenuNode;
  if (node.type === 'divider') return null;
  return node;
};

const getItemKey = (item: MenuNode) => (item.key !== undefined ? String(item.key) : undefined);

const findMenuNode = (items: ItemType[] = [], key?: string): MenuNode | undefined => {
  if (!key) return undefined;
  for (const raw of items) {
    const node = asMenuNode(raw);
    if (!node) continue;
    if (getItemKey(node) === key) return node;
    if (node.children?.length) {
      const found = findMenuNode(node.children, key);
      if (found) return found;
    }
  }
  return undefined;
};

const findTopKeyBySelected = (items: ItemType[] = [], selectedKey?: string): string | undefined => {
  if (!selectedKey) return undefined;
  for (const raw of items) {
    const node = asMenuNode(raw);
    if (!node) continue;
    const key = getItemKey(node);
    if (!key) continue;
    if (key === selectedKey) return key;
    if (node.children?.length && findMenuNode(node.children, selectedKey)) {
      return key;
    }
  }
  return undefined;
};

const getFirstSelectableKey = (item?: MenuNode | null): string | undefined => {
  if (!item) return undefined;
  if (item.children?.length) {
    for (const child of item.children) {
      const nested = getFirstSelectableKey(asMenuNode(child));
      if (nested) return nested;
    }
  }
  return getItemKey(item);
};

const toTopMenus = (items: ItemType[] = []): ItemType[] =>
  items.reduce<ItemType[]>((result, raw) => {
    const node = asMenuNode(raw);
    if (!node) {
      if (raw) result.push(raw);
      return result;
    }
    const { children: _children, ...rest } = node;
    result.push(rest as ItemType);
    return result;
  }, []);

const proLayoutProps = () => ({
  layout: stringType<ProLayoutMode>('mix'),
  title: stringType('Ant Design Pro'),
  logo: stringType('https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg'),
  collapsed: booleanType(),
  menu: someType<ItemType[]>([Array], []),
  selectedKeys: someType<string[]>([Array]),
  openKeys: someType<string[]>([Array]),
  siderWidth: someType<number>([Number], 256),
  headerTitle: stringType(),
  pageTitle: stringType(),
  breadcrumb: someType<ProLayoutBreadcrumbItem[]>([Array]),
  splitMenus: booleanType(false),
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
    layout: 'mix',
    title: 'Ant Design Pro',
    logo: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
    siderWidth: 256,
    menu: [],
    splitMenus: false,
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

    const layoutMode = computed<ProLayoutMode>(() => props.layout || 'mix');
    const isSplitMix = computed(() => layoutMode.value === 'mix' && !!props.splitMenus);

    const activeTopKey = computed(() => {
      const selected = selectedKeys.value[0];
      return findTopKeyBySelected(props.menu, selected) || selected;
    });

    const topMenus = computed(() => toTopMenus(props.menu));

    /** mix+splitMenus：侧栏为当前一级的子菜单；其余有侧栏的模式用完整菜单 */
    const siderMenuItems = computed<ItemType[]>(() => {
      if (isSplitMix.value) {
        const top = findMenuNode(props.menu, activeTopKey.value);
        return (top?.children as ItemType[]) || [];
      }
      return props.menu;
    });

    const showSider = computed(() => {
      if (layoutMode.value === 'top') return false;
      if (isSplitMix.value) return siderMenuItems.value.length > 0;
      return layoutMode.value === 'side' || layoutMode.value === 'mix';
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
      [activeTopKey, () => props.menu, layoutMode, () => props.splitMenus],
      () => {
        if (isSplitMix.value && activeTopKey.value) {
          syncMixSelection(activeTopKey.value);
        }
      },
      { immediate: true },
    );

    const onTopMenuClick: MenuProps['onClick'] = info => {
      const key = String(info.key);
      if (isSplitMix.value) {
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

    const toggleCollapsed = () => {
      mergedCollapsed.value = !mergedCollapsed.value;
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

    const renderSiderCollapseBtn = () => (
      <button
        type="button"
        class="ant-pro-layout-collapse-btn"
        aria-label={mergedCollapsed.value ? '展开侧栏' : '收起侧栏'}
        onClick={toggleCollapsed}
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
        <div class="ant-pro-layout-content-children">{slots.default?.()}</div>
      </Content>
    );

    const renderFooter = () => {
      if (!slots.footer) return null;
      return <Footer class="ant-pro-layout-footer">{slots.footer()}</Footer>;
    };

    const renderSiderMenu = (items: ItemType[], withOpenKeys = true) => (
      <Menu
        class="ant-pro-layout-sider-menu"
        selectedKeys={selectedKeys.value}
        openKeys={withOpenKeys ? openKeys.value : undefined}
        theme="light"
        mode="inline"
        items={items}
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
      // split mix 侧栏多为叶子菜单，无需 openKeys；其余用完整树
      const withOpenKeys = !isSplitMix.value;
      return (
        <Sider
          collapsed={mergedCollapsed.value}
          class={[
            'ant-pro-layout-sider',
            layoutMode.value === 'mix' ? 'ant-pro-layout-sider-mix' : undefined,
          ]}
          collapsible
          trigger={null}
          width={props.siderWidth}
          theme="light"
          onUpdate:collapsed={(val: boolean) => {
            mergedCollapsed.value = val;
          }}
        >
          {isSide ? renderLogo(mergedCollapsed.value) : null}
          {renderSiderMenu(siderMenuItems.value, withOpenKeys)}
          {renderSiderCollapseBtn()}
        </Sider>
      );
    };

    const renderHeader = () => {
      const mode = layoutMode.value;
      const showTopMenu = mode === 'top' || isSplitMix.value;
      return (
        <Header
          class={[
            'ant-pro-layout-header',
            mode === 'mix' ? 'ant-pro-layout-header-mix' : undefined,
          ]}
        >
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
                isSplitMix.value
                  ? activeTopKey.value
                    ? [activeTopKey.value]
                    : []
                  : selectedKeys.value
              }
              theme="light"
              mode="horizontal"
              items={isSplitMix.value ? topMenus.value : props.menu}
              disabledOverflow
              onUpdate:selectedKeys={(val: string[]) => {
                if (!isSplitMix.value) {
                  selectedKeys.value = val;
                }
              }}
              onClick={onTopMenuClick}
            />
          ) : (
            <div class="ant-pro-layout-header-spacer" />
          )}
          <div class="ant-pro-layout-header-right">{slots.headerRight?.()}</div>
        </Header>
      );
    };

    return () => {
      const mode = layoutMode.value;
      const rootClass = [
        'ant-pro-layout',
        `ant-pro-layout-${mode}`,
        isSplitMix.value ? 'ant-pro-layout-split-menus' : undefined,
        attrs.class,
      ];

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

import { mount } from '@vue/test-utils';
import ProLayout from '../ProLayout';
import { sleep } from '../../../tests/utils';
import type { ItemType } from '../../menu';

const menu: ItemType[] = [
  { key: 'welcome', label: '欢迎' },
  {
    key: 'dashboard',
    label: 'Dashboard',
    children: [
      { key: 'analysis', label: '分析页' },
      { key: 'monitor', label: '监控页' },
    ],
  },
];

const mountPro = (props: Record<string, unknown> = {}) =>
  mount(ProLayout, {
    props: { menu, ...props },
    attachTo: document.body,
    sync: false,
  });

describe('ProLayout mix / splitMenus', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('defaults to mix + splitMenus=false + siderWidth 256', async () => {
    const wrapper = mountPro();
    await sleep();
    expect(wrapper.find('.xy-pro-layout-mix').exists()).toBe(true);
    expect(wrapper.find('.xy-pro-layout-top-menu').exists()).toBe(false);
    expect(wrapper.find('.xy-pro-layout-sider').exists()).toBe(true);
    expect(wrapper.find('.xy-layout-sider').attributes('style') || '').toContain('256px');
    wrapper.unmount();
  });

  it('mix + splitMenus=false: header has no menu, sider renders full tree and honors openKeys', async () => {
    const wrapper = mountPro({
      layout: 'mix',
      splitMenus: false,
      selectedKeys: ['analysis'],
      openKeys: ['dashboard'],
    });
    await sleep();
    expect(wrapper.find('.xy-pro-layout-top-menu').exists()).toBe(false);
    expect(wrapper.find('.xy-pro-layout-sider').exists()).toBe(true);
    const siderText = wrapper.find('.xy-pro-layout-sider').text();
    expect(siderText).toContain('欢迎');
    expect(siderText).toContain('Dashboard');
    expect(siderText).toContain('分析页');
    expect(wrapper.find('.xy-menu-submenu-open').exists()).toBe(true);
    wrapper.unmount();
  });

  it('mix + splitMenus=true: level-1 on top, children in sider', async () => {
    const wrapper = mountPro({
      layout: 'mix',
      splitMenus: true,
      selectedKeys: ['analysis'],
    });
    await sleep();
    expect(wrapper.find('.xy-pro-layout-top-menu').exists()).toBe(true);
    expect(wrapper.find('.xy-pro-layout-sider').exists()).toBe(true);
    const topText = wrapper.find('.xy-pro-layout-top-menu').text();
    const siderText = wrapper.find('.xy-pro-layout-sider').text();
    expect(topText).toContain('欢迎');
    expect(topText).toContain('Dashboard');
    expect(siderText).toContain('分析页');
    expect(siderText).not.toContain('欢迎');
    wrapper.unmount();
  });

  it('mix + splitMenus=true: hides sider when active level-1 has no children', async () => {
    const wrapper = mountPro({
      layout: 'mix',
      splitMenus: true,
      selectedKeys: ['welcome'],
    });
    await sleep();
    expect(wrapper.find('.xy-pro-layout-top-menu').exists()).toBe(true);
    expect(wrapper.find('.xy-pro-layout-sider').exists()).toBe(false);
    wrapper.unmount();
  });

  it('side: logo + full menu in sider, no top menu', async () => {
    const wrapper = mountPro({
      layout: 'side',
      selectedKeys: ['welcome'],
      openKeys: ['dashboard'],
    });
    await sleep();
    expect(wrapper.find('.xy-pro-layout-side').exists()).toBe(true);
    expect(wrapper.find('.xy-pro-layout-top-menu').exists()).toBe(false);
    expect(wrapper.find('.xy-pro-layout-sider .xy-pro-layout-logo').exists()).toBe(true);
    expect(wrapper.find('.xy-pro-layout-sider').text()).toContain('Dashboard');
    wrapper.unmount();
  });

  it('top: no sider, menu in header', async () => {
    const wrapper = mountPro({
      layout: 'top',
      selectedKeys: ['welcome'],
    });
    await sleep();
    expect(wrapper.find('.xy-pro-layout-top').exists()).toBe(true);
    expect(wrapper.find('.xy-pro-layout-sider').exists()).toBe(false);
    expect(wrapper.find('.xy-pro-layout-top-menu').exists()).toBe(true);
    wrapper.unmount();
  });
});

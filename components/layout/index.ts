import type { App } from 'vue';
import { registerComponent } from '../_util/registerComponent';
import Layout, { Header, Footer, Content } from './layout';
import Sider from './Sider';
import ProLayout from './ProLayout';

export type { BasicProps as LayoutProps } from './layout';
export type { SiderProps } from './Sider';
export type { ProLayoutProps, ProLayoutBreadcrumbItem, ProLayoutMode } from './ProLayout';
export { ProLayout };

/* istanbul ignore next */
export const LayoutHeader = Header;
export const LayoutFooter = Footer;
export const LayoutSider = Sider;
export const LayoutContent = Content;

export default Object.assign(Layout, {
  Header,
  Footer,
  Content,
  Sider,
  ProLayout,
  install: (app: App) => {
    registerComponent(app, Layout);
    registerComponent(app, Header);
    registerComponent(app, Footer);
    registerComponent(app, Sider);
    registerComponent(app, Content);
    registerComponent(app, ProLayout);
    return app;
  },
});

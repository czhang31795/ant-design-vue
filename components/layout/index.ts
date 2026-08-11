import type { App } from 'vue';
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
    app.component(Layout.name, Layout);
    app.component(Header.name, Header);
    app.component(Footer.name, Footer);
    app.component(Sider.name, Sider);
    app.component(Content.name, Content);
    app.component(ProLayout.name as string, ProLayout);
    return app;
  },
});

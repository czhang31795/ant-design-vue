# Layout 布局

> 自动生成自组件库文档，细节请用 `antd-cli components get layout` / `antd-cli demos get layout/<id>`。

## 摘要

协助进行页面级整体布局。

## 何时使用

_无_

## API（摘要）

```jsx
<Layout>
  <Header>header</Header>
  <Layout>
    <Sider>left sidebar</Sider>
    <Content>main content</Content>
    <Sider>right sidebar</Sider>
  </Layout>
  <Footer>footer</Footer>
</Layout>
```

### Layout

布局容器。

| 参数     | 说明                                                               | 类型    | 默认值 |
| -------- | ------------------------------------------------------------------ | ------- | ------ |
| class    | 容器 class                                                         | string  | -      |
| hasSider | 表示子元素里有 Sider，一般不用指定。可用于服务端渲染时避免样式闪动 | boolean | -      |
| style    | 指定样式                                                           | object  | -      |

### Layout.Sider

侧边栏。

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| breakpoint | 触发响应式布局的[断点](/components/grid#api) | `xs` \| `sm` \| `md` \| `lg` \| `xl` \| `xxl` | - |  |
| class | 容器 class | string | - |  |
| collapsed(v-model) | 当前收起状态 | boolean | - |  |
| collapsedWidth | 收缩宽度，设置为 0 会出现特殊 trigger | number | 80 |  |
| collapsible | 是否可收起 | boolean | false |  |
| defaultCollapsed | 是否默认收起 | boolean | false |  |
| reverseArrow | 翻转折叠提示箭头的方向，当 Sider 在右边时可以使用 | boolean | false |  |
| style | 指定样式 | object\|string | - |  |
| theme | 主题颜色 | `light` \| `dark` | `dark` |  |
| trigger | 自定义 trigger，设置为 null 时隐藏 trigger | string\|slot | - |  |
| width | 宽度 | number\|string | 200 |  |
| zeroWidthTriggerStyle | 指定当 `collapsedWidth` 为 0 时出现的特殊 trigger 的样式 | object | - | 1.5.0 |

### 事件

| 事件名称 | 说明 | 回调参数 |
| --- | --- | --- |
| breakpoint | 触发响应式布局[断点](/components/grid#api)时的回调 | (broken) => {} |
| collapse | 展开-收起时的回调函数，有点击 trigger 以及响应式反馈两种方式可以触发 | (collapsed, type) => {} |

#### breakpoint width

```js
{
  xs: '480px',
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
  xxl: '1600px',
  xxxl: '2000px',
}
```

## ProLayout

对齐 Ant Design Pro v6 / ProComponents 的后台壳布局，通过 `layout` 切换三种导航模式，样式已内置：

- **mix**（默认，对齐 [Pro 预览](https://preview.pro.ant.design/welcome)）：顶栏全宽 Logo + 操作区，侧栏在下方放完整菜单（`splitMenus=false`）。
- **mix + splitMenus**：顶部一级菜单，侧栏仅展示当前一级的子菜单。
- **side**：Logo + 完整菜单在左侧，右侧为顶栏与内容区。
- **top**：Logo 与菜单在顶部。

```ts
import { ProLayout } from '@czxingyu/ant-design-vue';
```

```vue
<a-pro-layout layout="mix" :menu="menu" v-model:selected-keys="selectedKeys">
  <router-view />
</a-pro-layout>
```

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| layout | 导航模式 | `side` \| `top` \| `mix` | `mix` |
| title | 标题文案 | string | `Ant Design Pro` |
| logo | Logo 地址 | string | - |
| menu | 菜单数据（同 Menu `items`） | `ItemType[]` | `[]` |
| collapsed(v-model) | 侧栏收起（side / mix） | boolean | false |
| selectedKeys(v-model) | 选中菜单 | string\[] | - |
| openKeys(v-model) | 展开菜单（完整侧栏树时） | string\[] | - |
| siderWidth | 侧栏宽度 | number | 256 |
| headerTitle | 侧栏模式下顶栏左侧标题 | string | - |
| pageTitle | 内容区标题 | string | - |
| breadcrumb | 内容区面包屑 | `{ title, path? }[]` | - |
| splitMenus | mix 模式下是否拆分一二级菜单；`false` 时侧栏展示完整菜单（对齐 Pro 预览默认） | boolean | false |

| 事件      | 说明       | 回调参数        |
| --------- | ---------- | --------------- |
| menuClick | 点击菜单项 | 同 Menu `click` |

| 插槽        | 说明                                      |
| ----------- | ----------------------------------------- |
| default     | 主内容                                    |
| headerRight | 顶栏右侧（搜索、用户等）                  |
| headerLeft  | 侧栏模式下顶栏左侧（覆盖 headerTitle）    |
| logo        | 自定义 Logo 区                            |
| pageHeader  | 自定义页头（覆盖 pageTitle / breadcrumb） |
| footer      | 页脚                                      |

> 注意：采用 flex 布局实现，请注意[浏览器兼容性](http://caniuse.com/#search=flex)问题。

## 组件概述

- `Layout`：布局容器，其下可嵌套 `Header` `Sider` `Content` `Footer` 或 `Layout` 本身，可以放在任何父容器中。
- `Header`：顶部布局，自带默认样式，其下可嵌套任何元素，只能放在 `Layout` 中。
- `Sider`：侧边栏，自带默认样式及基本功能，其下可嵌套任何元素，只能放在 `Layout` 中。
- `Content`：内容部分，自带默认样式，其下可嵌套任何元素，只能放在 `Layout` 中。
- `Footer`：底部布局，自带默认样式，其下可嵌套任何元素，只能放在 `Layout` 中。

### ProLayout

对齐 Ant Design Pro v6 / ProComponents 的后台壳布局，通过 `layout` 切换三种导航模式，样式已内置：

- **mix**（默认，对齐 [Pro 预览](https://preview.pro.ant.design/welcome)）：顶栏全宽 Logo + 操作区，侧栏在下方放完整菜单（`splitMenus=false`）。
- **mix + splitMenus**：顶部一级菜单，侧栏仅展示当前一级的子菜单。
- **side**：Logo + 完整菜单在左侧，右侧为顶栏与内容区。
- **top**：Logo 与菜单在顶部。

```ts
import { ProLayout } from '@czxingyu/ant-design-vue';
```

```vue
<a-pro-layout layout="mix" :menu="menu" v-model:selected-keys="selectedKeys">
  <router-view />
</a-pro-layout>
```

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| layout | 导航模式 | `side` \| `top` \| `mix` | `mix` |
| title | 标题文案 | string | `Ant Design Pro` |
| logo | Logo 地址 | string | - |
| menu | 菜单数据（同 Menu `items`） | `ItemType[]` | `[]` |
| collapsed(v-model) | 侧栏收起（side / mix） | boolean | false |
| selectedKeys(v-model) | 选中菜单 | string\[] | - |
| openKeys(v-model) | 展开菜单（完整侧栏树时） | string\[] | - |
| siderWidth | 侧栏宽度 | number | 256 |
| headerTitle | 侧栏模式下顶栏左侧标题 | string | - |
| pageTitle | 内容区标题 | string | - |
| breadcrumb | 内容区面包屑 | `{ title, path? }[]` | - |
| splitMenus | mix 模式下是否拆分一二级菜单；`false` 时侧栏展示完整菜单（对齐 Pro 预览默认） | boolean | false |

| 事件      | 说明       | 回调参数        |
| --------- | ---------- | --------------- |
| menuClick | 点击菜单项 | 同 Menu `click` |

| 插槽        | 说明                                      |
| ----------- | ----------------------------------------- |
| default     | 主内容                                    |
| headerRight | 顶栏右侧（搜索、用户等）                  |
| headerLeft  | 侧栏模式下顶栏左侧（覆盖 headerTitle）    |
| logo        | 自定义 Logo 区                            |
| pageHeader  | 自定义页头（覆盖 pageTitle / breadcrumb） |
| footer      | 页脚                                      |

> 注意：采用 flex 布局实现，请注意[浏览器兼容性](http://caniuse.com/#search=flex)问题。

## Demos

- `basic` — 基本结构
- `custom-trigger` — 自定义触发器
- `fixed-sider` — 固定侧边栏
- `fixed` — 固定头部
- `nav-mix` — 混合导航
- `nav-pro` — Pro 风格布局
- `nav-side` — 侧栏导航
- `nav-top` — 顶部导航
- `responsive` — 响应式布局
- `side` — 侧边布局
- `top-side-2` — 顶部-侧边布局-通栏
- `top-side` — 顶部-侧边布局

```bash
antd-cli components get layout --json
antd-cli demos list layout --json
antd-cli demos get layout/<demo-id> --json
```

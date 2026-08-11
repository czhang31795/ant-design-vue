# Drawer 抽屉

> 自动生成自组件库文档，细节请用 `antd-cli components get drawer` / `antd-cli demos get drawer/<id>`。

## 摘要

屏幕边缘滑出的浮层面板。

## 何时使用

抽屉从父窗体边缘滑入，覆盖住部分父窗体内容。用户在抽屉内操作时不必离开当前任务，操作完成后，可以平滑地回到原任务。

- 当需要一个附加的面板来控制父窗体内容，这个面板在需要时呼出。比如，控制界面展示样式，往界面中添加内容。
- 当需要在当前任务流中插入临时任务，创建或预览附加内容。比如展示协议条款，创建子对象。

## API（摘要）

**🚨 注意：** v4 使用 `rootClassName` 与 `rootStyle` 来配置最外层元素样式。原 v4 `class` 与 `style` 改至配置 Drawer 窗体样式以和 Modal 对齐。

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| autofocus | 抽屉展开后是否将焦点切换至其 Dom 节点 | boolean | true | 3.0.0 |
| bodyStyle | 可用于设置 Drawer 内容部分的样式 | CSSProperties | - |  |
| class | Drawer 容器外层 className 设置，如果需要设置最外层，请使用 rootClassName | string | - |  |
| closable | 是否显示左上角的关闭按钮 | boolean | true |  |
| closeIcon | 自定义关闭图标 | VNode \| slot | `<CloseOutlined />` | 3.0.0 |
| contentWrapperStyle | 可用于设置 Drawer 包裹内容部分的样式 | CSSProperties | - | 3.0.0 |
| destroyOnClose | 关闭时销毁 Drawer 里的子元素 | boolean | false |  |
| extra | 抽屉右上角的操作区域 | VNode \| slot | - | 3.0.0 |
| footer | 抽屉的页脚 | VNode \| slot | - | 3.0.0 |
| footerStyle | 抽屉页脚部件的样式 | CSSProperties | - | 3.0.0 |
| forceRender | 预渲染 Drawer 内元素 | boolean | false | 3.0.0 |
| getContainer | 指定 Drawer 挂载的节点，**并在容器内展现** \| `() => HTMLElement` \| Selectors | 'body' |  |
| headerStyle | 用于设置 Drawer 头部的样式 | CSSProperties | - | 3.0.0 |
| height | 高度, 在 `placement` 为 `top` 或 `bottom` 时使用 | string \| number | 378 |  |
| keyboard | 是否支持键盘 esc 关闭 | boolean | true |  |
| mask | 是否展示遮罩 | Boolean | true |  |
| maskClosable | 点击蒙层是否允许关闭 | boolean | true |  |
| maskStyle | 遮罩样式 | CSSProperties | {} |  |
| placement | 抽屉的方向 | 'top' \| 'right' \| 'bottom' \| 'left' | 'right' |  |
| push | 用于设置多层 Drawer 的推动行为 | boolean \| {distance: string \| number} | { distance: 180 } | 3.0.0 |
| rootClassName | 对话框外层容器的类名 | string | - | 4.0 |
| rootStyle | 可用于设置 Drawer 最外层容器的样式，和 `style` 的区别是作用节点包括 `mask` | CSSProperties | - | 4.0 |
| size | 预设抽屉宽度（或高度），default `378px` 和 large `736px` | `default` \| `large` | `default` | 3.0.0 |
| style | 设计 Drawer 容器样式，如果你只需要设置内容部分请使用 `bodyStyle` | CSSProperties | - |  |
| title | 标题 | string \| slot | - |  |
| open(v-model) | Drawer 是否可见 | boolean | - | 4.0 |
| width | 宽度 | string \| number | 378 |  |
| zIndex | 设置 Drawer 的 `z-index` | Number | 1000 |  |

## Demos

- `basic` — 基本用法
- `extra` — 额外操作
- `form-in-drawer` — 抽屉表单
- `multi-level-drawer` — 多层抽屉
- `placement` — 自定义位置
- `render-in-current` — 渲染在当前 DOM
- `size` — 预设宽度
- `user-profile` — 信息预览抽屉

```bash
antd-cli components get drawer --json
antd-cli demos list drawer --json
antd-cli demos get drawer/<demo-id> --json
```

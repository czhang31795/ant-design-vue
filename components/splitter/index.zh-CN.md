---
category: Components
subtitle: 分隔面板
type: 布局
title: Splitter
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*r1AbQa-q2f0AAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*r1AbQa-q2f0AAAAAAAAAAAAADrJ8AQ/original
tag: New
---

自由切分指定区域。

## 何时使用

- 可以水平或垂直地分隔区域。
- 当需要自由拖拽调整各区域大小。
- 当需要指定区域的最大最小宽高时。

## API

> Splitter 组件需要通过子元素计算面板大小，因而其子元素仅支持 `Splitter.Panel`。

### Splitter

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| layout | 布局方向（推荐使用，与 antd 5.x 一致） | `horizontal` \| `vertical` | `horizontal` |  |
| orientation | 布局方向，优先于 `layout` / `vertical` | `horizontal` \| `vertical` | - |  |
| vertical | 是否垂直排列 | boolean | false |  |
| lazy | 延迟渲染模式，松手后再更新尺寸 | boolean | false |  |

### Splitter 事件

| 事件名称    | 说明              | 回调参数                                          |
| ----------- | ----------------- | ------------------------------------------------- |
| resizeStart | 开始拖拽之前回调  | `(sizes: number[]) => void`                       |
| resize      | 面板大小变化回调  | `(sizes: number[]) => void`                       |
| resizeEnd   | 拖拽结束回调      | `(sizes: number[]) => void`                       |
| collapse    | 展开 / 收起时回调 | `(collapsed: boolean[], sizes: number[]) => void` |

### Panel

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| defaultSize | 初始面板大小，支持数字 px 或 `'百分比%'` | number \| string | - |  |
| size | 受控面板大小，支持数字 px 或 `'百分比%'` | number \| string | - |  |
| min | 最小阈值，支持数字 px 或 `'百分比%'` | number \| string | - |  |
| max | 最大阈值，支持数字 px 或 `'百分比%'` | number \| string | - |  |
| resizable | 是否开启拖拽伸缩 | boolean | true |  |
| collapsible | 快速折叠。传对象时可分别控制两侧，并用 `showCollapsibleIcon` 控制图标显示 | boolean \| `{ start?: boolean; end?: boolean; showCollapsibleIcon?: boolean \| 'auto' }` | false |  |
| destroyOnHidden | 折叠后是否销毁面板 Dom | boolean | false |  |

`collapsible.showCollapsibleIcon`：

| 值             | 说明                         |
| -------------- | ---------------------------- |
| `auto`（默认） | 鼠标悬停分割条时显示折叠图标 |
| `true`         | 始终显示折叠图标             |
| `false`        | 始终隐藏折叠图标             |

## 主题变量（Design Token）

| Token 名称            | 描述             | 类型   | 默认值 |
| --------------------- | ---------------- | ------ | ------ |
| splitBarDraggableSize | 拖拽标识元素大小 | number | 20     |
| splitBarSize          | 拖拽元素显示大小 | number | 2      |
| splitTriggerSize      | 拖拽触发区域大小 | number | 6      |

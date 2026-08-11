# Table 表格

> 自动生成自组件库文档，细节请用 `antd-cli components get table` / `antd-cli demos get table/<id>`。

## 摘要

展示行列数据。

## 何时使用

- 当有大量结构化的数据需要展现时；
- 当需要对数据进行排序、搜索、分页、自定义操作等复杂行为时。

## API（摘要）

### Table

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| bodyCell | 个性化单元格 | v-slot:bodyCell="{text, record, index, column}" | - | 3.0 |
| bordered | 是否展示外边框和列边框 | boolean | false |  |
| childrenColumnName | 指定树形结构的列名 | string | `children` |  |
| columns | 表格列的配置描述，具体项见[下表](#column) | array | - |  |
| components | 覆盖默认的 table 元素 | object | - |  |
| customFilterDropdown | 自定义筛选菜单，需要配合 `column.customFilterDropdown` 使用 | v-slot:customFilterDropdown="[FilterDropdownProps](#filterdropdownprops)" | - | 3.0 |
| customFilterIcon | 自定义筛选图标 | v-slot:customFilterIcon="{filtered, column}" | - | 3.0 |
| customHeaderRow | 设置头部行属性 | Function(columns, index) | - |  |
| customRow | 设置行属性 | Function(record, index) | - |  |
| dataSource | 数据数组 | object\[] |  |  |
| defaultExpandAllRows | 初始时，是否展开所有行 | boolean | false |  |
| defaultExpandedRowKeys | 默认展开的行 | string\[] | - |  |
| emptyText | 自定义空数据时的显示内容 | v-slot:emptyText | - | 3.0 |
| expandedRowKeys(v-model) | 展开的行，控制属性 | string\[] | - |  |
| expandedRowRender | 额外的展开行 | Function(record, index, indent, expanded):VNode \| v-slot:expandedRowRender="{record, index, indent, expanded}" | - |  |
| expandFixed | 控制展开图标是否固定，可选 true `left` `right` | boolean \| string | false | 3.0 |
| expandColumnTitle | 自定义展开列表头 | v-slot | - | 4.0.0 |
| expandIcon | 自定义展开图标 | Function(props):VNode \| v-slot:expandIcon="props" | - |  |
| expandRowByClick | 通过点击行来展开子行 | boolean | `false` |  |
| footer | 表格尾部 | Function(currentPageData)\|v-slot:footer="currentPageData" |  |  |
| getPopupContainer | 设置表格内各类浮层的渲染节点，如筛选菜单 | (triggerNode) => HTMLElement | `() => TableHtmlElement` | 1.5.0 |
| headerCell | 个性化头部单元格 | v-slot:headerCell="{title, column}" | - | 3.0 |
| indentSize | 展示树形数据时，每层缩进的宽度，以 px 为单位 | number | 15 |  |
| loading | 页面是否加载中 | boolean\|[object](/components/spin-cn) | false |  |
| locale | 默认文案设置，目前包括排序、过滤、空数据文案 | object | filterConfirm: `确定` <br> filterReset: `重置` <br> emptyText: `暂无数据` |  |
| pagination | 分页器，参考[配置项](#pagination)或 [pagination](/components/pagination-cn/)文档，设为 false 时不展示和进行分页 | object \| `false` |  |  |
| rowClassName | 表格行的类名 | Function(record, index):string | - |  |
| rowExpandable | 设置是否允许行展开 | (record) => boolean | - | 3.0 |
| rowKey | 表格行 key 的取值，可以是字符串或一个函数 | string\|Function(record):string | 'key' |  |
| rowSelection | 列表项是否可选择，[配置项](#rowselection) | object | null |  |
| scroll | 表格是否可滚动，也可以指定滚动区域的宽、高，[配置项](#scroll) | object | - |  |
| virtual | 开启纵向虚拟滚动（固定行高），需配合 `scroll.y`。暂不支持固定列、动态行高、单元格合并 | boolean | - |  |
| virtualItemHeight | 虚拟滚动的行高，不传时按 `size` 推导 | number | - |  |
| resizable | 表级开启列宽拖拽：所有 `width` 为 number 的叶子列可拖；列上 `resizable: false` 可关闭 | boolean | - |  |
| rowResizable | 开启行高拖拽（与 `virtual` 互斥），需配合受控 `rowHeights` | boolean | - |  |
| rowHeights | 行高映射，key 为 `rowKey` | Record&lt;string, number&gt; | - |  |
| minRowHeight | 行高拖拽时的最小高度 | number | 39 |  |
| columnDraggable | 开启列拖拽排序（受控，配合 `@dragColumn` 写回 `columns`）。不支持分组表头 | boolean | - |  |
| rowDraggable | 开启行拖拽排序（受控，配合 `@dragRow` 写回 `dataSource`）。与 `virtual` 互斥；树形仅支持同级重排 | boolean | - |  |
| layout | 表格布局，`vertical` 为转置竖表（左字段、右记录列）。暂不支持 virtual / 树形 / rowSelection / rowResizable / expandedRowRender。竖表下拖记录列=行序、拖字段行=列序 | `horizontal` \| `vertical` | `horizontal` |  |
| showExpandColumn | 设置是否展示行展开列 | boolean | true | 3.0 |
| showHeader | 是否显示表头 | boolean | true |  |
| showSorterTooltip | 表头是否显示下一次排序的 tooltip 提示。当参数类型为对象时，将被设置为 Tooltip 的属性 | boolean \| [Tooltip props](/components/tooltip/) | true | 3.0 |
| size | 表格大小 | `large` \| `middle` \| `small` | `large` |  |
| sortDirections | 支持的排序方式，取值为 `ascend` `descend` | Array | \[`ascend`, `descend`] |  |
| sticky | 设置粘性头部和滚动条 | boolean \| `{offsetHeader?: number, offsetScroll?: number, getContainer?: () => HTMLElement}` | - | 3.0 |
| summary | 总结栏 | v-slot:summary | - | 3.0 |
| tableLayout | 表格元素的 [table-layout](https://developer.mozilla.org/zh-CN/docs/Web/CSS/table-layout) 属性，设为 `fixed` 表示内容不会影响列的布局 | - \| 'auto' \| 'fixed' | 无<hr />固定表头/列或使用了 `column.ellipsis` 时，默 |

…(truncated, use `antd-cli components get table --section api`)

## Demos

- `ajax` — 远程加载数据
- `auto-height` — 自动高度
- `basic` — 基本用法
- `bordered` — 带边框
- `colspan-rowspan` — 表格行/列合并
- `custom-filter-panel` — 自定义筛选菜单
- `custom-header` — 自定义表头
- `drag-sort-tree` — 树形行拖拽排序
- `drag-sort-vertical` — 竖表拖拽排序
- `drag-sort` — 行列拖拽排序
- `edit-cell` — 可编辑单元格
- `edit-row` — 可编辑行

```bash
antd-cli components get table --json
antd-cli demos list table --json
antd-cli demos get table/<demo-id> --json
```

---
category: Components
type: Layout
title: Splitter
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*r1AbQa-q2f0AAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*r1AbQa-q2f0AAAAAAAAAAAAADrJ8AQ/original
tag: New
---

Split panels freely by dragging.

## When To Use

- Split areas horizontally or vertically.
- Freely resize panels by dragging.
- Constrain panel size with min / max.

## API

> Splitter calculates panel sizes from children, so children must be `Splitter.Panel`.

### Splitter

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| layout | Layout direction (aligned with antd 5.x) | `horizontal` \| `vertical` | `horizontal` |  |
| orientation | Layout direction, takes precedence over `layout` / `vertical` | `horizontal` \| `vertical` | - |  |
| vertical | Whether vertical layout | boolean | false |  |
| lazy | Lazy mode: update sizes after drag ends | boolean | false |  |

### Splitter Events

| Event | Description | Arguments |
| --- | --- | --- |
| resizeStart | Callback before dragging starts | `(sizes: number[]) => void` |
| resize | Callback when panel sizes change | `(sizes: number[]) => void` |
| resizeEnd | Callback when dragging ends | `(sizes: number[]) => void` |
| collapse | Callback when expand / collapse | `(collapsed: boolean[], sizes: number[]) => void` |

### Panel

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| defaultSize | Initial panel size, number (px) or `'percent%'` | number \| string | - |  |
| size | Controlled panel size, number (px) or `'percent%'` | number \| string | - |  |
| min | Minimum size threshold | number \| string | - |  |
| max | Maximum size threshold | number \| string | - |  |
| resizable | Whether drag resize is enabled | boolean | true |  |
| collapsible | Quick collapse. Object form supports start/end sides and `showCollapsibleIcon` | boolean \| `{ start?: boolean; end?: boolean; showCollapsibleIcon?: boolean \| 'auto' }` | false |  |
| destroyOnHidden | Destroy panel DOM when collapsed | boolean | false |  |

`collapsible.showCollapsibleIcon`:

| Value            | Description                 |
| ---------------- | --------------------------- |
| `auto` (default) | Show collapse icon on hover |
| `true`           | Always show collapse icon   |
| `false`          | Always hide collapse icon   |

## Design Token

| Token Name            | Description             | Type   | Default |
| --------------------- | ----------------------- | ------ | ------- |
| splitBarDraggableSize | Draggable identity size | number | 20      |
| splitBarSize          | Split bar display size  | number | 2       |
| splitTriggerSize      | Drag trigger area size  | number | 6       |

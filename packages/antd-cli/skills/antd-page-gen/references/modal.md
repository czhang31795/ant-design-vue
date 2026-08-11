# Modal 对话框

> 自动生成自组件库文档，细节请用 `antd-cli components get modal` / `antd-cli demos get modal/<id>`。

## 摘要

模态对话框。

## 何时使用

需要用户处理事务，又不希望跳转页面以致打断工作流程时，可以使用 `Modal` 在当前页面正中打开一个浮层，承载相应的操作。

另外当需要一个简洁的确认框询问用户时，可以使用 `Modal.confirm()` 等语法糖方法。

## API（摘要）

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| afterClose | Modal 完全关闭后的回调 | function | - |  |
| bodyStyle | Modal body 样式 | object | {} |  |
| cancelButtonProps | cancel 按钮 props | [ButtonProps](/components/button/#api) | - |  |
| cancelText | 取消按钮文字 | string\| slot | 取消 |  |
| centered | 垂直居中展示 Modal | boolean | `false` |  |
| closable | 是否显示右上角的关闭按钮 | boolean | true |  |
| closeIcon | 自定义关闭图标 | VNode \| slot | - |  |
| confirmLoading | 确定按钮 loading | boolean | - |  |
| destroyOnClose | 关闭时销毁 Modal 里的子元素 | boolean | false |  |
| footer | 底部内容，当不需要默认底部按钮时，可以设为 `:footer="null"` | string\|slot | 确定取消按钮 |  |
| forceRender | 强制渲染 Modal | boolean | false |  |
| getContainer | 指定 Modal 挂载的 HTML 节点 | (instance): HTMLElement | () => document.body |  |
| keyboard | 是否支持键盘 esc 关闭 | boolean | true |  |
| mask | 是否展示遮罩 | boolean | true |  |
| maskClosable | 点击蒙层是否允许关闭 | boolean | true |  |
| maskStyle | 遮罩样式 | object | {} |  |
| okButtonProps | ok 按钮 props | [ButtonProps](/components/button/#api) | - |  |
| okText | 确认按钮文字 | string\|slot | 确定 |  |
| okType | 确认按钮类型 | string | primary |  |
| title | 标题 | string\|slot | - |  |
| open(v-model) | 对话框是否可见 | boolean | - |  |
| width | 宽度 | string\|number | 520 |  |
| wrapClassName | 对话框外层容器的类名 | string | - |  |
| zIndex | 设置 Modal 的 `z-index` | number | 1000 |  |

### 事件

| 事件名称 | 说明                                 | 回调参数    |
| -------- | ------------------------------------ | ----------- |
| cancel   | 点击遮罩层或右上角叉或取消按钮的回调 | function(e) |
| ok       | 点击确定回调                         | function(e) |

#### 注意

> `<Modal />` 默认关闭后状态不会自动清空, 如果希望每次打开都是新内容，请设置 `destroyOnClose`。

### Modal.method()

包括：

- `Modal.info`
- `Modal.success`
- `Modal.error`
- `Modal.warning`
- `Modal.confirm`

以上均为一个函数，参数为 object，具体属性如下：

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| appContext | 弹窗的上下文，一般用于获取全局注册组件、vuex 等内容 | - | - |  |
| autoFocusButton | 指定自动获得焦点的按钮 | `null` \| `ok` \| `cancel` | `ok` |  |
| cancelButtonProps | cancel 按钮 props | [ButtonProps](/components/button) | - |  |
| cancelText | 取消按钮文字 | string | 取消 |  |
| centered | 垂直居中展示 Modal | boolean | `false` |  |
| class | 容器类名 | string | - |  |
| closable | 是否显示右上角的关闭按钮 | boolean | `false` |  |
| content | 内容 | string \|VNode \|function() | - |  |
| footer | 底部内容，当不需要默认底部按钮时，可以设为 `footer: null` | string \|VNode \|function() | - | 4.0.0 |
| icon | 自定义图标（1.14.0 新增） | VNode \| ()=>VNode | - |  |
| keyboard | 是否支持键盘 esc 关闭 | boolean | true |  |
| mask | 是否展示遮罩 | boolean | true |  |
| maskClosable | 点击蒙层是否允许关闭 | boolean | `false` |  |
| okButtonProps | ok 按钮 props | [ButtonProps](/components/button) | - |  |
| okText | 确认按钮文字 | string | 确定 |  |
| okType | 确认按钮类型 | string | primary |  |
| title | 标题 | string\|VNode \|function() | - |  |
| width | 宽度 | string\|number | 416 |  |
| wrapClassName | 对话框外层容器的类名 | string | - | 3.2.3 |
| zIndex | 设置 Modal 的 `z-index` | number | 1000 |  |
| onCancel | 取消回调，参数为关闭函数，返回 promise 时 resolve 后自动关闭 | function | - |  |
| onOk | 点击确定回调，参数为关闭函数，返回 promise 时 resolve 后自动关闭 | function | - |  |

以上函数调用后，会返回一个引用，可以通过该引用更新和关闭弹窗。

```jsx
const modal = Modal.info();

modal.update({
  title: '修改的标题',
  content: '修改的内容',
});

modal.destroy();
```

- `Modal.destroyAll`

使用 `Modal.destroyAll()` 可以销毁弹出的确认窗（即上述的 Modal.info、Modal.success、Modal.error、Modal.warning、Modal.confirm）。通常用于路由监听当中，处理路由前进、后退不能销毁确认对话框的问题，而不用各处去使用实例的返回值进行关闭（modal.destroy() 适用于主动关闭，而不是路由这样被动关闭）

```jsx
const router = new VueRouter({ ... })

// router change
router.beforeEach((to, from, next) => {
  Modal.destroyAll();
})
```

### Modal.useModal()

当你需要使用 Context 时，可以通过 `Modal.useModal` 创建一个 `contextHolder` 插入子节点中。通过 hooks 创建的临时 Modal 将会得到 `contextHolder` 所在位置的所有上下文。创建的 `modal` 对象拥有与 [`Modal.method`](#modalmethod) 相同的创建通知方法。

````html
<template>
  <contextHolder />
  <!-- <component :is='contextHolder'/> -->
</template>
<script setup>


…(truncated, use `antd-cli components get modal --section api`)

## Demos

- `async` — 异步关闭
- `basic` — 基本用法
- `button-props` — 自定义页脚按钮属性
- `confirm-promise` — 确认对话框(promise)
- `confirm-router` — 销毁确认对话框
- `confirm` — 确认对话框
- `footer` — 自定义页脚
- `fullscreen` — 全屏
- `hook-modal` — 使用useModal获取上下文
- `info` — 信息提示
- `locale` — 国际化
- `manual` — 手动更新和移除

```bash
antd-cli components get modal --json
antd-cli demos list modal --json
antd-cli demos get modal/<demo-id> --json
````

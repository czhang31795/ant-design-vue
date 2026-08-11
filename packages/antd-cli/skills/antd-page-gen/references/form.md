# Form 表单

> 自动生成自组件库文档，细节请用 `antd-cli components get form` / `antd-cli demos get form/<id>`。

## 摘要

高性能表单控件，自带数据域管理。包含数据录入、校验以及对应样式。

## 何时使用

- 用于创建一个实体或收集信息。
- 需要对输入的数据类型进行校验时。

## API（摘要）

### Form

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| colon | 配置 Form.Item 的 colon 的默认值 (只有在属性 layout 为 horizontal 时有效) | boolean | true |  |
| disabled | 设置表单组件禁用，仅对 antdv 组件有效 | boolean | false | 4.0 |
| hideRequiredMark | 隐藏所有表单项的必选标记 | Boolean | false |  |
| labelAlign | label 标签的文本对齐方式 | 'left' \| 'right' | 'right' |  |
| labelCol | label 标签布局，同 `<Col>` 组件，设置 `span` `offset` 值，如 `{span: 3, offset: 12}` 或 `sm: {span: 3, offset: 12}` | [object](/components/grid-cn/#col) |  |  |
| labelWrap | label 标签的文本换行方式 | boolean | false | 3.0 |
| layout | 表单布局 | 'horizontal'\|'vertical'\|'inline' | 'horizontal' |  |
| model | 表单数据对象 | object |  |  |
| name | 表单名称，会作为表单字段 `id` 前缀使用 | string | - | 2.0.0 |
| noStyle | 为 `true` 时不带样式，作为纯字段控件使用 | boolean | false | 3.0 |
| rules | 表单验证规则 | object |  |  |
| scrollToFirstError | 提交失败自动滚动到第一个错误字段 | boolean \| [options](https://github.com/stipsan/scroll-into-view-if-needed/#options) | false | 2.0.0 |
| validateOnRuleChange | 是否在 rules 属性改变后立即触发一次验证 | boolean | true |  |
| validateTrigger | 统一设置字段校验规则 | string \| string\[] | `change` | 2.0.0 |
| wrapperCol | 需要为输入控件设置布局样式时，使用该属性，用法同 labelCol | [object](/components/grid-cn/#col) |  |  |

### 事件

| 事件名称 | 说明 | 回调参数 | 版本 |  |
| --- | --- | --- | --- | --- |
| finish | 提交表单且数据验证成功后回调事件 | function(values) | - | 2.0.0 |
| finishFailed | 提交表单且数据验证失败后回调事件 | function({ values, errorFields, outOfDate }) | - | 2.0.0 |
| submit | 数据验证成功后回调事件 | Function(e:Event) | ｜ |  |
| validate | 任一表单项被校验后触发 | Function(name, status, errorMsgs) |  |  |

### 方法

| 方法名 | 说明 | 参数 | 版本 |
| --- | --- | --- | --- |
| clearValidate | 移除表单项的校验结果。传入待移除的表单项的 name 属性或者 name 组成的数组，如不传则移除整个表单的校验结果 | (nameList?: [NamePath](#namepath)\[]) => void |  |
| resetFields | 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果 | (nameList?: [NamePath](#namepath)\[]) => void |  |
| scrollToField | 滚动到对应字段位置 | (name: [NamePath](#namepath), options: \[[ScrollOptions](https://github.com/stipsan/scroll-into-view-if-needed/tree/ece40bd9143f48caf4b99503425ecb16b0ad8249#options)]) => void |  |
| validate | 触发表单验证, 同 validateFields | (nameList?: [NamePath](#namepath)\[]) => Promise |  |
| validateFields | 触发表单验证 | (nameList?: [NamePath](#namepath)\[]) => Promise |  |

#### NamePath

`string | number | (string | number)[]`

### Form.Item

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| autoLink | 是否自动关联表单域，对于大部分情况都可以使用自动关联，如果不满足自动关联的条件，可以手动关联，参见下方注意事项 | boolean | true |  |
| colon | 配合 label 属性使用，表示是否显示 label 后面的冒号 | boolean | true |  |
| extra | 额外的提示信息，和 help 类似，当需要错误信息和提示文案同时出现时，可以使用这个。 | string\|slot |  |  |
| hasFeedback | 配合 validateStatus 属性使用，展示校验状态图标，建议只配合 Input 组件使用 | boolean | false |  |
| help | 提示信息，如不设置，则会根据校验规则自动生成 | string\|slot |  |  |
| htmlFor | 设置子元素 label `htmlFor` 属性 | string |  |  |
| label | label 标签的文本 | string\|slot |  |  |
| labelAlign | 标签文本对齐方式 | 'left' \| 'right' | 'right' |  |
| labelCol | label 标签布局，同 `<Col>` 组件，设置 `span` `offset` 值，如 `{span: 3, offset: 12}` 或 `sm: {span: 3, offset: 12}` | [object](/components/grid-cn/#col) |  |  |
| name | 表单域 model 字段，在使用 validate、resetFields 方法的情况下，该属性是必填的 | [NamePath](#namepath) |  |  |
| required | 是否必填，如不设置，则会根据校验规则自动生成 | boolean | false |  |
| rules | 表单验证规则 | object \| array |  |  |
| tooltip | 配置提示信息 | string \| slot |  | 4.0.4 |
| validateFirst | 当某一规则校验不通过时，是否停止剩下的规则的校验。 | boolean | false | 2.0.0 |
| validateStatus | 校验状态，如不设置，则会根据校验规则自动生成，可选：'success' 'warning' 'error' 'validating' | string |  |  |
| validateTrigger | 设置字段校验的时机 | string \| string\[] | `change` | 2.0.0 |
| wrapperCol | 需要为输入控件设置布局样式时，使用该属性，用法同 labelCol | [object](/components/grid-cn/#col) |  |  |

### 注意：

#### 3.x

自 3.0 版本以后，Form.Item 不再劫持子元素，而是通过 provider / inject 依赖注入的方式进行自动校验，这种方式可以提高组件性能，子元素也不会限制个数，同样子元素也可以是进一步封装的高级组件。你可以参考[自定义表单控件示例](#components-form-demo-customized-form-controls)

但它同样会有一些缺点：

1、自定义组件如果希望 Form.Item 进行校验展示，你需要 `const {id, onFieldChange, onFieldBlur} = useInje

…(truncated, use `antd-cli components get form --section api`)

## Demos

- `advanced-search` — 高级搜索
- `basic` — 基本使用
- `custom-validation` — 自定义校验规则
- `customized-form-controls` — 自定义表单控件
- `disabled` — 表单禁用
- `dynamic-form-item` — 动态增减表单项
- `dynamic-form-items-complex` — 复杂的动态增减表单项
- `dynamic-form-items` — 动态增减嵌套字段
- `dynamic-rule` — 动态校验规则
- `form-context` — 多表单联动
- `form-in-modal` — 弹出层中的新建表单
- `horizontal-login` — 内联登录栏

```bash
antd-cli components get form --json
antd-cli demos list form --json
antd-cli demos get form/<demo-id> --json
```

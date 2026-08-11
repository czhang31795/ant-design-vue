# DatePicker 日期选择框

> 自动生成自组件库文档，细节请用 `antd-cli components get date-picker` / `antd-cli demos get date-picker/<id>`。

## 摘要

输入或选择日期的控件。

## 何时使用

当用户需要输入一个日期，可以点击标准输入框，弹出日期面板进行选择。

## API（摘要）

日期类组件包括以下形式。

- DatePicker
- DatePicker\[picker="month"]
- DatePicker\[picker="week"]
- DatePicker\[picker="year"]
- DatePicker\[picker="quarter"]
- YearQuarterMonthPicker
- RangePicker

### 国际化配置

默认配置为 en-US，如果你需要设置其他语言，推荐在入口处使用我们提供的国际化组件，详见：[ConfigProvider 国际化](/components/config-provider-cn/)。

如有特殊需求（仅修改单一组件的语言），请使用 locale 参数，参考：[默认配置](https://github.com/vueComponent/ant-design-vue/blob/main/components/date-picker/locale/example.json)。

```html
<template>
  <a-date-picker v-model:value="value" :locale="locale" />
</template>
<script>
  import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
  import { defineComponent } from 'vue';
  export default defineComponent({
    setup() {
      return {
        locale,
        value: null,
      };
    },
  });
</script>
```

```html
<template>
  <a-config-provider :locale="locale">
    <a-date-picker v-model:value="value" />
  </a-config-provider>
</template>
<script>
  // 默认语言为 en-US，如果你需要设置其他语言，推荐在入口文件全局设置 locale
  import dayjs from 'dayjs';
  import 'dayjs/locale/zh-cn';
  import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
  import { defineComponent } from 'vue';
  dayjs.locale('zh-cn');
  export default defineComponent({
    setup() {
      return {
        value: dayjs('2015-01-01', 'YYYY-MM-DD')
        dayjs,
        locale
      };
    },
  });
</script>
```

### 共同的 API

以下 API 为 DatePicker、 RangePicker 共享的 API。

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| allowClear | 是否显示清除按钮 | boolean | true |  |
| autofocus | 自动获取焦点 | boolean | false |  |
| bordered | 是否有边框 | boolean | true |  |
| dateRender | 自定义日期单元格的内容 | v-slot:dateRender="{current, today}" | - |  |
| disabled | 禁用 | boolean | false |  |
| disabledDate | 不可选择的日期 | (currentDate: dayjs) => boolean | - |  |
| format | 设置日期格式，为数组时支持多格式匹配，展示以第一个为准。配置参考 [dayjs](https://day.js.org/docs/zh-CN/display/format)，支持[自定义格式](#components-date-picker-demo-format) | [formatType](#formattype) | `YYYY-MM-DD` |  |
| popupClassName | 额外的弹出日历 className | string | - |  |
| getPopupContainer | 定义浮层的容器，默认为 body 上新建 div | function(trigger) | - |  |
| inputReadOnly | 设置输入框为只读（避免在移动设备上打开虚拟键盘） | boolean | false |  |
| locale | 国际化配置 | object | [默认配置](https://github.com/vueComponent/ant-design-vue/blob/main/components/date-picker/locale/example.json) | - |
| mode | 日期面板的状态 | `time` \| `date` \| `month` \| `year` \| `decade` | - |  |
| nextIcon | 自定义下一个图标 | slot | - | 3.0 |
| open | 控制弹层是否展开 | boolean | - |  |
| picker | 设置选择器类型 | `date` \| `week` \| `month` \| `quarter` \| `year` | `date` | `quarter` |
| placeholder | 输入框提示文字 | string \| \[string, string] | - |  |
| placement | 选择框弹出的位置 | `bottomLeft` `bottomRight` `topLeft` `topRight` | bottomLeft | 3.3.0 |
| popupStyle | 额外的弹出日历样式 | CSSProperties | {} |  |
| prevIcon | 自定义上一个图标 | slot | - | 3.0 |
| presets | 预设时间范围快捷选择 | { label: slot, value: [dayjs](https://day.js.org/) }[] | - | 4.0 |
| size | 输入框大小，`large` 高度为 40px，`small` 为 24px，默认是 32px | `large` \| `middle` \| `small` | - |  |
| status | 设置校验状态 | 'error' \| 'warning' | - | 3.3.0 |
| suffixIcon | 自定义的选择框后缀图标 | v-slot:suffixIcon | - |  |
| superNextIcon | 自定义 `<<` 切换图标 | slot | - | 3.0 |
| superPrevIcon | 自定义 `>>` 切换图标 | slot | - | 3.0 |
| valueFormat | 可选，绑定值的格式，对 value、defaultValue、defaultPickerValue 起作用。不指定则绑定值为 dayjs 对象 | string，[具体格式](https://day.js.org/docs/zh-CN/display/format) | - |  |

### 共有的事件

| 事件名称    | 说明                     | 回调参数              |     |
| ----------- | ------------------------ | --------------------- | --- |
| openChange  | 弹出日历和关闭日历的回调 | function(status)      |     |
| panelChange | 日期面板变化时的回调     | function(value, mode) | -   |

### 共同的方法

| 名称    | 描述     |
| ------- | -------- |
| blur()  | 移除焦点 |
| focus() | 获取焦点 |

### DatePicker

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| defaultPickerValue | 默认面板日期 | [dayjs](https://day.js.org/) | - |  |
| disabledTime | 不可选择的时间 | function(date) | - |  |
| format | 展示的日期格式，配置参考 [dayjs](https://day.js.org/docs |

…(truncated, use `antd-cli components get date-picker --section api`)

## Demos

- `basic` — 基本用法
- `bordered` — 无边框
- `date-render` — 定制日期单元格
- `disabled-date` — 不可选择日期和时间
- `disabled` — 禁用
- `extra-footer` — 额外的页脚
- `format` — 日期格式
- `mode` — 受控面板
- `placement` — 弹出位置
- `presetted-ranges` — 预设范围
- `range-picker` — 范围选择器
- `select-in-range` — 选择不超过七天的范围

```bash
antd-cli components get date-picker --json
antd-cli demos list date-picker --json
antd-cli demos get date-picker/<demo-id> --json
```

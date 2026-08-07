<docs>
---
order: 12
title:
  zh-CN: 年 / 季 / 月同屏选择
  en-US: Year Quarter Month Panel
---

## zh-CN

使用封装好的 `YearQuarterMonthPicker`，同一个面板内可选择年、季度或月份。展示格式：年 `YYYY`、季 `YYYY-[Q]Q`、月 `YYYY-MM`。

## en-US

Use `YearQuarterMonthPicker` to select year, quarter, or month in one panel. Formats: year `YYYY`, quarter `YYYY-[Q]Q`, month `YYYY-MM`.

</docs>

<template>
  <a-space direction="vertical" :size="12">
    <YearQuarterMonthPicker
      v-model:value="value"
      v-model:period-type="periodType"
      style="width: 280px"
      @change="onChange"
    />
    <div>
      当前值：
      <code>{{ text || '未选择' }}</code>
      <span style="margin-left: 8px; color: rgba(0, 0, 0, 0.45); font-size: 12px">
        （periodType: {{ periodType }}）
      </span>
    </div>
  </a-space>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import dayjs, { type Dayjs } from 'dayjs';
import YearQuarterMonthPicker, {
  formatYearQuarterMonth,
  type YearQuarterMonthPeriodType,
} from '../YearQuarterMonthPicker';

const value = ref<Dayjs>(dayjs().month(6).startOf('month'));
const periodType = ref<YearQuarterMonthPeriodType>('month');
const text = computed(() => formatYearQuarterMonth(value.value, periodType.value));

const onChange = (_val: Dayjs | null, type: YearQuarterMonthPeriodType, dateString: string) => {
  console.log('change', type, dateString);
};
</script>

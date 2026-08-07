import type { Dayjs } from 'dayjs';
import type { App, ExtractPropTypes, PropType } from 'vue';
import { computed, defineComponent, ref, watch } from 'vue';
import dayjs from 'dayjs';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';
import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons-vue';
import { booleanType, functionType, someType, stringType } from '../_util/type';
import initDefaultProps from '../_util/props-util/initDefaultProps';
import DatePicker from './dayjs';
import './style/year-quarter-month.css';

dayjs.extend(quarterOfYear);

export type YearQuarterMonthPeriodType = 'year' | 'quarter' | 'month';

export const YEAR_FORMAT = 'YYYY';
export const QUARTER_FORMAT = 'YYYY-[Q]Q';
export const MONTH_FORMAT = 'YYYY-MM';

const MONTH_LABELS = [
  ['一月', '二月', '三月'],
  ['四月', '五月', '六月'],
  ['七月', '八月', '九月'],
  ['十月', '十一月', '十二月'],
] as const;

export function formatYearQuarterMonth(
  value: Dayjs | null | undefined,
  periodType: YearQuarterMonthPeriodType,
) {
  if (!value) {
    return '';
  }
  if (periodType === 'year') {
    return value.format(YEAR_FORMAT);
  }
  if (periodType === 'quarter') {
    return value.format(QUARTER_FORMAT);
  }
  return value.format(MONTH_FORMAT);
}

const yearQuarterMonthPickerProps = () => ({
  value: someType<Dayjs | null>([Object]),
  periodType: stringType<YearQuarterMonthPeriodType>('month'),
  open: booleanType(),
  placeholder: stringType('选择年 / 季 / 月'),
  allowClear: booleanType(true),
  disabled: booleanType(false),
  inputReadOnly: booleanType(true),
  getPopupContainer: functionType<(node: HTMLElement) => HTMLElement>(),
  onChange:
    functionType<
      (value: Dayjs | null, periodType: YearQuarterMonthPeriodType, dateString: string) => void
    >(),
  'onUpdate:value': functionType<(value: Dayjs | null) => void>(),
  'onUpdate:periodType': functionType<(value: YearQuarterMonthPeriodType) => void>(),
  'onUpdate:open': functionType<(value: boolean) => void>(),
  onOpenChange: functionType<(value: boolean) => void>(),
});

export type YearQuarterMonthPickerProps = Partial<
  ExtractPropTypes<ReturnType<typeof yearQuarterMonthPickerProps>>
>;

const YqmPanel = defineComponent({
  name: 'AYearQuarterMonthPanel',
  props: {
    viewYear: { type: Number, required: true },
    value: { type: Object as PropType<Dayjs | null>, default: null },
    periodType: { type: String as PropType<YearQuarterMonthPeriodType>, required: true },
    onViewYearChange: Function as PropType<(year: number) => void>,
    onSelectYear: Function as PropType<() => void>,
    onSelectQuarter: Function as PropType<(quarter: number) => void>,
    onSelectMonth: Function as PropType<(monthIndex: number) => void>,
  },
  setup(props) {
    return () => {
      const year = props.viewYear;
      const selectedYear =
        !!props.value && props.periodType === 'year' && props.value.year() === year;
      return (
        <div class="ant-picker-yqm-panel" onMousedown={e => e.preventDefault()}>
          <div class="ant-picker-yqm-header">
            <button
              type="button"
              class="ant-picker-yqm-nav-btn"
              onClick={() => props.onViewYearChange?.(year - 1)}
            >
              <DoubleLeftOutlined />
            </button>
            <button
              type="button"
              class={[
                'ant-picker-yqm-year-btn',
                selectedYear ? 'ant-picker-yqm-cell-selected' : '',
              ]}
              onClick={() => props.onSelectYear?.()}
            >
              {year}
            </button>
            <button
              type="button"
              class="ant-picker-yqm-nav-btn"
              onClick={() => props.onViewYearChange?.(year + 1)}
            >
              <DoubleRightOutlined />
            </button>
          </div>
          <div class="ant-picker-yqm-body">
            {MONTH_LABELS.map((months, qIndex) => {
              const quarter = qIndex + 1;
              const selectedQuarter =
                !!props.value &&
                props.periodType === 'quarter' &&
                props.value.year() === year &&
                props.value.quarter() === quarter;
              return (
                <div class="ant-picker-yqm-row" key={quarter}>
                  <button
                    type="button"
                    class={[
                      'ant-picker-yqm-cell',
                      'ant-picker-yqm-quarter',
                      selectedQuarter ? 'ant-picker-yqm-cell-selected' : '',
                    ]}
                    onClick={() => props.onSelectQuarter?.(quarter)}
                  >
                    {`Q${quarter}`}
                  </button>
                  {months.map((label, i) => {
                    const monthIndex = qIndex * 3 + i;
                    const selectedMonth =
                      !!props.value &&
                      props.periodType === 'month' &&
                      props.value.year() === year &&
                      props.value.month() === monthIndex;
                    return (
                      <button
                        type="button"
                        key={monthIndex}
                        class={[
                          'ant-picker-yqm-cell',
                          'ant-picker-yqm-month',
                          selectedMonth ? 'ant-picker-yqm-cell-selected' : '',
                        ]}
                        onClick={() => props.onSelectMonth?.(monthIndex)}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      );
    };
  },
});

const YearQuarterMonthPicker = defineComponent({
  name: 'AYearQuarterMonthPicker',
  inheritAttrs: false,
  props: initDefaultProps(yearQuarterMonthPickerProps(), {
    periodType: 'month',
    placeholder: '选择年 / 季 / 月',
    allowClear: true,
    inputReadOnly: true,
  }),
  setup(props, { attrs, emit }) {
    const innerOpen = ref(false);
    const viewYear = ref((props.value || dayjs()).year());

    const mergedOpen = computed(() => (props.open === undefined ? innerOpen.value : props.open));
    const periodText = computed(() => formatYearQuarterMonth(props.value, props.periodType));

    watch(
      () => props.value,
      val => {
        if (val) {
          viewYear.value = val.year();
        }
      },
    );

    const setOpen = (next: boolean) => {
      if (props.open === undefined) {
        innerOpen.value = next;
      }
      emit('update:open', next);
      emit('openChange', next);
      if (next && props.value) {
        viewYear.value = props.value.year();
      }
    };

    const commit = (next: Dayjs, nextType: YearQuarterMonthPeriodType) => {
      const dateString = formatYearQuarterMonth(next, nextType);
      emit('update:value', next);
      emit('update:periodType', nextType);
      emit('change', next, nextType, dateString);
      setOpen(false);
    };

    const format = (val: Dayjs) => formatYearQuarterMonth(val, props.periodType);

    const panelRender = () => (
      <YqmPanel
        viewYear={viewYear.value}
        value={props.value}
        periodType={props.periodType}
        onViewYearChange={year => {
          viewYear.value = year;
        }}
        onSelectYear={() => commit(dayjs(`${viewYear.value}-01-01`), 'year')}
        onSelectQuarter={quarter => {
          const month = (quarter - 1) * 3;
          commit(dayjs().year(viewYear.value).month(month).startOf('month'), 'quarter');
        }}
        onSelectMonth={monthIndex => {
          commit(dayjs().year(viewYear.value).month(monthIndex).startOf('month'), 'month');
        }}
      />
    );

    return () => (
      <DatePicker
        {...attrs}
        value={props.value}
        open={mergedOpen.value}
        format={format}
        placeholder={props.placeholder}
        allowClear={props.allowClear}
        disabled={props.disabled}
        inputReadOnly={props.inputReadOnly}
        getPopupContainer={props.getPopupContainer}
        class={[
          attrs.class,
          'ant-picker-yqm',
          `ant-picker-yqm-${viewYear.value}-${props.periodType}-${periodText.value}`,
        ]}
        panelRender={panelRender}
        onUpdate:value={(val: Dayjs | null) => emit('update:value', val)}
        onOpenChange={setOpen}
      />
    );
  },
});

YearQuarterMonthPicker.install = (app: App) => {
  app.component(YearQuarterMonthPicker.name, YearQuarterMonthPicker);
  return app;
};

export default YearQuarterMonthPicker;

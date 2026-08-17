import type { Dayjs } from 'dayjs';
import type { App } from 'vue';
import { registerComponent } from '../_util/registerComponent';
import dayjsGenerateConfig from '../vc-picker/generate/dayjs';
import type {
  PickerProps,
  PickerDateProps,
  RangePickerProps as BaseRangePickerProps,
} from './generatePicker';
import generatePicker from './generatePicker';
import type { ExtraDatePickerProps, ExtraRangePickerProps } from './generatePicker/props';
import YearQuarterMonthPicker from './YearQuarterMonthPicker';

export type DatePickerProps = PickerProps<Dayjs> & ExtraDatePickerProps<Dayjs>;
export type MonthPickerProps = Omit<PickerDateProps<Dayjs>, 'picker'> & ExtraDatePickerProps<Dayjs>;
export type WeekPickerProps = Omit<PickerDateProps<Dayjs>, 'picker'> & ExtraDatePickerProps<Dayjs>;
export type RangePickerProps = BaseRangePickerProps<Dayjs> & ExtraRangePickerProps<Dayjs>;
export type {
  YearQuarterMonthPickerProps,
  YearQuarterMonthPeriodType,
} from './YearQuarterMonthPicker';
export {
  formatYearQuarterMonth,
  YEAR_FORMAT,
  QUARTER_FORMAT,
  MONTH_FORMAT,
} from './YearQuarterMonthPicker';

const { DatePicker, WeekPicker, MonthPicker, YearPicker, TimePicker, QuarterPicker, RangePicker } =
  generatePicker<Dayjs>(dayjsGenerateConfig);

/* istanbul ignore next */
export { RangePicker, WeekPicker, MonthPicker, QuarterPicker, YearQuarterMonthPicker };

export default Object.assign(DatePicker, {
  WeekPicker,
  MonthPicker,
  YearPicker,
  RangePicker,
  TimePicker,
  QuarterPicker,
  YearQuarterMonthPicker,
  install: (app: App) => {
    registerComponent(app, DatePicker);
    registerComponent(app, RangePicker);
    registerComponent(app, MonthPicker);
    registerComponent(app, WeekPicker);
    registerComponent(app, QuarterPicker);
    registerComponent(app, YearQuarterMonthPicker);
    return app;
  },
});

import type { ExtractPropTypes } from 'vue';
import { selectProps as vcSelectProps } from '../vc-select';
import PropTypes from '../_util/vue-types';
import omit from '../_util/omit';
import type { SelectCommonPlacement } from '../_util/transition';
import type { SizeType } from '../config-provider';
import type { InputStatus } from '../_util/statusUtils';
import { stringType, someType, functionType, booleanType } from '../_util/type';

type RawValue = string | number;

export interface LabeledValue {
  key?: string;
  value: RawValue;
  label?: any;
}
export type SelectValue = RawValue | RawValue[] | LabeledValue | LabeledValue[] | undefined;

export const selectProps = () => ({
  ...omit(vcSelectProps<SelectValue>(), [
    'inputIcon',
    'mode',
    'getInputElement',
    'getRawInputElement',
    'backfill',
  ]),
  value: someType<SelectValue>([Array, Object, String, Number]),
  defaultValue: someType<SelectValue>([Array, Object, String, Number]),
  notFoundContent: PropTypes.any,
  suffixIcon: PropTypes.any,
  itemIcon: PropTypes.any,
  size: stringType<SizeType>(),
  mode: stringType<'multiple' | 'tags' | 'SECRET_COMBOBOX_MODE_DO_NOT_USE'>(),
  bordered: booleanType(true),
  transitionName: String,
  choiceTransitionName: stringType(''),
  popupClassName: String,
  /** @deprecated Please use `popupClassName` instead */
  dropdownClassName: String,
  placement: stringType<SelectCommonPlacement>(),
  status: stringType<InputStatus>(),
  'onUpdate:value': functionType<(val: SelectValue) => void>(),
});

export type SelectProps = Partial<ExtractPropTypes<ReturnType<typeof selectProps>>>;

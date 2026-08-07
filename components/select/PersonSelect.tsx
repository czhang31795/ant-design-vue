import type { App, ExtractPropTypes } from 'vue';
import { computed, defineComponent, ref } from 'vue';
import omit from '../_util/omit';
import { booleanType, functionType, someType, stringType } from '../_util/type';
import initDefaultProps from '../_util/props-util/initDefaultProps';
import Avatar from '../avatar';
import Tag from '../tag';
import type { DefaultOptionType } from '../vc-select/Select';
import type { SelectValue } from './props';
import { selectProps } from './props';
import Select from './index';
import './style/person-select.css';

export interface PersonOptionType extends DefaultOptionType {
  avatar?: string;
  [key: string]: any;
}

const personSelectProps = () => ({
  ...omit(selectProps(), ['optionLabelProp', 'tagRender', 'filterOption']),
  options: someType<PersonOptionType[]>([Array], []),
  /** option 上头像字段名 */
  avatarKey: stringType('avatar'),
  /** 下拉项是否展示 value 作为次要信息 */
  showOptionValue: booleanType(true),
  filterOption: someType<boolean | ((input: string, option: PersonOptionType) => boolean)>([
    Boolean,
    Function,
  ]),
  'onUpdate:value': functionType<(val: SelectValue) => void>(),
});

export type PersonSelectProps = Partial<ExtractPropTypes<ReturnType<typeof personSelectProps>>>;

function defaultFilterOption(input: string, option: PersonOptionType) {
  const keyword = input.trim().toLowerCase();
  if (!keyword) {
    return true;
  }
  return (
    String(option?.label ?? '')
      .toLowerCase()
      .includes(keyword) ||
    String(option?.value ?? '')
      .toLowerCase()
      .includes(keyword)
  );
}

const PersonSelect = defineComponent({
  name: 'APersonSelect',
  inheritAttrs: false,
  props: initDefaultProps(personSelectProps(), {
    avatarKey: 'avatar',
    showOptionValue: true,
    showSearch: true,
    optionFilterProp: 'label',
    placeholder: '请选择人员',
  }),
  setup(props, { attrs, emit, expose }) {
    const selectRef = ref<any>(null);
    const isMultiple = computed(() => props.mode === 'multiple' || props.mode === 'tags');

    const mergedFilterOption = computed(() => {
      if (props.filterOption === false) {
        return false;
      }
      if (typeof props.filterOption === 'function') {
        return props.filterOption;
      }
      return defaultFilterOption;
    });

    const getAvatar = (option?: PersonOptionType) => {
      if (!option) {
        return undefined;
      }
      return option[props.avatarKey as string] as string | undefined;
    };

    expose({
      focus: () => selectRef.value?.focus?.(),
      blur: () => selectRef.value?.blur?.(),
      scrollTo: (...args: any[]) => selectRef.value?.scrollTo?.(...args),
    });

    return () => {
      const selectPropsValue = omit(props, [
        'avatarKey',
        'showOptionValue',
        'filterOption',
        'onUpdate:value',
      ]);

      return (
        <Select
          {...attrs}
          {...selectPropsValue}
          ref={selectRef}
          class={['ant-person-select', attrs.class]}
          optionLabelProp="label"
          filterOption={mergedFilterOption.value as any}
          onUpdate:value={(val: SelectValue) => emit('update:value', val)}
          v-slots={{
            option: (option: PersonOptionType) => (
              <div class="ant-person-select-option">
                <Avatar size={24} src={getAvatar(option)} />
                <span class="ant-person-select-option-name">{option.label}</span>
                {props.showOptionValue ? (
                  <span class="ant-person-select-option-id">{option.value}</span>
                ) : null}
              </div>
            ),
            optionLabel: (option: PersonOptionType) => (
              <span class="ant-person-select-option ant-person-select-option-selected">
                <Avatar size={20} src={getAvatar(option)} />
                <span class="ant-person-select-option-name">{option.label}</span>
              </span>
            ),
            ...(isMultiple.value
              ? {
                  tagRender: ({
                    label,
                    closable,
                    onClose,
                    option,
                  }: {
                    label: any;
                    closable: boolean;
                    onClose: (e?: Event) => void;
                    option: PersonOptionType;
                  }) => (
                    <Tag class="ant-person-select-tag" closable={closable} onClose={onClose as any}>
                      <Avatar size={16} src={getAvatar(option)} />
                      <span>{label}</span>
                    </Tag>
                  ),
                }
              : {}),
          }}
        />
      );
    };
  },
});

PersonSelect.install = (app: App) => {
  app.component(PersonSelect.name as string, PersonSelect);
  return app;
};

// Attach without forcing Select entry to eagerly load PersonSelect
(Select as any).PersonSelect = PersonSelect;

export default PersonSelect;

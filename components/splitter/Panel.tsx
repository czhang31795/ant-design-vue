import type { CSSProperties } from 'vue';
import { computed, defineComponent } from 'vue';
import classNames from '../_util/classNames';
import { someType, stringType } from '../_util/type';
import { panelProps } from './interface';

const Panel = defineComponent({
  name: 'XySplitterPanel',
  inheritAttrs: false,
  props: {
    ...panelProps(),
    /** Injected by Splitter: calculated flex size */
    flexSize: someType<number | string>([Number, String]),
    prefixCls: stringType(),
  },
  setup(props, { slots, attrs }) {
    const hasSize = computed(
      () => props.flexSize !== undefined && props.flexSize !== null && props.flexSize !== '',
    );
    const isCollapsed = computed(() => {
      const size = props.flexSize;
      return size === 0 || (typeof size === 'string' && Number.parseFloat(size) === 0);
    });
    const flexBasis = computed(() => {
      if (!hasSize.value) {
        return 'auto';
      }
      return typeof props.flexSize === 'number' ? `${props.flexSize}px` : props.flexSize;
    });

    return () => {
      const prefixCls = props.prefixCls || 'xy-splitter';
      return (
        <div
          {...attrs}
          class={classNames(
            `${prefixCls}-panel`,
            {
              [`${prefixCls}-panel-hidden`]: isCollapsed.value,
            },
            props.className,
            attrs.class,
          )}
          style={[
            attrs.style as CSSProperties,
            props.style,
            {
              flexBasis: flexBasis.value,
              flexGrow: hasSize.value ? 0 : 1,
              flexShrink: 0,
            },
          ]}
        >
          {!(props.destroyOnHidden && isCollapsed.value) && slots.default?.()}
        </div>
      );
    };
  },
});

export default Panel;

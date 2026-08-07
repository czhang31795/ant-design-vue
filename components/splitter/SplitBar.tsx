import { DownOutlined, LeftOutlined, RightOutlined, UpOutlined } from '@ant-design/icons-vue';
import { computed, defineComponent, onBeforeUnmount, ref, watch } from 'vue';
import classNames from '../_util/classNames';
import { booleanType, functionType, someType } from '../_util/type';
import type { ShowCollapsibleIconMode } from './interface';

const getValidNumber = (num?: number) => {
  return typeof num === 'number' && Number.isFinite(num) ? Math.round(num) : 0;
};

export default defineComponent({
  name: 'ASplitterSplitBar',
  props: {
    index: Number,
    active: booleanType(),
    prefixCls: String,
    vertical: booleanType(),
    resizable: booleanType(),
    lazy: booleanType(),
    startCollapsible: booleanType(),
    endCollapsible: booleanType(),
    showStartCollapsibleIcon: someType<ShowCollapsibleIconMode>([Boolean, String]),
    showEndCollapsibleIcon: someType<ShowCollapsibleIconMode>([Boolean, String]),
    ariaNow: Number,
    ariaMin: Number,
    ariaMax: Number,
    containerSize: Number,
    onOffsetStart: functionType<(index: number) => void>(),
    onOffsetUpdate:
      functionType<(index: number, offsetX: number, offsetY: number, lazyEnd?: boolean) => void>(),
    onOffsetEnd: functionType<(lazyEnd?: boolean) => void>(),
    onCollapse: functionType<(index: number, type: 'start' | 'end') => void>(),
  },
  setup(props) {
    const splitBarPrefixCls = computed(() => `${props.prefixCls}-bar`);
    const startPos = ref<[number, number] | null>(null);
    const constrainedOffset = ref(0);

    const constrainedOffsetX = computed(() => (props.vertical ? 0 : constrainedOffset.value));
    const constrainedOffsetY = computed(() => (props.vertical ? constrainedOffset.value : 0));

    const getConstrainedOffset = (rawOffset: number) => {
      const containerSize = props.containerSize || 0;
      const currentPos = (containerSize * (props.ariaNow || 0)) / 100;
      const newPos = currentPos + rawOffset;
      const minAllowed = Math.max(0, (containerSize * (props.ariaMin || 0)) / 100);
      const maxAllowed = Math.min(containerSize, (containerSize * (props.ariaMax || 100)) / 100);
      const clampedPos = Math.max(minAllowed, Math.min(maxAllowed, newPos));
      return clampedPos - currentPos;
    };

    const clearListeners = () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!startPos.value) {
        return;
      }
      const offsetX = e.pageX - startPos.value[0];
      const offsetY = e.pageY - startPos.value[1];
      if (props.lazy) {
        constrainedOffset.value = getConstrainedOffset(props.vertical ? offsetY : offsetX);
      } else {
        props.onOffsetUpdate?.(props.index!, offsetX, offsetY);
      }
    };

    const onMouseUp = () => {
      if (props.lazy) {
        props.onOffsetUpdate?.(
          props.index!,
          constrainedOffsetX.value,
          constrainedOffsetY.value,
          true,
        );
        constrainedOffset.value = 0;
        props.onOffsetEnd?.(true);
      } else {
        props.onOffsetEnd?.();
      }
      startPos.value = null;
      clearListeners();
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!startPos.value || e.touches.length !== 1) {
        return;
      }
      const touch = e.touches[0];
      const offsetX = touch.pageX - startPos.value[0];
      const offsetY = touch.pageY - startPos.value[1];
      if (props.lazy) {
        constrainedOffset.value = getConstrainedOffset(props.vertical ? offsetY : offsetX);
      } else {
        props.onOffsetUpdate?.(props.index!, offsetX, offsetY);
      }
    };

    const onTouchEnd = () => {
      onMouseUp();
    };

    const onMouseDown = (e: MouseEvent) => {
      e.stopPropagation();
      if (props.resizable) {
        startPos.value = [e.pageX, e.pageY];
        props.onOffsetStart?.(props.index!);
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      if (props.resizable && e.touches.length === 1) {
        const touch = e.touches[0];
        startPos.value = [touch.pageX, touch.pageY];
        props.onOffsetStart?.(props.index!);
        window.addEventListener('touchmove', onTouchMove);
        window.addEventListener('touchend', onTouchEnd);
      }
    };

    onBeforeUnmount(() => {
      clearListeners();
    });

    watch(
      () => props.active,
      active => {
        if (!active) {
          startPos.value = null;
        }
      },
    );

    const getVisibilityClass = (mode?: ShowCollapsibleIconMode) => {
      switch (mode) {
        case true:
          return `${splitBarPrefixCls.value}-collapse-bar-always-visible`;
        case false:
          return `${splitBarPrefixCls.value}-collapse-bar-always-hidden`;
        case 'auto':
        default:
          return `${splitBarPrefixCls.value}-collapse-bar-hover-only`;
      }
    };

    const startIcon = computed(() => (props.vertical ? <UpOutlined /> : <LeftOutlined />));
    const endIcon = computed(() => (props.vertical ? <DownOutlined /> : <RightOutlined />));

    return () => {
      const barCls = splitBarPrefixCls.value;
      return (
        <div class={barCls}>
          {props.lazy && (
            <div
              class={classNames(`${barCls}-preview`, {
                [`${barCls}-preview-active`]: !!startPos.value,
              })}
              style={{
                transform: props.vertical
                  ? `translateY(${constrainedOffset.value}px)`
                  : `translateX(${constrainedOffset.value}px)`,
              }}
            />
          )}
          <div
            class={classNames(`${barCls}-dragger`, {
              [`${barCls}-dragger-active`]: props.active,
              [`${barCls}-dragger-disabled`]: !props.resizable,
            })}
            role="separator"
            aria-disabled={!props.resizable}
            aria-orientation={props.vertical ? 'horizontal' : 'vertical'}
            aria-valuenow={getValidNumber(props.ariaNow)}
            aria-valuemin={getValidNumber(props.ariaMin)}
            aria-valuemax={getValidNumber(props.ariaMax)}
            onMousedown={onMouseDown}
            onTouchstart={onTouchStart}
          />
          {props.startCollapsible && (
            <div
              class={classNames(
                `${barCls}-collapse-bar`,
                `${barCls}-collapse-bar-start`,
                getVisibilityClass(props.showStartCollapsibleIcon),
              )}
              onClick={() => props.onCollapse?.(props.index!, 'start')}
            >
              <span class={`${barCls}-collapse-icon`}>{startIcon.value}</span>
            </div>
          )}
          {props.endCollapsible && (
            <div
              class={classNames(
                `${barCls}-collapse-bar`,
                `${barCls}-collapse-bar-end`,
                getVisibilityClass(props.showEndCollapsibleIcon),
              )}
              onClick={() => props.onCollapse?.(props.index!, 'end')}
            >
              <span class={`${barCls}-collapse-icon`}>{endIcon.value}</span>
            </div>
          )}
        </div>
      );
    };
  },
});

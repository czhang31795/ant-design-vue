import type { CSSProperties, ExtractPropTypes, VNode } from 'vue';
import { booleanType, functionType, someType, stringType } from '../_util/type';

export type ShowCollapsibleIconMode = boolean | 'auto';

export type PanelCollapsible =
  | boolean
  | {
      start?: boolean;
      end?: boolean;
      showCollapsibleIcon?: ShowCollapsibleIconMode;
    };

export const panelProps = () => ({
  className: String,
  style: someType<CSSProperties>([Object]),
  min: someType<number | string>([Number, String]),
  max: someType<number | string>([Number, String]),
  size: someType<number | string>([Number, String]),
  defaultSize: someType<number | string>([Number, String]),
  resizable: booleanType(true),
  collapsible: someType<PanelCollapsible>([Boolean, Object]),
  destroyOnHidden: booleanType(),
});

export type PanelProps = Partial<ExtractPropTypes<ReturnType<typeof panelProps>>>;

export const splitterProps = () => ({
  prefixCls: String,
  layout: stringType<'horizontal' | 'vertical'>(),
  orientation: stringType<'horizontal' | 'vertical'>(),
  vertical: booleanType(),
  lazy: booleanType(false),
  onResizeStart: functionType<(sizes: number[]) => void>(),
  onResize: functionType<(sizes: number[]) => void>(),
  onResizeEnd: functionType<(sizes: number[]) => void>(),
  onCollapse: functionType<(collapsed: boolean[], sizes: number[]) => void>(),
  'onUpdate:sizes': functionType<(sizes: number[]) => void>(),
});

export type SplitterProps = Partial<ExtractPropTypes<ReturnType<typeof splitterProps>>>;

export type ItemType = Omit<PanelProps, 'collapsible'> & {
  key?: string | number;
  class?: any;
  style?: CSSProperties;
  collapsible: {
    start?: boolean;
    end?: boolean;
    showCollapsibleIcon: ShowCollapsibleIconMode;
  };
  content?: (() => any) | VNode[] | any;
};

export type ResizableInfo = {
  resizable: boolean;
  startCollapsible: boolean;
  endCollapsible: boolean;
  showStartCollapsibleIcon: ShowCollapsibleIconMode;
  showEndCollapsibleIcon: ShowCollapsibleIconMode;
};

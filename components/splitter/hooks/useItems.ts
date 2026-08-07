import type { VNode } from 'vue';
import { flattenChildren, isValidElement } from '../../_util/props-util';
import type { ItemType, PanelCollapsible, PanelProps, ShowCollapsibleIconMode } from '../interface';
import Panel from '../Panel';

function isPlainObject(val: unknown): val is Record<string, any> {
  return Object.prototype.toString.call(val) === '[object Object]';
}

function normalizeBool(val: unknown, defaultVal = false) {
  if (val === undefined || val === null) {
    return defaultVal;
  }
  if (val === '' || val === true || val === 'true') {
    return true;
  }
  if (val === false || val === 'false') {
    return false;
  }
  return Boolean(val);
}

function getCollapsible(collapsible?: PanelCollapsible): ItemType['collapsible'] {
  if (isPlainObject(collapsible)) {
    return {
      start: normalizeBool(collapsible.start, false),
      end: normalizeBool(collapsible.end, false),
      showCollapsibleIcon:
        collapsible.showCollapsibleIcon === undefined
          ? 'auto'
          : (collapsible.showCollapsibleIcon as ShowCollapsibleIconMode),
    };
  }

  const mergedCollapsible = normalizeBool(collapsible, false);
  return {
    start: mergedCollapsible,
    end: mergedCollapsible,
    showCollapsibleIcon: 'auto',
  };
}

export function isPanelVNode(vnode: VNode) {
  const type = vnode.type as any;
  const name = type?.name || type?.displayName || '';
  return type === Panel || name === 'ASplitterPanel' || name === 'SplitterPanel';
}

function normalizePanelProps(rawProps?: Record<string, any> | null): PanelProps {
  const props = rawProps || {};
  return {
    className: props.className ?? props.class,
    style: props.style,
    min: props.min,
    max: props.max,
    size: props.size,
    defaultSize: props.defaultSize ?? props['default-size'],
    resizable: normalizeBool(props.resizable, true),
    collapsible: props.collapsible,
    destroyOnHidden: normalizeBool(props.destroyOnHidden ?? props['destroy-on-hidden'], false),
  };
}

export default function getPanelInfos(children: any): { vnode: VNode; info: ItemType }[] {
  return flattenChildren(children)
    .filter((item: any) => isValidElement(item) && isPanelVNode(item))
    .map((node: VNode, index: number) => {
      const { collapsible, ...restProps } = normalizePanelProps((node.props || {}) as any);
      return {
        vnode: node,
        info: {
          ...restProps,
          key: (node.key as any) ?? index,
          collapsible: getCollapsible(collapsible),
          content: null,
        } as ItemType,
      };
    });
}

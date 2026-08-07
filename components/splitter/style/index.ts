import type { CSSObject } from '../../_util/cssinjs';
import { resetComponent } from '../../style';
import type { FullToken, GenerateStyle } from '../../theme/internal';
import { genComponentStyleHook, mergeToken } from '../../theme/internal';

export interface ComponentToken {
  /**
   * @desc 拖拽标识元素大小
   * @descEN Drag and drop the identity element size
   */
  splitBarDraggableSize: number;
  /**
   * @desc 拖拽元素显示大小
   * @descEN Drag the element display size
   */
  splitBarSize: number;
  /**
   * @desc 拖拽触发区域大小
   * @descEN Drag and drop trigger area size
   */
  splitTriggerSize: number;
}

interface SplitterToken extends FullToken<'Splitter'> {}

const centerStyle: CSSObject = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
};

const genSplitterStyle: GenerateStyle<SplitterToken> = token => {
  const {
    componentCls,
    colorFill,
    splitBarDraggableSize,
    splitBarSize,
    splitTriggerSize,
    controlItemBgHover,
    controlItemBgActive,
    controlItemBgActiveHover,
  } = token;

  const splitBarCls = `${componentCls}-bar`;
  const splitMaskCls = `${componentCls}-mask`;
  const splitPanelCls = `${componentCls}-panel`;
  const halfTriggerSize = splitTriggerSize / 2;

  const splitterBarPreviewStyle: CSSObject = {
    position: 'absolute',
    background: token.colorPrimary,
    opacity: 0.2,
    pointerEvents: 'none',
    transition: 'none',
    zIndex: 1,
    display: 'none',
  };

  return {
    [componentCls]: {
      ...resetComponent(token),
      display: 'flex',
      width: '100%',
      height: '100%',
      alignItems: 'stretch',

      [`> ${splitBarCls}`]: {
        flex: 'none',
        position: 'relative',
        userSelect: 'none',

        [`${splitBarCls}-dragger`]: {
          ...centerStyle,
          zIndex: 1,

          '&::before': {
            content: '""',
            background: controlItemBgHover,
            ...centerStyle,
          },

          '&::after': {
            content: '""',
            background: colorFill,
            ...centerStyle,
          },

          [`&:hover:not(${splitBarCls}-dragger-active)`]: {
            '&::before': {
              background: controlItemBgActive,
            },
          },

          '&-active': {
            zIndex: 2,
            '&::before': {
              background: controlItemBgActiveHover,
            },
          },

          [`&-disabled`]: {
            zIndex: 0,
            '&, &:hover, &-active': {
              cursor: 'default',
              '&::before': {
                background: controlItemBgHover,
              },
            },
            '&::after': {
              display: 'none',
            },
          },
        },

        [`${splitBarCls}-collapse-bar`]: {
          ...centerStyle,
          zIndex: token.zIndexPopupBase,
          background: controlItemBgHover,
          fontSize: token.fontSizeSM,
          borderRadius: token.borderRadiusXS,
          color: token.colorText,
          cursor: 'pointer',
          opacity: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',

          '&:hover': {
            background: controlItemBgActive,
          },
          '&:active': {
            background: controlItemBgActiveHover,
          },

          [`${splitBarCls}-collapse-icon`]: {
            display: 'flex',
            alignItems: 'center',
          },
        },

        '&:hover, &:active, &:focus-within': {
          [`${splitBarCls}-collapse-bar-hover-only`]: {
            opacity: 1,
          },
        },

        [`${splitBarCls}-collapse-bar-always-hidden`]: {
          display: 'none',
        },
        [`${splitBarCls}-collapse-bar-always-visible`]: {
          opacity: 1,
        },
      },

      [splitMaskCls]: {
        position: 'fixed',
        zIndex: token.zIndexPopupBase,
        inset: 0,
        '&-horizontal': {
          cursor: 'col-resize',
        },
        '&-vertical': {
          cursor: 'row-resize',
        },
      },

      '&-horizontal': {
        flexDirection: 'row',

        [`> ${splitBarCls}`]: {
          width: 0,

          [`${splitBarCls}-preview`]: {
            height: '100%',
            width: splitBarSize,
            ...splitterBarPreviewStyle,
            [`&${splitBarCls}-preview-active`]: {
              display: 'block',
            },
          },

          [`${splitBarCls}-dragger`]: {
            cursor: 'col-resize',
            height: '100%',
            width: splitTriggerSize,
            '&::before': {
              height: '100%',
              width: splitBarSize,
            },
            '&::after': {
              height: splitBarDraggableSize,
              width: splitBarSize,
            },
          },

          [`${splitBarCls}-collapse-bar`]: {
            width: token.fontSizeSM,
            height: token.controlHeightSM,
            '&-start': {
              left: 'auto',
              right: halfTriggerSize,
              transform: 'translateY(-50%)',
            },
            '&-end': {
              left: halfTriggerSize,
              right: 'auto',
              transform: 'translateY(-50%)',
            },
          },
        },
      },

      '&-vertical': {
        flexDirection: 'column',

        [`> ${splitBarCls}`]: {
          height: 0,

          [`${splitBarCls}-preview`]: {
            height: splitBarSize,
            width: '100%',
            ...splitterBarPreviewStyle,
            [`&${splitBarCls}-preview-active`]: {
              display: 'block',
            },
          },

          [`${splitBarCls}-dragger`]: {
            cursor: 'row-resize',
            width: '100%',
            height: splitTriggerSize,
            '&::before': {
              width: '100%',
              height: splitBarSize,
            },
            '&::after': {
              width: splitBarDraggableSize,
              height: splitBarSize,
            },
          },

          [`${splitBarCls}-collapse-bar`]: {
            height: token.fontSizeSM,
            width: token.controlHeightSM,
            '&-start': {
              top: 'auto',
              bottom: halfTriggerSize,
              transform: 'translateX(-50%)',
            },
            '&-end': {
              top: halfTriggerSize,
              bottom: 'auto',
              transform: 'translateX(-50%)',
            },
          },
        },
      },

      [splitPanelCls]: {
        overflow: 'auto',
        scrollbarWidth: 'thin',
        boxSizing: 'border-box',
        minWidth: 0,
        minHeight: 0,

        '&-hidden': {
          overflow: 'hidden',
        },
      },
    },
  };
};

export default genComponentStyleHook(
  'Splitter',
  token => {
    const splitterToken = mergeToken<SplitterToken>(token, {});
    return [genSplitterStyle(splitterToken)];
  },
  () => ({
    splitBarSize: 2,
    splitTriggerSize: 6,
    splitBarDraggableSize: 20,
  }),
);

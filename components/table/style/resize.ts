// 此样式是vue版本独有样式，react版本没有拖拽改变列宽度功能
import type { CSSObject } from '../../_util/cssinjs';
import type { GenerateStyle } from '../../theme/internal';
import type { TableToken } from './index';

const genResizeStyle: GenerateStyle<TableToken, CSSObject> = token => {
  const { componentCls } = token;

  return {
    [`${componentCls}-wrapper ${componentCls}-resize-handle`]: {
      position: 'absolute',
      top: 0,
      height: '100% !important',
      bottom: 0,
      left: 'auto !important',
      // Keep handle inside the cell so it does not overlap the next/prev column handle
      right: 0,
      cursor: 'col-resize',
      touchAction: 'none',
      userSelect: 'none',
      width: '8px',
      zIndex: 1,
      [`&-line`]: {
        display: 'block',
        width: '1px',
        marginLeft: '3.5px',
        height: '100% !important',
        backgroundColor: token.colorPrimary,
        opacity: 0,
      },
      [`&:hover &-line`]: {
        opacity: 1,
      },
    },
    [`${componentCls}-wrapper ${componentCls}-resize-handle.dragging`]: {
      zIndex: 10,
      // Hide in-cell line while proxy guide is shown
      [`${componentCls}-resize-handle-line`]: {
        opacity: 0,
      },
    },
    // Floating guide line — follows pointer without triggering table layout
    [`${componentCls}-resize-proxy`]: {
      position: 'fixed',
      top: 0,
      width: '2px',
      marginLeft: '-1px',
      backgroundColor: token.colorPrimary,
      zIndex: 1100,
      pointerEvents: 'none',
      boxShadow: `0 0 0 1px ${token.colorPrimary}`,
    },
    // While resizing: disable other handles; column widths stay frozen until mouseup
    [`${componentCls}-wrapper-resizing`]: {
      cursor: 'col-resize',
      userSelect: 'none',
      [`${componentCls}-resize-handle`]: {
        pointerEvents: 'none',
        [`${componentCls}-resize-handle-line`]: {
          opacity: '0 !important',
        },
      },
    },

    // Contain row-resize guide inside table container (no viewport bleed)
    [`${componentCls}-wrapper-row-resizable ${componentCls}-container`]: {
      position: 'relative',
      overflow: 'auto',
    },
    [`${componentCls}-wrapper ${componentCls}-row-resizable > td:first-child`]: {
      position: 'relative',
    },
    [`${componentCls}-wrapper ${componentCls}-row-resize-handle`]: {
      position: 'absolute',
      left: 0,
      bottom: 0,
      // Default to first cell; JS expands to container width
      width: '100%',
      height: '6px',
      cursor: 'row-resize',
      touchAction: 'none',
      userSelect: 'none',
      zIndex: 2,
      boxSizing: 'border-box',
      overflow: 'hidden',
      [`&-line`]: {
        display: 'block',
        height: '2px',
        marginTop: '2px',
        width: '100%',
        backgroundColor: token.colorPrimary,
        opacity: 0,
      },
      [`&:hover &-line`]: {
        opacity: 1,
      },
    },
    [`${componentCls}-wrapper ${componentCls}-row-resize-handle.dragging`]: {
      [`${componentCls}-row-resize-handle-line`]: {
        opacity: 1,
      },
    },
  };
};

export default genResizeStyle;

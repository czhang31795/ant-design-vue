import type { CSSObject } from '../../_util/cssinjs';
import type { GenerateStyle } from '../../theme/internal';
import type { TableToken } from './index';

const genDragSortStyle: GenerateStyle<TableToken, CSSObject> = token => {
  const {
    componentCls,
    fontSize,
    fontSizeSM,
    lineHeight,
    lineWidth,
    controlInteractiveSize: checkboxSize,
    motionDurationMid,
    borderRadiusSM,
    colorTextSecondary,
    colorText,
    colorFillSecondary,
    colorPrimary,
    colorPrimaryBg,
  } = token;

  // Keep handle size close to expand/checkbox so they share one baseline
  const handleSize = checkboxSize;
  // Same optical vertical offset as `.xy-table-row-expand-icon`
  const handleMarginTop =
    (fontSize * lineHeight - lineWidth * 3) / 2 - Math.ceil((fontSizeSM * 1.4 - lineWidth * 3) / 2);

  const handleStyle: CSSObject = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
    width: handleSize,
    height: handleSize,
    marginInlineEnd: 10,
    padding: 0,
    color: colorTextSecondary,
    fontSize: Math.max(14, handleSize - 2),
    lineHeight: 1,
    cursor: 'grab',
    touchAction: 'none',
    userSelect: 'none',
    borderRadius: borderRadiusSM,
    transition: `color ${motionDurationMid}, background ${motionDurationMid}`,
    [`&:hover`]: {
      color: colorText,
      background: colorFillSecondary,
    },
    [`&.dragging`]: {
      cursor: 'grabbing',
      color: colorPrimary,
      background: colorPrimaryBg,
    },
    [`> svg`]: {
      display: 'block',
      width: '1em',
      height: '1em',
    },
  };

  return {
    // Header title is inline text — align to em box
    [`${componentCls}-wrapper ${componentCls}-column-drag-handle`]: {
      ...handleStyle,
      verticalAlign: 'text-bottom',
      position: 'relative',
      top: 0,
    },

    // Body cell shares float layout with expand icon
    [`${componentCls}-wrapper ${componentCls}-row-drag-handle`]: {
      ...handleStyle,
      float: 'left',
      marginTop: handleMarginTop,
    },

    // When expand icon follows drag handle, drop its indent-based marginTop
    // so both use the same offset and stay level with text
    [`${componentCls}-wrapper ${componentCls}-row-drag-handle + ${componentCls}-row-indent + ${componentCls}-row-expand-icon`]:
      {
        marginTop: handleMarginTop,
      },
    [`${componentCls}-wrapper ${componentCls}-row-drag-handle + ${componentCls}-row-expand-icon`]: {
      marginTop: handleMarginTop,
    },

    [`${componentCls}-wrapper-column-dragging`]: {
      cursor: 'grabbing',
      userSelect: 'none',
      [`${componentCls}-column-drag-handle`]: {
        pointerEvents: 'none',
      },
      [`${componentCls}-resize-handle`]: {
        pointerEvents: 'none',
      },
    },

    [`${componentCls}-wrapper-row-dragging`]: {
      userSelect: 'none',
      [`${componentCls}-row-drag-handle`]: {
        cursor: 'grabbing',
      },
      [`${componentCls}-row-drag-over-up > td`]: {
        boxShadow: `inset 0 2px 0 0 ${colorPrimary}`,
      },
      [`${componentCls}-row-drag-over-down > td`]: {
        boxShadow: `inset 0 -2px 0 0 ${colorPrimary}`,
      },
      [`${componentCls}-row-drag-forbidden`]: {
        cursor: 'not-allowed',
      },
    },

    [`${componentCls}-column-drag-proxy`]: {
      position: 'fixed',
      top: 0,
      width: '2px',
      marginLeft: '-1px',
      backgroundColor: colorPrimary,
      zIndex: 1100,
      pointerEvents: 'none',
    },
  };
};

export default genDragSortStyle;

import type { CSSObject } from '../../_util/cssinjs';
import type { GenerateStyle } from '../../theme/internal';
import { PresetColors } from '../../theme/interface';
import type { ButtonToken } from './index';
import type { PresetColorKey } from '../../theme/interface';

type ColorSet = {
  base: string;
  hover: string;
  active: string;
  light: string;
  lightHover: string;
  lightActive: string;
  solidText?: string;
  shadow?: string;
};

const genHoverActive = (hover: CSSObject, active: CSSObject): CSSObject => ({
  '&:not(:disabled)': {
    '&:hover': hover,
    '&:active': active,
  },
});

const genDisabled = (
  token: ButtonToken,
  options?: { bg?: string; border?: boolean },
): CSSObject => ({
  '&:disabled': {
    cursor: 'not-allowed',
    color: token.colorTextDisabled,
    backgroundColor: options?.bg ?? token.colorBgContainerDisabled,
    borderColor: options?.border === false ? 'transparent' : token.colorBorder,
    boxShadow: 'none',
  },
});

function genColorVariants(token: ButtonToken, colorCls: string, colors: ColorSet): CSSObject {
  const { componentCls } = token;
  const solidText = colors.solidText ?? token.colorTextLightSolid;
  const prefix = `&${componentCls}-color-${colorCls}`;

  return {
    [`${prefix}${componentCls}-variant-solid`]: {
      color: solidText,
      backgroundColor: colors.base,
      borderColor: colors.base,
      boxShadow: colors.shadow,
      ...genHoverActive(
        {
          color: solidText,
          backgroundColor: colors.hover,
          borderColor: colors.hover,
        },
        {
          color: solidText,
          backgroundColor: colors.active,
          borderColor: colors.active,
        },
      ),
      ...genDisabled(token),
    },

    [`${prefix}${componentCls}-variant-outlined`]: {
      color: colors.base,
      backgroundColor: token.colorBgContainer,
      borderColor: colors.base,
      ...genHoverActive(
        {
          color: colors.hover,
          borderColor: colors.hover,
          backgroundColor: token.colorBgContainer,
        },
        {
          color: colors.active,
          borderColor: colors.active,
          backgroundColor: token.colorBgContainer,
        },
      ),
      ...genDisabled(token),
    },

    [`${prefix}${componentCls}-variant-dashed`]: {
      color: colors.base,
      backgroundColor: token.colorBgContainer,
      borderColor: colors.base,
      borderStyle: 'dashed',
      ...genHoverActive(
        {
          color: colors.hover,
          borderColor: colors.hover,
          backgroundColor: token.colorBgContainer,
        },
        {
          color: colors.active,
          borderColor: colors.active,
          backgroundColor: token.colorBgContainer,
        },
      ),
      ...genDisabled(token),
    },

    [`${prefix}${componentCls}-variant-filled`]: {
      color: colors.base,
      backgroundColor: colors.light,
      borderColor: 'transparent',
      ...genHoverActive(
        {
          color: colors.base,
          backgroundColor: colors.lightHover,
          borderColor: 'transparent',
        },
        {
          color: colors.base,
          backgroundColor: colors.lightActive,
          borderColor: 'transparent',
        },
      ),
      ...genDisabled(token, { border: false }),
    },

    [`${prefix}${componentCls}-variant-text`]: {
      color: colors.base,
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      boxShadow: 'none',
      ...genHoverActive(
        {
          color: colors.hover,
          backgroundColor: colors.light,
          borderColor: 'transparent',
        },
        {
          color: colors.active,
          backgroundColor: colors.lightActive,
          borderColor: 'transparent',
        },
      ),
      '&:disabled': {
        cursor: 'not-allowed',
        color: token.colorTextDisabled,
        backgroundColor: 'transparent',
        borderColor: 'transparent',
      },
    },

    [`${prefix}${componentCls}-variant-link`]: {
      color: colors.base,
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      boxShadow: 'none',
      ...genHoverActive(
        {
          color: colors.hover,
          backgroundColor: 'transparent',
          borderColor: 'transparent',
        },
        {
          color: colors.active,
          backgroundColor: 'transparent',
          borderColor: 'transparent',
        },
      ),
      '&:disabled': {
        cursor: 'not-allowed',
        color: token.colorTextDisabled,
        backgroundColor: 'transparent',
        borderColor: 'transparent',
      },
    },
  };
}

const genVariantStyle: GenerateStyle<ButtonToken, CSSObject> = token => {
  const { componentCls } = token;
  const shadow = `0 ${token.controlOutlineWidth}px 0 ${token.controlOutline}`;
  const dangerShadow = `0 ${token.controlOutlineWidth}px 0 ${token.colorErrorOutline}`;
  const defaultShadow = `0 ${token.controlOutlineWidth}px 0 ${token.controlTmpOutline}`;

  const presetStyles = PresetColors.reduce((prev, colorKey: PresetColorKey) => {
    const darkColor = token[`${colorKey}-6`];
    const hoverColor = token[`${colorKey}-5`];
    const activeColor = token[`${colorKey}-7`];
    const lightColor = token[`${colorKey}-1`];
    const lightHoverColor = token[`${colorKey}-2`];
    const lightActiveColor = token[`${colorKey}-3`];
    return {
      ...prev,
      ...genColorVariants(token, colorKey, {
        base: darkColor,
        hover: hoverColor,
        active: activeColor,
        light: lightColor,
        lightHover: lightHoverColor,
        lightActive: lightActiveColor,
        shadow,
      }),
    };
  }, {} as CSSObject);

  return {
    [componentCls]: {
      // default
      ...genColorVariants(token, 'default', {
        base: token.colorText,
        hover: token.colorPrimaryHover,
        active: token.colorPrimaryActive,
        light: token.colorFillTertiary,
        lightHover: token.colorFillSecondary,
        lightActive: token.colorFill,
        solidText: token.colorBgContainer,
        shadow: defaultShadow,
      }),
      // Override default outlined/dashed to match classic default button (border uses colorBorder)
      [`&${componentCls}-color-default${componentCls}-variant-outlined`]: {
        color: token.colorText,
        backgroundColor: token.colorBgContainer,
        borderColor: token.colorBorder,
        boxShadow: defaultShadow,
        ...genHoverActive(
          {
            color: token.colorPrimaryHover,
            borderColor: token.colorPrimaryHover,
            backgroundColor: token.colorBgContainer,
          },
          {
            color: token.colorPrimaryActive,
            borderColor: token.colorPrimaryActive,
            backgroundColor: token.colorBgContainer,
          },
        ),
      },
      [`&${componentCls}-color-default${componentCls}-variant-dashed`]: {
        color: token.colorText,
        backgroundColor: token.colorBgContainer,
        borderColor: token.colorBorder,
        borderStyle: 'dashed',
        boxShadow: defaultShadow,
        ...genHoverActive(
          {
            color: token.colorPrimaryHover,
            borderColor: token.colorPrimaryHover,
            backgroundColor: token.colorBgContainer,
          },
          {
            color: token.colorPrimaryActive,
            borderColor: token.colorPrimaryActive,
            backgroundColor: token.colorBgContainer,
          },
        ),
      },
      [`&${componentCls}-color-default${componentCls}-variant-solid`]: {
        color: token.colorBgContainer,
        backgroundColor: token.colorText,
        borderColor: token.colorText,
        ...genHoverActive(
          {
            color: token.colorBgContainer,
            backgroundColor: token.colorTextSecondary,
            borderColor: token.colorTextSecondary,
          },
          {
            color: token.colorBgContainer,
            backgroundColor: token.colorTextHeading,
            borderColor: token.colorTextHeading,
          },
        ),
      },
      [`&${componentCls}-color-default${componentCls}-variant-text`]: {
        color: token.colorText,
        ...genHoverActive(
          {
            color: token.colorText,
            backgroundColor: token.colorBgTextHover,
            borderColor: 'transparent',
          },
          {
            color: token.colorText,
            backgroundColor: token.colorBgTextActive,
            borderColor: 'transparent',
          },
        ),
      },

      // primary
      ...genColorVariants(token, 'primary', {
        base: token.colorPrimary,
        hover: token.colorPrimaryHover,
        active: token.colorPrimaryActive,
        light: token.colorPrimaryBg,
        lightHover: token.colorPrimaryBgHover,
        lightActive: token.colorPrimaryBorder,
        shadow,
      }),

      // danger (class name: dangerous, align with antd-react)
      ...genColorVariants(token, 'dangerous', {
        base: token.colorError,
        hover: token.colorErrorHover,
        active: token.colorErrorActive,
        light: token.colorErrorBg,
        lightHover: token.colorErrorBgHover,
        lightActive: token.colorErrorBorder,
        shadow: dangerShadow,
      }),

      // link color (used by type="link")
      ...genColorVariants(token, 'link', {
        base: token.colorLink,
        hover: token.colorLinkHover,
        active: token.colorLinkActive,
        light: token.colorPrimaryBg,
        lightHover: token.colorPrimaryBgHover,
        lightActive: token.colorPrimaryBorder,
      }),

      ...presetStyles,

      // ghost + outlined/dashed: transparent bg
      [`&${componentCls}-background-ghost`]: {
        [`&${componentCls}-variant-outlined, &${componentCls}-variant-dashed`]: {
          backgroundColor: 'transparent',
          ...genHoverActive({ backgroundColor: 'transparent' }, { backgroundColor: 'transparent' }),
        },
        [`&${componentCls}-variant-solid`]: {
          // ghost converts solid -> outlined visually via class switch in component
        },
      },
    },
  };
};

export default genVariantStyle;

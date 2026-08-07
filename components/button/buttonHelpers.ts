import { PresetColors } from '../theme/interface';
import type { PresetColorKey } from '../theme/interface';
import type { ButtonType } from './buttonTypes';

export const ButtonVariantTypes = [
  'outlined',
  'dashed',
  'solid',
  'filled',
  'text',
  'link',
] as const;
export type ButtonVariantType = (typeof ButtonVariantTypes)[number];

export const ButtonColorTypes = ['default', 'primary', 'danger', 'link', ...PresetColors] as const;
export type ButtonColorType = 'default' | 'primary' | 'danger' | 'link' | PresetColorKey;

export type ColorVariantPairType = [color?: ButtonColorType, variant?: ButtonVariantType];

/** `type` is sugar for color + variant */
export const ButtonTypeMap: Partial<Record<ButtonType, ColorVariantPairType>> = {
  default: ['default', 'outlined'],
  primary: ['primary', 'solid'],
  dashed: ['default', 'dashed'],
  // link is not a real palette color; styled specially under color-link
  link: ['link', 'link'],
  text: ['default', 'text'],
  ghost: ['default', 'outlined'],
};

export function isUnBorderedButtonVariant(variant?: ButtonVariantType) {
  return variant === 'text' || variant === 'link';
}

export function parseButtonColorVariant(options: {
  color?: ButtonColorType;
  variant?: ButtonVariantType;
  type?: ButtonType;
  danger?: boolean;
}): { color: ButtonColorType; variant: ButtonVariantType } {
  const { color, variant, type, danger } = options;
  const mergedType = type || 'default';

  if (color && variant) {
    return { color: danger ? 'danger' : color, variant };
  }

  // Partial: only variant / only color
  if (color || variant) {
    let nextColor = color;
    let nextVariant = variant;
    if (!nextColor) {
      nextColor = variant === 'solid' ? 'primary' : 'default';
    }
    if (!nextVariant) {
      nextVariant = 'outlined';
    }
    if (danger) {
      nextColor = 'danger';
    }
    return { color: nextColor, variant: nextVariant };
  }

  // From type sugar
  const pair = ButtonTypeMap[mergedType] || ButtonTypeMap.default!;
  if (danger) {
    return { color: 'danger', variant: pair[1]! };
  }
  return { color: pair[0]!, variant: pair[1]! };
}

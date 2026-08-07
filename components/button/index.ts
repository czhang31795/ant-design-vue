import type { App, Plugin } from 'vue';
import Button from './button';
import ButtonGroup from './button-group';

import type {
  ButtonColorType,
  ButtonProps,
  ButtonShape,
  ButtonType,
  ButtonVariantType,
} from './buttonTypes';
import type { ButtonGroupProps } from './button-group';
import type { SizeType as ButtonSize } from '../config-provider';

export type {
  ButtonColorType,
  ButtonProps,
  ButtonShape,
  ButtonType,
  ButtonVariantType,
  ButtonGroupProps,
  ButtonSize,
};

Button.Group = ButtonGroup;

/* istanbul ignore next */
Button.install = function (app: App) {
  app.component(Button.name, Button);
  app.component(ButtonGroup.name, ButtonGroup);
  return app;
};

export { ButtonGroup };

export default Button as typeof Button &
  Plugin & {
    readonly Group: typeof ButtonGroup;
  };

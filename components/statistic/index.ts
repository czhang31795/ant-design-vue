import type { App, Plugin } from 'vue';
import { registerComponent } from '../_util/registerComponent';
import Statistic from './Statistic';
import Countdown from './Countdown';

export type { StatisticProps } from './Statistic';

Statistic.Countdown = Countdown;
/* istanbul ignore next */
Statistic.install = function (app: App) {
  registerComponent(app, Statistic);
  registerComponent(app, Statistic.Countdown);
  return app;
};

export const StatisticCountdown = Statistic.Countdown;

export default Statistic as typeof Statistic &
  Plugin & {
    readonly Countdown: typeof Countdown;
  };

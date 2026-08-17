import type { App, Plugin } from 'vue';
import { registerComponent } from '../_util/registerComponent';
import Timeline, { timelineProps } from './Timeline';
import TimelineItem, { timelineItemProps } from './TimelineItem';

export type { TimelineProps } from './Timeline';
export type { TimelineItemProps } from './TimelineItem';

Timeline.Item = TimelineItem;

/* istanbul ignore next */
Timeline.install = function (app: App) {
  registerComponent(app, Timeline);
  registerComponent(app, TimelineItem);
  return app;
};
export { TimelineItem, timelineProps, timelineItemProps };
export default Timeline as typeof Timeline &
  Plugin & {
    readonly Item: typeof TimelineItem;
  };

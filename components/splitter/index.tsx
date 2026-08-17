import type { App, Plugin } from 'vue';
import { registerComponent } from '../_util/registerComponent';
import Panel from './Panel';
import Splitter from './Splitter';

export type { SplitterProps, PanelProps } from './interface';

const SplitterComponent = Object.assign(Splitter, {
  Panel,
  install(app: App) {
    registerComponent(app, Splitter);
    registerComponent(app, Panel);
    return app;
  },
});

export { Panel as SplitterPanel };
export default SplitterComponent as typeof Splitter &
  Plugin & {
    readonly Panel: typeof Panel;
  };

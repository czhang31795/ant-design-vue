import type { App, Plugin } from 'vue';
import Panel from './Panel';
import Splitter from './Splitter';

export type { SplitterProps, PanelProps } from './interface';

const SplitterComponent = Object.assign(Splitter, {
  Panel,
  install(app: App) {
    app.component(Splitter.name as string, Splitter);
    app.component(Panel.name as string, Panel);
    return app;
  },
});

export { Panel as SplitterPanel };
export default SplitterComponent as typeof Splitter &
  Plugin & {
    readonly Panel: typeof Panel;
  };

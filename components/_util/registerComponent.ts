import type { App } from 'vue';

/** Official Vue tag prefix, e.g. `<xy-button>`. */
export const TAG_PREFIX = 'xy';
export const NAME_PREFIX = 'Xy';

export function toPublicName(name: string) {
  if (/^A[A-Z]/.test(name)) {
    return `${NAME_PREFIX}${name.slice(1)}`;
  }
  return name;
}

export function registerComponent(app: App, comp: any, name?: string) {
  const raw = name || comp?.displayName || comp?.name;
  if (!raw || typeof raw !== 'string') {
    return;
  }
  app.component(toPublicName(raw), comp);
}

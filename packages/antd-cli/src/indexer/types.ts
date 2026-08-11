export type DemoEntry = {
  id: string;
  file: string;
  titleZh?: string;
  titleEn?: string;
  descriptionZh?: string;
  descriptionEn?: string;
  /** Full demo source; may be large */
  source: string;
};

export type ComponentEntry = {
  name: string;
  title?: string;
  subtitle?: string;
  category?: string;
  type?: string;
  summary: string;
  whenToUse: string;
  api: string;
  extras: string;
  demos: DemoEntry[];
};

export type ComponentsIndex = {
  libName: string;
  libVersion: string;
  generatedAt: string;
  components: ComponentEntry[];
};

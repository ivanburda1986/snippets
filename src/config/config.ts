export interface labelData {
  name: string;
  lang: SupportedLanguages;
  bgColor: string;
  toggleAction?: Function | void;
}

export const labels: labelData[] = [
  { name: "Javascript", lang: "js", bgColor: "gold" },
  { name: "HTML", lang: "html", bgColor: "orange" },
  { name: "CSS", lang: "cs", bgColor: "mediumpurple" },
];

export type SupportedLanguages = "html" | "cs" | "js";

export interface typeSnippet {
  id: string;
  title: string;
  description: string;
  content: string;
  language: SupportedLanguages;
  assignedLabels: labelData[];
}

export interface newSnippet {
  title: string;
  description: string;
  content: string;
  language: SupportedLanguages;
  assignedLabels: labelData[];
}

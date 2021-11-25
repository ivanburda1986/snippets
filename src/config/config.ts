export interface labelData {
  name: string;
  lang: string;
  bgColor: string;
  toggleAction?: Function | void;
}

export const labels: labelData[] = [
  { name: "Javascript", lang: "js", bgColor: "gold" },
  { name: "HTML", lang: "html", bgColor: "orange" },
  { name: "CSS", lang: "cs", bgColor: "mediumpurple" },
];

export const supportedLanguages = ["html", "js", "cs"] as const;

export interface typeSnippet {
  id: string;
  title: string;
  description: string;
  content: string;
  language: typeof supportedLanguages;
  assignedLabels: labelData[];
}

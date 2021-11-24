export interface labelData {
  name: string;
  language: string;
  bgColor: string;
  toggleAction?: Function | void;
}

export const labels = [
  { name: "Javascript", language: "js", bgColor: "gold" },
  { name: "HTML", language: "html", bgColor: "orange" },
  { name: "CSS", language: "cs", bgColor: "mediumpurple" },
];

export type supportedLanguages = "js" as string | "html" as string | "cs" as string;

export interface typeSnippet {
  id: string;
  title: string;
  description: string;
  content: string;
  language: string;
  assignedLabels: labelData[];
}

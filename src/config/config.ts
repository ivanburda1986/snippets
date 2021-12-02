export interface typeSnippet {
  id: string;
  title: string;
  description: string;
  content: string;
  language: SupportedLanguages;
}

export interface newSnippet {
  id: string;
  title: string;
  description: string;
  content: string;
  language: SupportedLanguages;
}
export interface labelData {
  name: string;
  lang: SupportedLanguages;
  bgColor: string;
  checked?: boolean;
  toggleAction?: Function | void;
}

export type SupportedLanguages = "html" | "cs" | "js";

export interface message {
  type: supportedMessageTypes;
  text: string;
}

export type supportedMessageTypes = "success" | "warning";

export const labels: labelData[] = [
  { name: "Javascript", lang: "js", bgColor: "gold" },
  { name: "HTML", lang: "html", bgColor: "orange" },
  { name: "CSS", lang: "cs", bgColor: "mediumpurple" },
];

export interface typeSnippet {
  id: string;
  title: string;
  description: string;
  content: string;
  language: supportedSnippetTypes;
  link?: string;
  privated: Privated;
  favorited: Favorited;
  creationTimestamp: number;
}

export interface typeNewSnippet {
  id: string;
  title: string;
  description: string;
  content: string;
  language: supportedSnippetTypes;
  link?: string;
  privated: Privated;
  favorited: Favorited;
  creationTimestamp: number;
}
export interface typeLabelData {
  name: string;
  lang: supportedSnippetTypes;
  bgColor: string;
  color: string;
  isChecked?: boolean;
  toggleAction?: Function | void;
}

export type supportedSnippetTypes = "html" | "css" | "js" | "react" | "ts" | "jest" | "regex" | "py" | "firebase" | "other";
export type Favorited = 1 | 0;
export type Privated = 1 | 0;

export interface typeMessage {
  type: supportedMessageTypes;
  text: string;
  queuePosition: number;
  id: string;
}

export type supportedMessageTypes = "error" | "warning" | "success";

export const labels: typeLabelData[] = [
  { name: "HTML", lang: "html", bgColor: "orange", color: "black" },
  { name: "CSS", lang: "css", bgColor: "mediumpurple", color: "white" },
  { name: "JS", lang: "js", bgColor: "gold", color: "black" },
  { name: "React", lang: "react", bgColor: "cyan", color: "black" },
  { name: "TS", lang: "ts", bgColor: "#2b7489", color: "white" },
  { name: "Jest", lang: "jest", bgColor: "#ADFF2F", color: "black" },
  { name: "Regex", lang: "regex", bgColor: "#fff", color: "black" },
  { name: "Python", lang: "py", bgColor: "#6ea8e9", color: "black" },
];
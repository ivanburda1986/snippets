export interface typeSnippet {
  id: string;
  title: string;
  description: string;
  content: string;
  language: SupportedLanguages;
  favorited: Favorited;
  creationTimestamp: number;
}

export interface newSnippet {
  id: string;
  title: string;
  description: string;
  content: string;
  language: SupportedLanguages;
  favorited: Favorited;
  creationTimestamp: number;
}
export interface labelData {
  name: string;
  lang: SupportedLanguages;
  bgColor: string;
  color: string;
  isChecked?: boolean;
  toggleAction?: Function | void;
}

export type SupportedLanguages = "html" | "cs" | "js" | "react" | "ts" | "bash" | "py" | "npm" | "git" | "vsc" | "linux";
export type Favorited = 1 | 0;

export interface message {
  type: supportedMessageTypes;
  text: string;
  queuePosition: number;
  id: string;
}

export type supportedMessageTypes = "error" | "warning" | "success";

export const labels: labelData[] = [
  { name: "HTML", lang: "html", bgColor: "orange", color: "black" },
  { name: "CSS", lang: "cs", bgColor: "mediumpurple", color: "black" },
  { name: "JS", lang: "js", bgColor: "gold", color: "black" },
  { name: "React", lang: "react", bgColor: "cyan", color: "black" },
  { name: "TS", lang: "ts", bgColor: "#3e9fe6", color: "black" },
  { name: "Bash", lang: "bash", bgColor: "#8d8d8d", color: "white" },
  { name: "Python", lang: "py", bgColor: "#6ea8e9", color: "black" },
  { name: "NPM", lang: "npm", bgColor: "#c4656c", color: "white" },
  { name: "GIT", lang: "git", bgColor: "lightcoral", color: "black" },
  { name: "VSC", lang: "vsc", bgColor: "#2d7ec0", color: "white" },
  { name: "Linux", lang: "linux", bgColor: "#2d7ec0", color: "white" },
];

// https://colorpicker.me/

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
  checked?: boolean;
  toggleAction?: Function | void;
}

export type SupportedLanguages = "html" | "cs" | "js" | "react" | "ts" | "bsh" | "py" | "npm" | "git" | "vsc" | "lnx";
export type Favorited = 1 | 0;

export interface message {
  type: supportedMessageTypes;
  text: string;
}

export type supportedMessageTypes = "success" | "warning";

export const labels: labelData[] = [
  { name: "HTML", lang: "html", bgColor: "orange" },
  { name: "CSS", lang: "cs", bgColor: "mediumpurple" },
  { name: "JS", lang: "js", bgColor: "gold" },
  { name: "React", lang: "react", bgColor: "cyan" },
  { name: "TS", lang: "ts", bgColor: "#3e9fe6" },
  { name: "Bash", lang: "bsh", bgColor: "#8d8d8d" },
  { name: "Python", lang: "py", bgColor: "#6ea8e9" },
  { name: "NPM", lang: "npm", bgColor: "#c4656c" },
  { name: "GIT", lang: "git", bgColor: "lightcoral" },
  { name: "VSC", lang: "vsc", bgColor: "#2d7ec0" },
  { name: "Linux", lang: "lnx", bgColor: "#2d7ec0" },
];

// https://colorpicker.me/

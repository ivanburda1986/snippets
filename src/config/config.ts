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

export type SupportedLanguages = "html" | "cs" | "js" | "react" | "ts" | "bsh" | "py" | "npm" | "git";
export type Favorited = 1 | 0;

export interface message {
  type: supportedMessageTypes;
  text: string;
}

export type supportedMessageTypes = "success" | "warning";

export const labels: labelData[] = [
  { name: "HTML", lang: "html", bgColor: "orange" },
  { name: "CSS", lang: "cs", bgColor: "mediumpurple" },
  { name: "Javascript", lang: "js", bgColor: "gold" },
  { name: "React", lang: "react", bgColor: "cyan" },
  { name: "Typescript", lang: "ts", bgColor: "steelblue" },
  { name: "Bash", lang: "bsh", bgColor: "lightgrey" },
  { name: "Python", lang: "py", bgColor: "lightblue" },
  { name: "NPM", lang: "npm", bgColor: "pink" },
  { name: "GIT", lang: "git", bgColor: "lightcoral" },
];

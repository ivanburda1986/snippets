export interface label {
  name: string;
  abbreviation: "js" | "html" | "cs";
  bgColor: string;
  toggleAction?: Function;
}

export const labels = [
  { name: "Javascript", abbreviation: "js", bgColor: "gold" },
  { name: "HTML", abbreviation: "html", bgColor: "orange" },
  { name: "CSS", abbreviation: "cs", bgColor: "mediumpurple" },
];

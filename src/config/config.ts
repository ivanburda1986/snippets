export interface label {
  name: string;
  abbreviation: labelAbbreviation;
  bgColor: string;
}

export type labelAbbreviation = "js" | "html" | "cs";

export const labels: label[] = [
  { name: "Javascript", abbreviation: "js", bgColor: "gold" },
  { name: "HTML", abbreviation: "html", bgColor: "orange" },
  { name: "CSS", abbreviation: "cs", bgColor: "mediumpurple" },
];

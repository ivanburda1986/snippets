import { supportedSnippetTypes } from "../../config/config";

interface addSnippetFormInput {
  title: string;
  description: string;
  content: string;
  assignedLanguage: supportedSnippetTypes | undefined;
}
export const validateInputs = ({ title, description, content, assignedLanguage }: addSnippetFormInput): boolean => {
  if (title === "") {
    return false;
  }
  if (description === "") {
    return false;
  }
  if (content === "") {
    return false;
  }
  if (assignedLanguage === undefined) {
    return false;
  }
  return true;
};

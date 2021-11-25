import React, { useState } from "react";
import { AppContext } from "./context/context";
import { SupportedLanguages, typeSnippet, newSnippet } from "./config/config";

import { Header } from "./components/Header/Header";
import { AddSnippetForm } from "./components/AddSnippetForm/AddSnippetForm";
import { SnippetList } from "./components/SnippetList/SnippetList";

const snippetsMock: typeSnippet[] = [
  {
    id: "123455",
    title: "Snippet1",
    description: "My best javascript snippet",
    content: "ff",
    language: "js",
    assignedLabels: [{ bgColor: "gold", lang: "js", name: "Javascript" }],
  },
  {
    id: "3432432",
    title: "Snippet2",
    description: "My best HTML snippet",
    content: "ff",
    language: "html",
    assignedLabels: [{ bgColor: "orange", lang: "html", name: "HTML" }],
  },
  {
    id: "343243332",
    title: "Snippet3",
    description: "My best CSS snippet",
    content: "ff",
    language: "cs",
    assignedLabels: [{ bgColor: "mediumpurple", lang: "cs", name: "CSS" }],
  },
];

function App() {
  const [snippets, setSnippets] = useState<typeSnippet[]>([...snippetsMock]);
  const [newSnippetFormDisplayState, setNewSnippetDisplayState] = useState<boolean>(false);
  const [languagesToFilterSnippetsBy, setLanguagesToFilterSnippetsBy] = useState<SupportedLanguages[]>([]);
  const contextProvider = {
    snippets,
    newSnippetFormDisplayState,
    toggleNewSnippetFormDisplayState,
    submitHandler: addSnippet,
    languagesToFilterSnippetsBy,
    addFilter,
  };

  function toggleNewSnippetFormDisplayState(): void {
    setNewSnippetDisplayState(!newSnippetFormDisplayState);
  }

  function addSnippet({ title, description, content, language, assignedLabels }: newSnippet) {
    setSnippets((prevSnippets) => [...prevSnippets, { id: Math.random().toString(), title: title, description: description, content: content, language: language, assignedLabels: assignedLabels }]);
  }

  function addFilter(filterLanguage: SupportedLanguages) {
    if (languagesToFilterSnippetsBy.includes(filterLanguage)) {
      setLanguagesToFilterSnippetsBy((languagesToFilterSnippetsBy) => languagesToFilterSnippetsBy.filter((language) => language !== filterLanguage));
    } else {
      setLanguagesToFilterSnippetsBy((languagesToFilterSnippetsBy) => [...languagesToFilterSnippetsBy, filterLanguage]);
    }
    return;
  }

  return (
    <div className="App">
      <AppContext.Provider value={contextProvider}>
        <Header />
        {newSnippetFormDisplayState && <AddSnippetForm />}
        <SnippetList />
      </AppContext.Provider>
    </div>
  );
}

export default App;

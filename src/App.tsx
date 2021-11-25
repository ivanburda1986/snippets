import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { AppContext } from "./context/context";
import { SupportedLanguages, typeSnippet, newSnippet } from "./config/config";
import { receiveServerItems } from "./api/api";

import { Header } from "./components/Header/Header";
import { AddSnippetForm } from "./components/AddSnippetForm/AddSnippetForm";
import { SnippetList } from "./components/SnippetList/SnippetList";

const snippetsMock: typeSnippet[] = [
  {
    id: "123-abc",
    title: "Snippet1",
    description: "My best javascript snippet",
    content: "ff",
    language: "js",
    assignedLabels: [{ bgColor: "gold", lang: "js", name: "Javascript" }],
  },
  {
    id: "456-abc",
    title: "Snippet2",
    description: "My best HTML snippet",
    content: "ff",
    language: "html",
    assignedLabels: [{ bgColor: "orange", lang: "html", name: "HTML" }],
  },
  {
    id: "789-abc",
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
    submitNewSnippetHandler: addSnippet,
    deleteSnippetHandler: deleteSnippet,
    languagesToFilterSnippetsBy,
    addFilter,
  };

  useEffect(() => {
    receiveServerItems().then((data) => console.log(data));
  }, []);

  function toggleNewSnippetFormDisplayState(): void {
    setNewSnippetDisplayState(!newSnippetFormDisplayState);
  }

  function addSnippet({ title, description, content, language, assignedLabels }: newSnippet) {
    setSnippets((prevSnippets) => [...prevSnippets, { id: uuidv4(), title: title, description: description, content: content, language: language, assignedLabels: assignedLabels }]);
  }

  function deleteSnippet(id: string) {
    setSnippets((prevSnippets) => [...prevSnippets].filter((snippet) => snippet.id !== id));
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

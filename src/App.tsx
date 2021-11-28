import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { AppContext } from "./context/context";
import { SupportedLanguages, typeSnippet, newSnippet } from "./config/config";
import { receiveServerItems } from "./api/api";

import { Header } from "./components/Header/Header";
import { AddSnippetForm } from "./components/AddSnippetForm/AddSnippetForm";
import { SnippetList } from "./components/SnippetList/SnippetList";
import { Snippet } from "./components/Snippet/Snippet";

function App() {
  const [snippets, setSnippets] = useState<typeSnippet[]>([]);
  const [newSnippetFormDisplayState, setNewSnippetDisplayState] = useState<boolean>(false);
  const [languagesToFilterSnippetsBy, setLanguagesToFilterSnippetsBy] = useState<SupportedLanguages[]>([]);
  const contextProvider = {
    snippets,
    newSnippetFormDisplayState,
    toggleNewSnippetFormDisplayState,
    submitNewSnippetHandler: addSnippet,
    deleteSnippetHandler: deleteSnippet,
    updateSnippetHandler: updateSnippet,
    languagesToFilterSnippetsBy,
    addFilter,
  };

  useEffect(() => {
    let mydata: typeSnippet[];
    receiveServerItems().then((data) => {
      if (data) {
        mydata = Array.from(Object.values(data)) as typeSnippet[];
        setSnippets(mydata);
      }
    });
  }, []);

  function toggleNewSnippetFormDisplayState(): void {
    setNewSnippetDisplayState(!newSnippetFormDisplayState);
  }

  function addSnippet({ id, title, description, content, language }: newSnippet) {
    setSnippets((prevSnippets) => [...prevSnippets, { id: id, title: title, description: description, content: content, language: language }]);
  }

  function deleteSnippet(id: string) {
    setSnippets((prevSnippets) => [...prevSnippets].filter((snippet) => snippet.id !== id));
  }

  function updateSnippet({ id, title, description, content, language }: newSnippet) {
    setSnippets((prevSnippets) => [...prevSnippets, { id: id, title: title, description: description, content: content, language: language }]);
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

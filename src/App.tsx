import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { AppContext } from "./context/context";
import { SupportedLanguages, typeSnippet, newSnippet } from "./config/config";
import { receiveServerItems } from "./api/api";

import { Header } from "./components/Header/Header";
import { AddSnippetForm } from "./components/AddSnippetForm/AddSnippetForm";
import { SnippetList } from "./components/SnippetList/SnippetList";
import { Snippet } from "./components/Snippet/Snippet";

const snippetsMock: typeSnippet[] = [
  {
    id: "123-abc",
    title: "Snippet1",
    description: "My best javascript snippet",
    content: "ff",
    language: "cs",
  },
  {
    id: "456-abc",
    title: "Snippet2",
    description: "My best HTML snippet",
    content: "ff",
    language: "cs",
  },
  {
    id: "789-abc",
    title: "Snippet3",
    description: "My best CSS snippet",
    content: "ff",
    language: "cs",
  },
];

function App() {
  const [snippets, setSnippets] = useState<typeSnippet[]>([...snippetsMock]);
  const [newSnippetFormDisplayState, setNewSnippetDisplayState] = useState<boolean>(false);
  const [languagesToFilterSnippetsBy, setLanguagesToFilterSnippetsBy] = useState<SupportedLanguages[]>([]);
  const [myTestSnippet, setMyTestSnippet] = useState<typeSnippet>();
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
    let mydata: typeSnippet[];
    receiveServerItems().then((data) => {
      mydata = Array.from(Object.values(data)) as typeSnippet[];
      setSnippets(mydata);
    });
  }, []);

  function toggleNewSnippetFormDisplayState(): void {
    setNewSnippetDisplayState(!newSnippetFormDisplayState);
  }

  function addSnippet({ title, description, content, language }: newSnippet) {
    setSnippets((prevSnippets) => [...prevSnippets, { id: uuidv4(), title: title, description: description, content: content, language: language }]);
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
        {myTestSnippet && <Snippet id={myTestSnippet.id} title={myTestSnippet.title} description={myTestSnippet.description} content={myTestSnippet.content} language={myTestSnippet.language} />}
      </AppContext.Provider>
    </div>
  );
}

export default App;

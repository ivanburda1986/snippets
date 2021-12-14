import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { AppContext } from "./context/context";
import { SupportedLanguages, typeSnippet, newSnippet, message } from "./config/config";
import { receiveServerItems } from "./api/api";

import { Header } from "./components/Header/Header";
import { AddSnippetForm } from "./components/AddSnippetForm/AddSnippetForm";
import { SnippetList } from "./components/SnippetList/SnippetList";
import { Snippet } from "./components/Snippet/Snippet";
import { Message } from "./components/Message/Message";

function App() {
  const [snippets, setSnippets] = useState<typeSnippet[]>([]);
  const [newSnippetFormDisplayState, setNewSnippetDisplayState] = useState<boolean>(false);
  const [languagesToFilterSnippetsBy, setLanguagesToFilterSnippetsBy] = useState<SupportedLanguages[]>([]);
  const [messages, setMessages] = useState<message[]>([]);
  const location = useLocation();
  const navigate = useNavigate();

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

  // Loads all snippets from the server
  useEffect(() => {
    let mydata: typeSnippet[];
    receiveServerItems().then((data) => {
      if (data) {
        mydata = Array.from(Object.values(data)) as typeSnippet[];
        setSnippets(mydata);
      }
    });
  }, []);

  // Gets on-load values of the 'filter' query parameters and sets the initial filter
  useEffect(() => {
    const filterValues = new URLSearchParams(location.search).get("filter")?.split(" ");
    if (filterValues) {
      const filterLanguages: SupportedLanguages[] = filterValues as SupportedLanguages[];
      filterLanguages.forEach((filterLanguage) => setLanguagesToFilterSnippetsBy((languagesToFilterSnippetsBy) => [...languagesToFilterSnippetsBy, filterLanguage]));
    }
  }, []);

  // Updates the 'filter' query parameter whenever the user changes the filter settings
  useEffect(() => {
    const parameters = new URLSearchParams(location.search);
    if (languagesToFilterSnippetsBy.length !== 0) {
      parameters.delete("filter");
      parameters.append("filter", languagesToFilterSnippetsBy.join(" "));
    } else {
      parameters.delete("filter");
    }
    navigate({ search: parameters.toString() });
  }, [languagesToFilterSnippetsBy]);

  // Methods

  function toggleNewSnippetFormDisplayState(): void {
    setNewSnippetDisplayState(!newSnippetFormDisplayState);
  }

  function addSnippet({ id, title, description, content, language, favorited, creationTimestamp }: newSnippet) {
    setSnippets((prevSnippets) => [...prevSnippets, { id: id, title: title, description: description, content: content, language: language, favorited: favorited, creationTimestamp: creationTimestamp }]);
  }

  function deleteSnippet(id: string) {
    setSnippets((prevSnippets) => [...prevSnippets].filter((snippet) => snippet.id !== id));
  }

  function updateSnippet({ id, title, description, content, language, favorited, creationTimestamp }: newSnippet) {
    setSnippets((prevSnippets) => [...prevSnippets, { id: id, title: title, description: description, content: content, language: language, favorited: favorited, creationTimestamp: creationTimestamp }]);
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
    <div className="App" style={{ minHeight: "100vh" }}>
      <AppContext.Provider value={contextProvider}>
        <Header />
        {newSnippetFormDisplayState && <AddSnippetForm />}
        <SnippetList />
        <Message type={"warning"} text={"I warn you for the first time!"} />
      </AppContext.Provider>
    </div>
  );
}

export default App;

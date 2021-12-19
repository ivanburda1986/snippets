import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { receiveServerItems } from "./api/api";
import { AppContext } from "./context/context";
import { supportedSnippetTypes, typeSnippet, typeNewSnippet, typeMessage } from "./config/config";

import { Header } from "./components/Header/Header";
import { AddSnippetForm } from "./components/AddSnippetForm/AddSnippetForm";
import { SnippetList } from "./components/SnippetList/SnippetList";
import { Message } from "./components/Message/Message";

function App() {
  const [snippets, setSnippets] = useState<typeSnippet[]>([]);
  const [displayNewSnippetsForm, setDisplayNewSnippetsFormState] = useState<boolean>(false);
  const [languagesToFilterSnippetsBy, setLanguagesToFilterSnippetsBy] = useState<supportedSnippetTypes[]>([]);
  const [snackbarMessages, setSnackbarMessages] = useState<typeMessage[]>([]);

  const location = useLocation();
  const navigate = useNavigate();

  const contextProvider = {
    snippets,
    submitNewSnippetHandler: addSnippet,
    updateSnippetHandler: updateSnippet,
    deleteSnippetHandler: deleteSnippet,
    snackbarMessages,
    addSnackbarMessage,
    removeSnackbarMessage,
    languagesToFilterSnippetsBy,
    addFilter,
    displayNewSnippetsForm,
    toggleDisplayNewsnippetsForm,
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
      const filterLanguages: supportedSnippetTypes[] = filterValues as supportedSnippetTypes[];
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
  function toggleDisplayNewsnippetsForm(): void {
    setDisplayNewSnippetsFormState(!displayNewSnippetsForm);
  }

  function addSnippet({ id, title, description, content, language, favorited, creationTimestamp }: typeNewSnippet) {
    setSnippets((prevSnippets) => [...prevSnippets, { id: id, title: title, description: description, content: content, language: language, favorited: favorited, creationTimestamp: creationTimestamp }]);
  }

  function deleteSnippet(id: string) {
    setSnippets((prevSnippets) => [...prevSnippets].filter((snippet) => snippet.id !== id));
  }

  function updateSnippet({ id, title, description, content, language, favorited, creationTimestamp }: typeNewSnippet) {
    setSnippets((prevSnippets) => [...prevSnippets, { id: id, title: title, description: description, content: content, language: language, favorited: favorited, creationTimestamp: creationTimestamp }]);
  }

  function addFilter(filterLanguage: supportedSnippetTypes) {
    if (languagesToFilterSnippetsBy.includes(filterLanguage)) {
      setLanguagesToFilterSnippetsBy((languagesToFilterSnippetsBy) => languagesToFilterSnippetsBy.filter((language) => language !== filterLanguage));
    } else {
      setLanguagesToFilterSnippetsBy((languagesToFilterSnippetsBy) => [...languagesToFilterSnippetsBy, filterLanguage]);
    }
    return;
  }

  function removeSnackbarMessage(id: string) {
    setSnackbarMessages((messages) => messages.filter((message) => message.id !== id));
  }

  function addSnackbarMessage({ type, text, queuePosition, id }: typeMessage) {
    setSnackbarMessages((prevMessages) => [...prevMessages, { type, text, queuePosition, id }]);
  }

  return (
    <div className="App" style={{ minHeight: "100vh" }}>
      <AppContext.Provider value={contextProvider}>
        <Header />
        {displayNewSnippetsForm && <AddSnippetForm />}
        <SnippetList />
        {snackbarMessages.map((message) => (
          <Message type={message.type} text={message.text} key={message.id} queuePosition={message.queuePosition} id={message.id} />
        ))}
      </AppContext.Provider>
    </div>
  );
}

export default App;

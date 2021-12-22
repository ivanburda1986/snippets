import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { receiveServerItems } from "./api/api";
import { AppContext } from "./context/context";
import { supportedSnippetTypes, typeSnippet, typeNewSnippet, typeMessage } from "./config/config";

import { Header } from "./components/Header/Header";
import { AddSnippetForm } from "./components/AddSnippetForm/AddSnippetForm";
import { SnippetList } from "./components/SnippetList/SnippetList";
import { SnackbarMessage } from "./components/SnackbarMessage/SnackbarMessage";

import styles from "./App.module.css";

function App() {
  const [snippets, setSnippets] = useState<typeSnippet[]>([]);
  const [displayAddSnippetForm, setDisplayAddSnippetFormState] = useState<boolean>(false);
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
    displayAddSnippetForm,
    toggleDisplayAddSnippetForm,
  };

  // Loads all snippets from the server
  useEffect(() => {
    let serverSnippetsData: typeSnippet[];
    receiveServerItems().then((data) => {
      if (data) {
        serverSnippetsData = Array.from(Object.values(data)) as typeSnippet[];
        setSnippets(serverSnippetsData);
      }
    });
  }, []);

  // Gets on-load values of the 'filter' query parameters and sets the initial filter
  useEffect(() => {
    const urlFilterParameters = new URLSearchParams(location.search).get("filter")?.split(" ");
    if (urlFilterParameters) {
      const filterLanguages: supportedSnippetTypes[] = urlFilterParameters as supportedSnippetTypes[];
      filterLanguages.forEach((filterLanguage) => setLanguagesToFilterSnippetsBy((languagesToFilterSnippetsBy) => [...languagesToFilterSnippetsBy, filterLanguage]));
    }
  }, []);

  // Updates the 'filter' query parameter whenever the user changes the filter settings
  useEffect(() => {
    const urlSearchParameters = new URLSearchParams(location.search);
    if (languagesToFilterSnippetsBy.length !== 0) {
      urlSearchParameters.delete("filter");
      urlSearchParameters.append("filter", languagesToFilterSnippetsBy.join(" "));
    } else {
      urlSearchParameters.delete("filter");
    }
    navigate({ search: urlSearchParameters.toString() });
  }, [languagesToFilterSnippetsBy]);

  // Methods
  function toggleDisplayAddSnippetForm(): void {
    setDisplayAddSnippetFormState(!displayAddSnippetForm);
  }

  function addSnippet({ id, title, description, content, language, privated, favorited, creationTimestamp }: typeNewSnippet) {
    setSnippets((prevSnippets) => [...prevSnippets, { id: id, title: title, description: description, content: content, language: language, privated: privated, favorited: favorited, creationTimestamp: creationTimestamp }]);
  }

  function deleteSnippet(id: string) {
    setSnippets((prevSnippets) => [...prevSnippets].filter((snippet) => snippet.id !== id));
  }

  function updateSnippet({ id, title, description, content, language, privated, favorited, creationTimestamp }: typeNewSnippet) {
    setSnippets((prevSnippets) => [...prevSnippets, { id: id, title: title, description: description, content: content, language: language, privated: privated, favorited: favorited, creationTimestamp: creationTimestamp }]);
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
    <div className={styles.App}>
      <AppContext.Provider value={contextProvider}>
        <Header />
        {displayAddSnippetForm && <AddSnippetForm />}
        <SnippetList />
        {snackbarMessages.map((message) => (
          <SnackbarMessage type={message.type} text={message.text} key={message.id} queuePosition={message.queuePosition} id={message.id} />
        ))}
      </AppContext.Provider>
    </div>
  );
}

export default App;

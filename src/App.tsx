import React, { useEffect, useState } from "react";
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
  const [showAddSnippetForm, setShowAddSnippetForm] = useState<boolean>(false);
  const [filterSnippetsByLanguages, setFilterSnippetsByLanguages] = useState<SupportedLanguages[]>([]);

  function toggleAddSnippetFormDisplay(): void {
    setShowAddSnippetForm(!showAddSnippetForm);
  }

  function addSnippet({ title, description, content, language, assignedLabels }: newSnippet) {
    setSnippets((prevSnippets) => [...prevSnippets, { id: Math.random().toString(), title: title, description: description, content: content, language: language, assignedLabels: assignedLabels }]);
  }

  function addFilter(filterLanguage: SupportedLanguages) {
    if (filterSnippetsByLanguages.includes(filterLanguage)) {
      setFilterSnippetsByLanguages((filterSnippetsByLanguages) => filterSnippetsByLanguages.filter((language) => language !== filterLanguage));
    } else {
      setFilterSnippetsByLanguages((filterSnippetsByLanguages) => [...filterSnippetsByLanguages, filterLanguage]);
    }
    return;
  }

  return (
    <div className="App">
      <AppContext.Provider value={{ snippets, showAddSnippetForm, toggleAddSnippetFormDisplay, submitHandler: addSnippet, filterSnippetsByLanguages, addFilter }}>
        <Header />
        {showAddSnippetForm && <AddSnippetForm />}
        <SnippetList />
      </AppContext.Provider>
    </div>
  );
}

export default App;

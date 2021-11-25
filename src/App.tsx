import React, { useEffect, useState } from "react";
import { AppContext } from "./context/context";
import { AddSnippetForm } from "./components/AddSnippetForm/AddSnippetForm";
import { Header } from "./components/Header/Header";
import { Snippet } from "./components/Snippet/Snippet";
import { labelData, supportedLanguages, typeSnippet } from "./config/config";

const snippetsMock = `[
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
]`;

interface newSnippet {
  title: string;
  description: string;
  content: string;
  language: typeof supportedLanguages;
  assignedLabels: labelData[];
}

function App() {
  const [mockedSnippets, setMockedSnippets] = useState<typeSnippet[]>([JSON.parse(snippetsMock)]);
  const [snippets, setSnippets] = useState<typeSnippet[]>([JSON.parse(snippetsMock)]);
  const [showAddSnippetForm, setShowAddSnippetForm] = useState<boolean>(false);
  const [filterSnippetsByLanguages, setFilterSnippetsByLanguages] = useState<typeof supportedLanguages[]>([]);

  function toggleAddSnippetFormDisplay(): void {
    setShowAddSnippetForm(!showAddSnippetForm);
  }

  function addSnippet({ title, description, content, language, assignedLabels }: newSnippet) {
    setSnippets((prevSnippets) => [...prevSnippets, { id: Math.random().toString(), title: title, description: description, content: content, language: language, assignedLabels: assignedLabels }]);
  }

  function addFilter(filterLanguage: typeof supportedLanguages) {
    if (filterSnippetsByLanguages.includes(filterLanguage)) {
      setFilterSnippetsByLanguages((filterSnippetsByLanguages) => filterSnippetsByLanguages.filter((language) => language !== filterLanguage));
    } else {
      setFilterSnippetsByLanguages((filterSnippetsByLanguages) => [...filterSnippetsByLanguages, filterLanguage]);
    }
    return;
  }

  //continue here
  useEffect(() => {
    setSnippets(mockedSnippets.filter((mockedSnippet) => filterSnippetsByLanguages.includes(mockedSnippet.language)));
  }, [filterSnippetsByLanguages]);

  return (
    <div className="App">
      <AppContext.Provider value={{ snippets, showAddSnippetForm, toggleAddSnippetFormDisplay, submitHandler: addSnippet, addFilter }}>
        <Header />
        {showAddSnippetForm && <AddSnippetForm />}
        {snippets.map((snippet) => (
          <Snippet key={snippet.id} id={snippet.id} title={snippet.title} description={snippet.description} content={snippet.content} language={snippet.language} assignedLabels={snippet.assignedLabels} />
        ))}
      </AppContext.Provider>
    </div>
  );
}

export default App;

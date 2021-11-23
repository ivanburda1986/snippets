import React, { useEffect, useState } from "react";
import { AppContext } from "./context/context";
import { AddSnippetForm } from "./components/AddSnippetForm/AddSnippetForm";
import { Header } from "./components/Header/Header";
import { Snippet } from "./components/Snippet/Snippet";
import { labelData, supportedLanguages } from "./config/config";

const snippetsMock = [
  {
    id: "1ab",
    title: "My snippet number one",
    description: "This is how props get loaded",
    assignedLabels: [{ name: "Javascript", language: "js", bgColor: "gold" }],
    content: `{
      <div>
        <div id="snippetBody">
          <pre className="prettyprint">{obj}</pre>
        </div>
      </div>
    }`,
    language: "js",
  },
  {
    id: "2ac",
    title: "My snippet number two",
    description: "Some rainbow magic",
    assignedLabels: [{ name: "Javascript", language: "js", bgColor: "gold" }],
    content: `{
      const user = {
        firstName: "Angela",
        lastName: "Davis",
        role: "Professor",
      }
      console.log(user.name)
    }`,
    language: "js",
  },
];

interface newSnippet {
  title: string;
  description: string;
  content: string;
  language: string;
  assignedLabels: labelData[];
}

function App() {
  const [snippets, setSnippets] = useState(snippetsMock);
  const [showAddSnippetForm, setShowAddSnippetForm] = useState(false);
  const [filterSnippetsByLanguages, setFilterSnippetsByLanguages] = useState<supportedLanguages[]>([]);

  function toggleAddSnippetFormDisplay(): void {
    setShowAddSnippetForm(!showAddSnippetForm);
  }

  function addSnippet({ title, description, content, language, assignedLabels }: newSnippet) {
    setSnippets((prevSnippets) => [...prevSnippets, { id: Math.random().toString(), title: title, description: description, content: content, language: language, assignedLabels: assignedLabels }]);
  }

  function addFilter(filterLanguage: supportedLanguages) {
    if (filterSnippetsByLanguages.includes(filterLanguage)) {
      setFilterSnippetsByLanguages((filterSnippetsByLanguages) => filterSnippetsByLanguages.filter((language) => language !== filterLanguage));
    } else {
      setFilterSnippetsByLanguages((filterSnippetsByLanguages) => [...filterSnippetsByLanguages, filterLanguage]);
    }
    return;
  }

  //continue here
  useEffect(() => {
    setSnippets((snippets) => [...snippets].filter((snippet) => filterSnippetsByLanguages.includes("js")));
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

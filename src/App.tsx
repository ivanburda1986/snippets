import React, { useState } from "react";
import { AppContext } from "./context/context";
import { AddSnippetForm } from "./components/AddSnippetForm/AddSnippetForm";
import { Header } from "./components/Header/Header";
import { Snippet } from "./components/Snippet/Snippet";

const snippetsMock = [
  {
    id: "1ab",
    title: "My snippet number one",
    description: "This is how props get loaded",
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
}

function App() {
  const [snippets, setSnippets] = useState(snippetsMock);
  const [showAddSnippetForm, setShowAddSnippetForm] = useState(false);

  function toggleAddSnippetFormDisplay(): void {
    setShowAddSnippetForm(!showAddSnippetForm);
  }

  function addSnippet({ title, description, content, language }: newSnippet) {
    //console.log(title, description, content, language);
    setSnippets((prevSnippets) => [...prevSnippets, { id: Math.random().toString(), title: title, description: description, content: content, language: language }]);
  }

  return (
    <div className="App">
      <AppContext.Provider value={{ snippets, showAddSnippetForm, toggleAddSnippetFormDisplay, submitHandler: addSnippet }}>
        <Header />
        {showAddSnippetForm && <AddSnippetForm />}
        {snippets.map((snippet) => (
          <Snippet key={snippet.id} id={snippet.id} title={snippet.title} description={snippet.description} content={snippet.content} language={snippet.language} />
        ))}
      </AppContext.Provider>
    </div>
  );
}

export default App;

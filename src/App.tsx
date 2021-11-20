import React, { useState } from "react";
import { AppContext } from "./context/context";
import { AddSnippetForm } from "./components/AddSnippetForm/AddSnippetForm";
import { Header } from "./components/Header/Header";
import { Snippet } from "./components/Snippet/Snippet";

const snippetsMock = [
  {
    id: 1,
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
    id: 2,
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

function App() {
  const [snippets, setSnippets] = useState(snippetsMock);
  const [showAddSnippetForm, setShowAddSnippetForm] = useState(false);

  function toggleAddSnippetFormDisplay() {
    setShowAddSnippetForm(!showAddSnippetForm);
  }

  return (
    <div className="App">
      <AppContext.Provider value={{ snippets, toggleAddSnippetFormDisplay }}>
        <Header />
        {showAddSnippetForm && <AddSnippetForm />}
        {snippets.map((snippet) => (
          <Snippet key={snippet.id} snippetContent={snippet.content} language={snippet.language} />
        ))}
      </AppContext.Provider>
    </div>
  );
}

export default App;

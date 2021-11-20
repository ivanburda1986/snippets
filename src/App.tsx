import React, { useState } from "react";
import { AddSnippetForm } from "./components/AddSnippetForm/AddSnippetForm";
import { Header } from "./components/Header/Header";
import { Snippet } from "./components/Snippet/Snippet";

const snippetsMock = [
  {
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
  return (
    <div className="App">
      <Header />
      <AddSnippetForm />
      {snippets.map((snippet) => (
        <Snippet snippetContent={snippet.content} language={snippet.language} />
      ))}
    </div>
  );
}

export default App;

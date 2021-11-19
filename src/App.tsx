import React from "react";
import { Header } from "./components/Header/Header";
import Snippet from "./components/Snippet/Snippet";

const snippets = [
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
  return (
    <div className="App">
      <Header />
      {snippets.map((snippet) => (
        <Snippet snippetContent={snippet.content} language={snippet.language} />
      ))}
    </div>
  );
}

export default App;

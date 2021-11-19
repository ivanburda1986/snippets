import React from "react";

export default function Snippet({ snippetContent, language }: { snippetContent: string; language: string }) {
  const obj = snippetContent;
  return (
    <div>
      <div id="snippetBody">
        <pre className="prettyprint">
          <code className={`lang-${language}`}> {obj}</code>
        </pre>
      </div>
    </div>
  );
}

import React from "react";

export default function Snippet() {
  const obj = `{
    <div>
    <div id="snippetBody">
      <pre className="prettyprint">{obj}</pre>
    </div>
  </div>
}`;
  return (
    <div>
      <div id="snippetBody">
        <pre className="prettyprint">
          <code className="lang-js"> {obj}</code>
        </pre>
      </div>
    </div>
  );
}

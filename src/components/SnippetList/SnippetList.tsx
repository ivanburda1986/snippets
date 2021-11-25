import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/context";
import { SupportedLanguages, typeSnippet } from "../../config/config";
import { Snippet } from "../Snippet/Snippet";

export function SnippetList() {
  const mycontext = useContext(AppContext);
  const snippets: typeSnippet[] = mycontext.snippets;
  const filter: SupportedLanguages[] = mycontext.filterSnippetsByLanguages;
  const [filteredSnippets, setFilteredSnippets] = useState<typeSnippet[]>([]);

  useEffect(() => {
    setFilteredSnippets(snippets.filter((snippet) => filter.includes(snippet.language)));
  }, [filter, snippets]);

  return (
    <div>
      {filteredSnippets.map((snippet) => (
        <Snippet key={snippet.id} id={snippet.id} title={snippet.title} description={snippet.description} content={snippet.content} language={snippet.language} assignedLabels={snippet.assignedLabels} />
      ))}
    </div>
  );
}

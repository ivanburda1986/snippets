import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/context";
import { supportedSnippetTypes, typeSnippet } from "../../config/config";
import { Snippet } from "../Snippet/Snippet";
import sharedStyles from "../sharedStyles/sharedStyles.module.css";

export function SnippetList() {
  const mycontext = useContext(AppContext);
  const snippets: typeSnippet[] = mycontext.snippets;
  const filter: supportedSnippetTypes[] = mycontext.languagesToFilterSnippetsBy;
  const [filteredSnippets, setFilteredSnippets] = useState<typeSnippet[]>([]);

  useEffect(() => {
    setFilteredSnippets(
      snippets
        .filter((snippet) => filter.includes(snippet.language))
        .sort((a, b) => a.creationTimestamp - b.creationTimestamp)
        .sort((a, b) => b.favorited - a.favorited)
    );
  }, [filter, snippets]);

  return (
    <div className={sharedStyles.container}>
      {filteredSnippets.map((snippet) => (
        <Snippet key={snippet.id} id={snippet.id} title={snippet.title} description={snippet.description} content={snippet.content} language={snippet.language} favorited={snippet.favorited} creationTimestamp={snippet.creationTimestamp} />
      ))}
    </div>
  );
}

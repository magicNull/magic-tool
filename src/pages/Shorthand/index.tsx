// 速记
import React from "react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function index() {
  const renderers = {
    code: (e: {
      language: string | undefined;
      value:
        | boolean
        | React.ReactChild
        | React.ReactFragment
        | React.ReactPortal
        | null
        | undefined;
    }) => {
      return (
        <SyntaxHighlighter
          style={dark}
          language={e.language}
          children={e.value}
        />
      );
    },
  };

  // Did you know you can use tildes instead of backticks for code in markdown? ✨
  const markdown = `这里还是施工区:
  
  ~~~js
  console.log('test')
  ~~~
  `;

  return (
    <div>
      <ReactMarkdown
        renderers={renderers}
        plugins={[[gfm]]}
        children={markdown}
      />
    </div>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import { Splitter, SplitterPanel } from 'primereact/splitter';
import { TabView, TabPanel } from 'primereact/tabview';
import { html2MarkDown } from '../utils/markdowwn2HTML';
import MDToolbar from './MDToolbar';
import CodeMirror from '@uiw/react-codemirror';
import mermaid from 'mermaid';
import { EditorView } from '@codemirror/view';


import { drawSelection } from '@codemirror/view';

import { markdownLanguage,markdown } from '@codemirror/lang-markdown';

import katex from "katex";
import "katex/dist/katex.min.css";

function renderMath(content) {
  if (!content) return "";

  // Primero las ecuaciones de bloque ($$...$$)
  content = content.replace(/\$\$([^$]+)\$\$/g, (_, tex) => {
    try {
      return katex.renderToString(tex, { displayMode: true });
    } catch (err) {
      console.error(err);
      return `<span style="color: red;">${tex}</span>`;
    }
  });

  // Luego las ecuaciones en línea ($...$)
  content = content.replace(/\$([^$]+)\$/g, (_, tex) => {
    try {
      return katex.renderToString(tex, { displayMode: false });
    } catch (err) {
      console.error(err);
      return `<span style="color: red;">${tex}</span>`;
    }
  });

  return content;
}


export default function EditorMarkdown() {
  const scrollableTabs = [
    { title: "Tab 1" },
    { title: "Tab 2" },
    { title: "Tab 3" }
  ];

  const [content, setContent] = useState("");
  const [mode, setMode] = useState("split");

  const renderedRef = useRef(null);

  useEffect(() => {
    if (renderedRef.current) {
      const html = html2MarkDown(content);    // Markdown a HTML
      const htmlWithMath = renderMath(html);   // Luego procesa LaTeX en el HTML
      renderedRef.current.innerHTML = htmlWithMath;
    }
  }, [content]);

  const getDisplay = (target) => {
    if (mode === 'split') return 'block';
    if (mode === 'code' && target === 'editor') return 'block';
    if (mode === 'preview' && target === 'preview') return 'block';
    return 'none';
  };

  <MDToolbar mode={mode} setMode={setMode} />

  return (
    <TabView style={{ width: "100%", margin: "0px", padding: "0px" }} scrollable>
      {scrollableTabs.map((tab) => (
        <TabPanel style={{ margin: "0px", padding: "0px" }} size={100} key={tab.title} header={tab.title} closable>
          <Splitter style={{ margin: "0px", padding: "0px" }} layout="vertical">
            <SplitterPanel style={{ margin: "0px", padding: "0px" }} className="flex align-items-center justify-content-center" size={15}>
              <MDToolbar mode={mode} setMode={setMode} />
            </SplitterPanel>
            <SplitterPanel style={{ margin: "0px", padding: "0px" }} size={85}>
              <Splitter>
                <SplitterPanel style={{ display: getDisplay('editor') }} className="flex align-items-center justify-content-center" size={50}>
                  <CodeMirror
                    id="code"
                    style={{
                      background: "transparent !important",
                      width: "100%",
                      height: "80vh",
                      border: "none",
                      outline: "none",
                      overflowY: "scroll",
                      overflowX: "hidden",
                      marginBottom: "0px",
                      padding: "0rem",
                      wordBreak: "break-word", // Aunque no siempre basta
                      overflowWrap: "break-word",
                      whiteSpace: "pre-wrap", 
                      
                    }}
                    height="85vh"
                    value={content}
                    options={
                      {
                        lineNumbers: true,
                        bracketMatching: true,
                        lineBreak: true,
                        lineWrapping: true,
                      }
                    }
                    extensions={[markdown({ 
                      base: markdownLanguage }),
                      EditorView.lineWrapping,
                      drawSelection()
                    ]}
                    theme='dark'
                    onChange={React.useCallback((val, viewUpdate) => {
                      setContent(val);
                    }, [])}
                  />
                </SplitterPanel>
                <SplitterPanel style={{ display: getDisplay('preview') }} className="flex align-items-center justify-content-center" size={50}>
                  <div
                    id="rendered"
                    ref={renderedRef}
                    style={{
                      width: "100%",
                      overflowY: "scroll",
                      padding: "1rem",
                      height: "80vh",
                      wordBreak: "break-word",
                      overflowWrap: "break-word",
                      whiteSpace: "normal",
                    }}
                  />
                </SplitterPanel>
              </Splitter>
            </SplitterPanel>
          </Splitter>

        </TabPanel>
      ))}

    </TabView>
  );
}



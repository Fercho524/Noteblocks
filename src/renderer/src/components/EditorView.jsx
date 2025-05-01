import React, { useState, useEffect, useRef } from 'react';

import { TabView, TabPanel } from 'primereact/tabview';
import { Splitter, SplitterPanel } from 'primereact/splitter';

import CodeMirror from '@uiw/react-codemirror';
import { keymap } from '@codemirror/view';
import { EditorView } from '@codemirror/view';
import { drawSelection } from '@codemirror/view';
import { markdownLanguage, markdown } from '@codemirror/lang-markdown';
import { Toast } from 'primereact/toast';
import katex from 'katex';

import { materialDark } from '@uiw/codemirror-theme-material';

import 'katex/dist/katex.min.css';
import { html2MarkDown } from '../utils/markdowwn2HTML';

import MDToolbar from './MDToolbar';



function renderMath(content) {
  if (!content) return '';

  // bloque de ecuaciones ($$ ... $$)
  content = content.replace(/\$\$([^$]+)\$\$/g, (_, tex) => {
    try {
      return katex.renderToString(tex, { displayMode: true });
    } catch {
      return `<span style="color:red;">${tex}</span>`;
    }
  });

  // inline math ($ ... $)
  content = content.replace(/\$([^$]+)\$/g, (_, tex) => {
    // Verificar si el contenido parece realmente una fórmula
    const isProbablyMath = /[a-zA-Z\\^_\+\-\*\=]/.test(tex.trim());
    if (!isProbablyMath) {
      // No parece math real: no cambiar
      return `$${tex}$`;
    }
    try {
      return katex.renderToString(tex, { displayMode: false });
    } catch {
      return `<span style="color:red;">${tex}</span>`;
    }
  });

  return content;
}

function boldKeybind(view) {
  const { state, dispatch } = view;
  const sel = state.selection.main;
  if (sel.empty) return false;
  const text = state.doc.sliceString(sel.from, sel.to);
  const isBold = /^\*\*(.*)\*\*$/.test(text);
  const wrapped = isBold ? text.slice(2, -2) : `**${text}**`;
  dispatch({
    changes: { from: sel.from, to: sel.to, insert: wrapped },
    selection: {
      anchor: sel.from + (isBold ? 0 : 2),
      head: sel.to + (isBold ? -4 : 2)
    },
    scrollIntoView: true
  });
  return true;
}


export default function EditorMarkdown({ tabs, setTabs, activeIndex, setActiveIndex }) {
  // Code - Rendered
  const [mode, setMode] = useState('split');
  const renderedRef = useRef(null);
  const editorViewRef = useRef(null);

  const [theme, setTheme] = useState(materialDark)

  // Messages
  const [showSavedMessage, SetShowSavedMessage] = useState(false)
  const toast = useRef(null);


  const show = () => {
    toast.current.show({ severity: 'success', summary: 'Saved File', detail: 'File saved successfully' });
  };


  const updatePreview = async (text, fileDir) => {
    if (!renderedRef.current) return;
    const html = await html2MarkDown(text, fileDir);
    // renderMath inline:
    const rendered = html
      .replace(/\$\$([^$]+)\$\$/g, (_, tex) => {
        try { return katex.renderToString(tex, { displayMode: true }); }
        catch { return `<span style="color:red;">${tex}</span>`; }
      })
      .replace(/\$([^$]+)\$/g, (_, tex) => {
        const isMath = /[a-zA-Z\\^_\+\-\*\=]/.test(tex.trim());
        if (!isMath) return `$${tex}$`;
        try { return katex.renderToString(tex, { displayMode: false }); }
        catch { return `<span style="color:red;">${tex}</span>`; }
      });
    renderedRef.current.innerHTML = rendered;
  };

  // Autorender markdown
  useEffect(() => {
    if (tabs.length === 0) return;
    const tab = tabs[activeIndex];
    if (!tab || !renderedRef.current) return;

    (async () => {
      const html = await html2MarkDown(tab.content, tab.fileDir);
      renderedRef.current.innerHTML = renderMath(html);
    })();
  }, [tabs, activeIndex, mode]);

  // Paste Image
  useEffect(() => {
    const handlePaste = async (ev) => {
      const view = editorViewRef.current;
      if (!view) return;
      for (const item of ev.clipboardData.items) {
        if (item.type.startsWith('image/')) {
          ev.preventDefault();
          const file = item.getAsFile();
          const reader = new FileReader();
          reader.onloadend = async () => {
            const base64 = reader.result.split(',')[1];
            const rel = await window.api.saveClipboardImage(base64);
            const snip = `![pasted image](${rel})`;
            const pos = view.state.selection.main.head;
            view.dispatch({ changes: { from: pos, insert: snip }, selection: { anchor: pos + snip.length } });
          };
          reader.readAsDataURL(file);
          break;
        }
      }
    };
    document.addEventListener('paste', handlePaste);
    return () => document.removeEventListener('paste', handlePaste);
  }, [activeIndex]);


  // Toggle Preview | Editor
  const getDisplay = (target) => {
    if (mode === 'split') return 'block';
    if (mode === 'code' && target === 'editor') return 'block';
    if (mode === 'preview' && target === 'preview') return 'block';
    return 'none';
  };


  // Tabs
  function removeTab(indexToRemove) {
    setTabs(prevTabs => {
      const newTabs = prevTabs.filter((_, index) => index !== indexToRemove);

      // Ajustar activeIndex si es necesario
      if (newTabs.length === 0) {
        setActiveIndex(0);
      } else if (indexToRemove >= newTabs.length) {
        setActiveIndex(newTabs.length - 1);
      } else {
        setActiveIndex(indexToRemove);
      }

      return newTabs;
    });
  }

  if (tabs.length === 0) {
    return (
      <div className="flex flex-column align-items-center justify-content-center" style={{ height: '100%', padding: "3rem" }}>
        <i className="pi pi-book" style={{ fontSize: '4rem', marginBottom: '1rem', color: '#ccc' }}></i>
        <h2>Bienvenido a Noteblocks</h2>
        <p>Comienza abriendo o creando una nota desde la barra lateral.</p>
      </div>
    );
  }


  const boldKeybind = (view) => {
    const { state, dispatch } = view;
    const selection = state.selection.main;

    // No hay selección
    if (selection.empty) return false;

    const selectedText = state.doc.sliceString(selection.from, selection.to);
    const isBold = /^\*\*(.*)\*\*$/.test(selectedText);

    let replacement = '';
    if (isBold) {
      // Ya está en negrita, quitamos los asteriscos
      replacement = selectedText.slice(2, -2);
    } else {
      // Lo ponemos en negrita
      replacement = `**${selectedText}**`;
    }

    dispatch({
      changes: {
        from: selection.from,
        to: selection.to,
        insert: replacement
      },
      selection: {
        anchor: selection.from + (isBold ? 0 : 2),
        head: selection.to + (isBold ? -4 : 2)
      },
      scrollIntoView: true
    });

    return true;
  }


  const editorLayout = {
    tabs: {
      width: 65,
      height: 15,
    },
    editor: {
      width: 65,
      height: 80,
    }
  }

  const handleBlur = async (e) => {
    if (editorViewRef.current) {
      const currentContent = editorViewRef.current.state.doc.toString();
      await window.api.saveFile(tab.filePath, currentContent);
      console.log('Archivo guardado automáticamente.');
    }
  };

  return (
    <div className="card">
      <TabView
        style={{ margin: 0, padding: 0, width: `${editorLayout.editor.width}vw` }}
        scrollable
        activeIndex={activeIndex}
        onTabClose={(e) => { removeTab(e.index) }}
        onTabChange={(e) => { setActiveIndex(e.index) }}
      >
        {tabs.map((tab, idx) => {
          const onBlur = async () => {
            const view = editorViewRef.current;
            if (!view) return;
            const content = view.state.doc.toString();
            await window.api.saveFile(tab.filePath, content);
          };

          // Keymaps específicos de esta pestaña
          const km = keymap.of([
            {
              key: 'Mod-s',
              preventDefault: true,
              run: async view => {
                const content = view.state.doc.toString();
                await window.api.saveFile(tab.filePath, content);
                toast.current.show({ severity: 'success', summary: 'Guardado', detail: tab.title });
                return true;
              }
            },
            {
              key: 'Mod-b',
              preventDefault: true,
              run: boldKeybind
            },
            {
              key: 'Mod-w',          // <-- Ctrl+W (Cmd+W en mac)
              preventDefault: true,
              run: () => {
                removeTab(idx);      // cierra esta pestaña
                return true;         // marca que el atajo ha sido procesado
              }
            }
          ]);

          return (
            <TabPanel
              key={tab.key}
              header={
                <div
                  style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                >
                  {tab.title}
                  {tab.temporary && <span style={{ marginLeft: 4 }}>*</span>}
                </div>
              }
              onMouseDown={(e) => {
                if (e.button === 1) { // 1 = Middle click
                  e.preventDefault(); // Previene el scroll por click medio
                  removeTab(idx);
                }
              }}
              closable
              style={{ margin: 0, padding: 0 }}
            >
              <Splitter layout="vertical" style={{ margin: 0, padding: 0 }}>
                <SplitterPanel
                  style={{ margin: 0, padding: 0,height: `${editorLayout.tabs.height}vh` }}
                  className="flex align-items-center justify-content-center"
                  size={15}
                >
                  <MDToolbar mode={mode} setMode={setMode} showSavedMessage={showSavedMessage} style={{
                    height: `${editorLayout.tabs.height}vh`,
                  }} />
                </SplitterPanel>
                <SplitterPanel style={{ margin: 0, padding: 0 }} size={85}>
                  <Splitter>
                    <SplitterPanel
                      className="flex align-items-center justify-content-center"
                      size={50}
                      style={{ display: getDisplay('editor') }}
                    >
                      <CodeMirror
                        id="code"
                        key={tab.key}
                        value={tab.content}

                        height={`${editorLayout.editor.height}vh`}
                        style={{
                          background: 'transparent',
                          width: '100%',
                          height: '100%',
                          border: 'none',
                          outline: 'none'
                        }}
                        options={{ lineNumbers: true, bracketMatching: true, lineWrapping: true }}


                        extensions={[
                          theme,
                          markdown({ base: markdownLanguage }),
                          EditorView.lineWrapping,
                          drawSelection(),
                          km,
                          EditorView.updateListener.of(update => {
                            if (update.docChanged) {
                              const text = update.state.doc.toString();
                              // actualizar preview inmediatamente
                              updatePreview(text, tab.fileDir, renderedRef);
                            }
                          })
                        ]}
                        theme={theme}

                        onChange={() => { }}


                        onCreateEditor={view => {
                          editorViewRef.current = view;

                          const initial = tabs[activeIndex].content || "";
                          view.dispatch({
                            changes: {
                              from: 0,
                              to: view.state.doc.length,    // cubre todo el documento actual
                              insert: initial               // inserta tu contenido
                            }
                          });

                          view.dom.addEventListener('focusout', async () => {
                            const txt = view.state.doc.toString();
                            await window.api.saveFile(tab.filePath, txt);
                            console.log("Archivo guardado automáticamente")
                            setTabs(prev =>
                              prev.map((t, i) => i === idx ? { ...t, content: txt } : t)
                            );
                            //toast.current.show({ severity: 'success', summary: 'Guardado', detail: tab.title });
                          });
                        }}
                      // onChange={(value) => setTabs(prev => prev.map((t, i) => i === idx ? { ...t, content: value } : t))}
                      />
                    </SplitterPanel>
                    <SplitterPanel
                      className="flex align-items-center justify-content-center"
                      size={50}
                      style={{ display: getDisplay('preview') }}
                    >
                      <div
                        id="rendered"
                        ref={renderedRef}
                        style={{
                          width: '100%',
                          padding: '2rem',
                          height: `${editorLayout.editor.height}vh`,
                          wordBreak: 'break-word',
                          overflowWrap: 'anywhere',
                          whiteSpace: 'pre-wrap',
                          overflowX: 'auto',
                          overflowY: 'auto'
                        }}
                      />
                    </SplitterPanel>
                  </Splitter>
                </SplitterPanel>
              </Splitter>
              <Toast ref={toast} />
            </TabPanel>
          )
        })}
      </TabView>
    </div>
  );

}
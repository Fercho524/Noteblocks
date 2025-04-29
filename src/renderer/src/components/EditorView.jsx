import React, { useState, useEffect, useRef } from 'react';

import { TabView, TabPanel } from 'primereact/tabview';
import { Splitter, SplitterPanel } from 'primereact/splitter';

import CodeMirror from '@uiw/react-codemirror';
import { EditorView } from '@codemirror/view';
import { drawSelection } from '@codemirror/view';
import { markdownLanguage, markdown } from '@codemirror/lang-markdown';

import katex from 'katex';
import 'katex/dist/katex.min.css';
import { html2MarkDown } from '../utils/markdowwn2HTML';

import MDToolbar from './MDToolbar';


function renderMath(content) {
  if (!content) return '';
  // bloque de ecuaciones
  content = content.replace(/\$\$([^$]+)\$\$/g, (_, tex) => {
    try { return katex.renderToString(tex, { displayMode: true }); }
    catch { return `<span style="color:red;">${tex}</span>`; }
  });
  // inline
  content = content.replace(/\$([^$]+)\$/g, (_, tex) => {
    try { return katex.renderToString(tex, { displayMode: false }); }
    catch { return `<span style="color:red;">${tex}</span>`; }
  });
  return content;
}


export default function EditorMarkdown() {
  // Tabs
  const [tabs, setTabs] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  // Code - Rendered
  const [mode, setMode] = useState('split');
  const renderedRef = useRef(null);
  const editorViewRef = useRef(null);


  // Render preview on active tab
  useEffect(() => {
    if (tabs.length === 0) return;
    const tab = tabs[activeIndex];
    if (!tab || !renderedRef.current) return;

    (async () => {
      const html = await html2MarkDown(tab.content, tab.fileDir);
      renderedRef.current.innerHTML = renderMath(html);
    })();
  }, [tabs, activeIndex, mode]);


  // File Selection Open Tab
  useEffect(() => {
    const handler = async (e) => {
      const { fileName, filePath } = e.detail;
      const currentDir = await window.api.getCurrentDir();
      const content = await window.api.readFile(fileName);

      setTabs(prev => {
        const idx = prev.findIndex(t => t.key === filePath);
        if (idx >= 0) {
          setActiveIndex(idx);
          return prev;
        }
        const updated = [...prev, { key: filePath, title: fileName, fileDir: currentDir, content }];
        setActiveIndex(updated.length - 1);
        return updated;
      });
    };

    window.addEventListener('file-selected', handler);
    return () => window.removeEventListener('file-selected', handler);
  }, []);

  // Pin tab on double click
  const pinTab = (idx) => {
    setTabs(prev =>
      prev.map((t, i) => (i === idx ? { ...t, temporary: false } : t))
    );
    setActiveIndex(idx);
  };


  // Close tab with functional update
  const closeTab = (e) => {
    setTabs(prev => {
      const filtered = prev.filter((_, i) => i !== e.index);
      setActiveIndex(old => {
        if (filtered.length === 0) return 0;
        if (old > e.index) return old - 1;
        if (old === e.index) return Math.max(0, e.index - 1);
        return old;
      });
      return filtered;
    });
  };


  // Paste image at cursor
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

  // Determine panel display
  const getDisplay = (target) => {
    if (mode === 'split') return 'block';
    if (mode === 'code' && target === 'editor') return 'block';
    if (mode === 'preview' && target === 'preview') return 'block';
    return 'none';
  };




  return (
    <div className="card">
      <TabView
        style={{ margin: 0, padding: 0, width: "65vw" }}
        scrollable
        activeIndex={activeIndex}
        onTabChange={e => setActiveIndex(e.index)}

        onTabClose={closeTab}
      >
        {tabs.map((tab, idx) => (
          <TabPanel
            key={tab.key}
            header={
              <div
                onClick={() => pinTab(idx)}
                style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
              >
                {tab.title}
                {tab.temporary && <span style={{ marginLeft: 4 }}>*</span>}
              </div>
            }
            closable
            style={{ margin: 0, padding: 0 }}
          >
            <Splitter layout="vertical" style={{ margin: 0, padding: 0 }}>
              <SplitterPanel
                style={{ margin: 0, padding: 0 }}
                className="flex align-items-center justify-content-center"
                size={15}
              >
                <MDToolbar mode={mode} setMode={setMode} />
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
                      value={tab.content}
                      height="85vh"
                      style={{
                        background: 'transparent',
                        width: '100%',
                        height: '100%',
                        border: 'none',
                        outline: 'none'
                      }}
                      options={{ lineNumbers: true, bracketMatching: true, lineWrapping: true }}
                      extensions={[markdown({ base: markdownLanguage }), EditorView.lineWrapping, drawSelection()]}
                      theme="dark"
                      onCreateEditor={view => { editorViewRef.current = view; }}
                      onChange={(value) => setTabs(prev => prev.map((t, i) => i === idx ? { ...t, content: value } : t))}
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
                        padding: '1rem',
                        height: '85vh',
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
          </TabPanel>
        ))}
      </TabView>
    </div>
  );

}
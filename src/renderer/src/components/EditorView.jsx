import React, { useState, useEffect, useRef } from 'react';
import { Splitter, SplitterPanel } from 'primereact/splitter';
import { TabView, TabPanel } from 'primereact/tabview';
import { html2MarkDown } from '../utils/markdowwn2HTML';
import MDToolbar from './MDToolbar';
import CodeMirror from '@uiw/react-codemirror';
import { EditorView } from '@codemirror/view';
import { markdownLanguage, markdown } from '@codemirror/lang-markdown';
import { drawSelection } from '@codemirror/view';
import katex from 'katex';
import 'katex/dist/katex.min.css';

function renderMath(content) {
  if (!content) return '';

  content = content.replace(/\$\$([^$]+)\$\$/g, (_, tex) => {
    try {
      return katex.renderToString(tex, { displayMode: true });
    } catch (err) {
      console.error(err);
      return `<span style="color: red;">${tex}</span>`;
    }
  });

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
  const [tabs, setTabs] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [mode, setMode] = useState('split');
  const renderedRef = useRef(null);
  const editorViewRef = useRef(null);


  useEffect(() => {
    const loadHtml = async () => {
      if (!tabs[activeIndex] || !renderedRef.current) return;
      const currentDir = await window.api.getCurrentDir(); // Pides el currentDir
      const html = await html2MarkDown(tabs[activeIndex].content || '', currentDir);
      const htmlWithMath = renderMath(html);
      renderedRef.current.innerHTML = htmlWithMath;
    };

    loadHtml();
  }, [tabs, activeIndex, mode]);

  useEffect(() => {
    const onFile = async (e) => {
      const fileName = e.detail.fileName;
      const idx = tabs.findIndex(t => t.key === fileName);
      if (idx >= 0) {
        setActiveIndex(idx);
      } else {
        const content = await window.api.readFile(fileName);
        setTabs(prev => [...prev, {
          key: fileName,
          title: fileName,
          content,
          temporary: true
        }]);
        setActiveIndex(tabs.length);
      }
    };
    window.addEventListener('file-selected', onFile);
    return () => window.removeEventListener('file-selected', onFile);
  }, [tabs]);

  const pinTab = (index) => {
    setTabs(prev => prev.map((t, i) => i === index ? { ...t, temporary: false } : t));
  };

  const closeTab = (e) => {
    const index = e.index;
    setTabs((prev) => prev.filter((_, i) => i !== index));
    if (activeIndex >= index) {
      setActiveIndex(Math.max(0, activeIndex - 1));
    }
  };

  const getDisplay = (target) => {
    if (mode === 'split') return 'block';
    if (mode === 'code' && target === 'editor') return 'block';
    if (mode === 'preview' && target === 'preview') return 'block';
    return 'none';
  };

  useEffect(() => {
    const handlePaste = async (event) => {
      if (!editorViewRef.current) return;
      const { items } = event.clipboardData;
      for (let item of items) {
        if (item.type.indexOf('image') === 0) {
          event.preventDefault();
          const file = item.getAsFile();
          const reader = new FileReader();
          reader.onloadend = async () => {
            const base64 = reader.result.split(',')[1];
            const relPath = await window.api.saveClipboardImage(base64);
            const snippet = `![pasted image](${relPath})`;
            const view = editorViewRef.current;
            const pos = view.state.selection.main.head;
            view.dispatch({
              changes: { from: pos, insert: snippet },
              selection: { anchor: pos + snippet.length }
            });
            // onChange will sync content
          };
          reader.readAsDataURL(file);
          break;
        }
      }
    };
    document.addEventListener('paste', handlePaste);
    return () => document.removeEventListener('paste', handlePaste);
  }, [activeIndex]);

  return (
    <TabView
      style={{  margin:0, padding:0 }}
      scrollable
      activeIndex={activeIndex}
      onTabChange={e => setActiveIndex(e.index)}
      onTabClose={closeTab}
    >
      {tabs.map((tab,idx) => (
        <TabPanel
          key={tab.key}
          header={
            <div
              onDoubleClick={()=>pinTab(idx)}
              style={{ display:'flex', alignItems:'center', cursor:'pointer' }}
            >
              {tab.title}
              {tab.temporary && <span style={{ marginLeft:4 }}>*</span>}
            </div>
          }
          closable
          style={{ margin:0, padding:0 }}
        >
          <Splitter layout="vertical" style={{ margin:0, padding:0 }}>
            <SplitterPanel
              style={{ margin:0, padding:0 }}
              className="flex align-items-center justify-content-center"
              size={15}
            >
              <MDToolbar mode={mode} setMode={setMode} />
            </SplitterPanel>
            <SplitterPanel style={{ margin:0, padding:0 }} size={85}>
              <Splitter>
                <SplitterPanel
                  className="flex align-items-center justify-content-center"
                  size={50}
                  style={{ display:getDisplay('editor') }}
                >
                  <CodeMirror
                    id="code"
                    value={tab.content}
                    height="85vh"
                    style={{
                      background:'transparent', width:'100%', height:'80vh',
                      border:'none', outline:'none', overflowY:'scroll',
                      marginBottom:0, padding:0
                    }}
                    options={{
                      lineNumbers:true, bracketMatching:true,
                      lineWrapping:true
                    }}
                    extensions={[
                      markdown({ base:markdownLanguage }),
                      EditorView.lineWrapping,
                      drawSelection()
                    ]}
                    theme="dark"
                    onCreateEditor={(view) => { editorViewRef.current = view; }}
                    onChange={(value, viewUpdate) => {
                      setTabs(prev => prev.map((t,i) => i===idx ? {...t, content:value} : t));
                    }}
                  />
                </SplitterPanel>
                <SplitterPanel
                  className="flex align-items-center justify-content-center"
                  size={50}
                  style={{ display:getDisplay('preview') }}
                >
                  <div
                    ref={renderedRef}
                    style={{
                      width:'100%', overflowY:'scroll', padding:'1rem',
                      height:'80vh', wordBreak:'break-word',
                      overflowWrap:'break-word', whiteSpace:'normal'
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

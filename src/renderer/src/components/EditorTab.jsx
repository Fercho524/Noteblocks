// EditorTab.jsx
import React, { useState, useEffect, useRef } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { EditorView, keymap } from '@codemirror/view';
import { drawSelection } from '@codemirror/view';
import { markdownLanguage, markdown } from '@codemirror/lang-markdown';
import { materialDark } from '@uiw/codemirror-theme-material';
import { boldKeybind } from './boldKeybind'; // si lo exportaste a parte

export default function EditorTab({
  tab,
  idx,
  isActive,
  theme,
  saveAndToast,   // función que guarda en disco y lanza toast
  updateTabContent // función para volcar al global
}) {
  const [localContent, setLocalContent] = useState(tab.content);
  const viewRef = useRef(null);

  // Cuando cambie pestaña o cambie el contenido global (por ejemplo, por reload),
  // recarga sólo si estoy activo:
  useEffect(() => {
    if (isActive) {
      setLocalContent(tab.content);
    }
  }, [isActive, tab.content]);

  const onBlur = async () => {
    const view = viewRef.current;
    if (!view) return;
    const text = view.state.doc.toString();
    await window.api.saveFile(tab.filePath, text);
    saveAndToast(tab.title);
    updateTabContent(idx, text);
  };

  const km = keymap.of([
    {
      key: 'Mod-s',
      preventDefault: true,
      run: async view => {
        const text = view.state.doc.toString();
        await window.api.saveFile(tab.filePath, text);
        saveAndToast(tab.title);
        updateTabContent(idx, text);
        return true;
      }
    },
    {
      key: 'Mod-b',
      preventDefault: true,
      run: boldKeybind
    },
    {
      key: 'Mod-w',
      preventDefault: true,
      run: () => {
        // lo maneja el padre si quieres
        return false;
      }
    }
  ]);

  return (
    <CodeMirror
      value={localContent}
      height="85vh"
      theme={theme}
      extensions={[
        theme,
        markdown({ base: markdownLanguage }),
        EditorView.lineWrapping,
        drawSelection(),
        km
      ]}
      onCreateEditor={view => {
        viewRef.current = view;
        view.dom.addEventListener('focusout', onBlur);
      }}
      onChange={(val) => setLocalContent(val)}
    />
  );
}

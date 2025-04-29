import React from 'react';

import CodeMirror from '@uiw/react-codemirror';
import { EditorView } from '@codemirror/view';
import { drawSelection } from '@codemirror/view';
import { markdownLanguage, markdown } from '@codemirror/lang-markdown';


function CodeEditor({ content,editorViewRef,setTabs }) {
    return (
        <CodeMirror
            id="code"
            value={content}
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
    );
}

export default CodeEditor;

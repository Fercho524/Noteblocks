import React, { useState, useEffect, useRef } from 'react';

import { Splitter, SplitterPanel } from 'primereact/splitter';
import { ScrollPanel } from 'primereact/scrollpanel';

import { html2MarkDown } from '../utils/markdowwn2HTML';

import { TabView, TabPanel } from 'primereact/tabview';


export default function EditorView() {
  const scrollableTabs = [
    { title: "Tab 143" },
    { title: "Tab 243" },
    { title: "Tab 343" },
    { title: "Tab 443" },
    { title: "Tab 543" },
  ]

  const [content, setContent] = useState("");
  const renderedRef = useRef(null);

  useEffect(() => {
    if (renderedRef.current) {
      renderedRef.current.innerHTML = html2MarkDown(content);
    }
  }, [content]);

  return (
    <TabView style={{ width: "100%" }} scrollable>
      {scrollableTabs.map((tab) => (
        <TabPanel key={tab.title} header={tab.title} closable style={{
          background : "rgba(255, 255, 255, 0.137) !important",
          margin : "10px",
          borderRadius : "10px"
        }}>
          <Splitter>
            <SplitterPanel size={50} className="p-2">
              <textarea
                id="code"
                style={{ width: '100%', height: '100%', resize: 'none', background : "transparent" }}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </SplitterPanel>
            <SplitterPanel size={50} className="p-2">
              <ScrollPanel style={{ width: '100%', height: '100%' }}>
                <div id="rendered" ref={renderedRef}></div>
              </ScrollPanel>
            </SplitterPanel>
          </Splitter>
        </TabPanel>
      ))}
    </TabView>

  );
}
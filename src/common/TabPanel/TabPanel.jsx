import React, { useState, useRef } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import TabsList from "../TabsList/TabsList";
import styles from "./TabPanel.module.css";

export default function TabPanel({ tabs = [] }) {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const nodeRef = useRef(null);

  const activeContent = tabs.find((tab) => tab.id === activeTab)?.content;

  return (
    <div className={styles.wrapper}>
      <TabsList tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      <div className={styles.tabContent}>
        <SwitchTransition>
          <CSSTransition
            key={activeTab}
            nodeRef={nodeRef}
            timeout={300}
            classNames={{
              enter: styles.fadeEnter,
              enterActive: styles.fadeEnterActive,
              exit: styles.fadeExit,
              exitActive: styles.fadeExitActive,
            }}
          >
            <div ref={nodeRef}>{activeContent}</div>
          </CSSTransition>
        </SwitchTransition>
      </div>
    </div>
  );
}

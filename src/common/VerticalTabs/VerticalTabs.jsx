import React, { useState, createElement } from "react";
import styles from "./VerticalTabs.module.css";

/* 
    tabs =
     [id]: {
        id = 1,
        label = "qwerty",
        content = <Qwerty/>
    },
*/
export default function VerticalTabs({ tabs }) {
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  const handleSelectTab = (id) => {
    setSelectedTab(tabs[id - 1]);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.navigation}>
        {tabs?.map((tab) => (
          <div
            className={`${styles.tab} ${
              selectedTab?.id === tab.id ? styles.activeTab : ""
            }`}
            key={tab.id}
            onClick={() => handleSelectTab(tab?.id)}
          >
            <p>{tab?.label}</p>
          </div>
        ))}
      </div>

      <div className={styles.content}>
        {selectedTab && (
          <div className={styles.header}>
            {selectedTab?.icon &&
              createElement(selectedTab.icon, { className: styles.icon })}
            {selectedTab?.label}
          </div>
        )}
        <div className={styles.tabContent}>{selectedTab?.content}</div>
      </div>
    </div>
  );
}

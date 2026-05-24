import React, { useState, createElement, useEffect } from "react";
import styles from "./VerticalTabs.module.css";

export default function VerticalTabs({ tabs }) {
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  useEffect(() => {
    if (tabs && tabs.length > 0) {
      const stillExists = tabs.some((tab) => tab.id === selectedTab?.id);
      if (!stillExists) {
        setSelectedTab(tabs[0]);
      }
    }
  }, [tabs, selectedTab]);

  const handleSelectTab = (id) => {
    const newTab = tabs.find((tab) => tab.id === id);
    if (newTab) {
      setSelectedTab(newTab);
    }
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
            onClick={() => handleSelectTab(tab.id)}
          >
            <p>{tab.label}</p>
          </div>
        ))}
      </div>

      <div className={styles.content}>
        {selectedTab && (
          <div className={styles.header}>
            {selectedTab.icon &&
              createElement(selectedTab.icon, { className: styles.icon })}
            {selectedTab.label}
          </div>
        )}
        <div className={styles.tabContent}>{selectedTab?.content}</div>
      </div>
    </div>
  );
}

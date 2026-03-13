import React from "react";
import styles from "./TabsList.module.css";

export default function TabsList({ tabs, activeTab, onChange }) {
  return (
    <div className={styles.tabList}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`${styles.tabButton} ${
            activeTab === tab.id ? styles.active : ""
          }`}
          type="button"
          onClick={() => onChange(tab.id)}
        >
          {tab.title}
        </button>
      ))}
    </div>
  );
}

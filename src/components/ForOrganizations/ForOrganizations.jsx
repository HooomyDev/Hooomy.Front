import React, { useState, useRef } from "react";
import { Transition, SwitchTransition } from "react-transition-group";
import styles from "./ForOrganizations.module.css";
import { tabs } from "./tabs";

const duration = 400;

export default function ForOrganizations({ id }) {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const current = tabs.find((t) => t.id === activeTab);
  const Icon = current.icon;
  const nodeRef = useRef(null);

  return (
    <section id={id} className={styles.wrapper}>
      <h2 className={styles.heading}>Для организаций</h2>
      <p className={styles.subheading}>
        Платформа помогает автоматизировать процессы, повысить прозрачность и
        наладить эффективное взаимодействие с жителями.
      </p>

      <div className={styles.tabList}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`${styles.tabButton} ${
              activeTab === tab.id ? styles.active : ""
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.title}
          </button>
        ))}
      </div>

      <SwitchTransition mode="out-in">
        <Transition
          key={activeTab}
          nodeRef={nodeRef}
          timeout={duration}
          addEndListener={(done) => {
            nodeRef.current?.addEventListener("transitionend", done, {
              once: true,
            });
          }}
        >
          {(state) => (
            <div
              ref={nodeRef}
              className={`${styles.card} ${styles[`fade-${state}`]}`}
            >
              <Icon className={styles.icon} />
              <div>
                <h3 className={styles.title}>{current.title}</h3>
                <p className={styles.description}>{current.description}</p>
              </div>
            </div>
          )}
        </Transition>
      </SwitchTransition>
    </section>
  );
}

import React, { useRef, useState } from "react";
import styles from "./ForOrganizations.module.css";
import { tabs } from "./tabs";
import TabPanel from "../../TabPanel/TabPanel";
import TabsList from "../TabsList/TabsList";
import { SwitchTransition, Transition } from "react-transition-group";

export default function ForOrganizations({ id }) {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const current = tabs.find((t) => t.id === activeTab);
  const nodeRef = useRef(null);

  return (
    <section id={id} className={styles.wrapper}>
      <h2 className={styles.heading}>Для организаций</h2>
      <p className={styles.subheading}>
        Платформа помогает автоматизировать процессы, повысить прозрачность и
        наладить эффективное взаимодействие с жителями.
      </p>

      <TabsList tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      <SwitchTransition mode="out-in">
        <Transition
          key={activeTab}
          nodeRef={nodeRef}
          timeout={400}
          addEndListener={(done) => {
            nodeRef.current?.addEventListener("transitionend", done, {
              once: true,
            });
          }}
        >
          {(state) => (
            <TabPanel
              nodeRef={nodeRef}
              state={state}
              icon={current.icon}
              title={current.title}
              description={current.description}
            />
          )}
        </Transition>
      </SwitchTransition>
    </section>
  );
}

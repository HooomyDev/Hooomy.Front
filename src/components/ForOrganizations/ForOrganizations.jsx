import React, { useRef, useState } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import styles from "./ForOrganizations.module.css";
import {
  BuildingOfficeIcon,
  WrenchScrewdriverIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/outline";

const tabs = [
  {
    id: "uk",
    title: "УК и ТСЖ",
    icon: BuildingOfficeIcon,
    description:
      "Приём заявок, контроль исполнения, аналитика по домам и подъездам. Всё в одном интерфейсе.",
    action: "Запросить демо",
  },
  {
    id: "zhkh",
    title: "Службы ЖКХ",
    icon: WrenchScrewdriverIcon,
    description:
      "Автоматический сбор показаний, планирование ремонтов, контроль подрядчиков и ресурсов.",
    action: "Связаться",
  },
  {
    id: "gov",
    title: "Мингорисполком",
    icon: BuildingLibraryIcon,
    description:
      "Мониторинг активности, отчётность по районам, цифровая обратная связь от граждан.",
    action: "Получить доступ",
  },
];

export default function ForOrganizations() {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const current = tabs.find((t) => t.id === activeTab);
  const Icon = current.icon;
  const nodeRef = useRef(null);

  return (
    <section className={styles.wrapper} id="orgs">
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

      <SwitchTransition>
        <CSSTransition
          key={activeTab}
          timeout={400}
          nodeRef={nodeRef}
          classNames={{
            enter: styles.slideEnter,
            enterActive: styles.slideEnterActive,
            exit: styles.slideExit,
            exitActive: styles.slideExitActive,
          }}
          unmountOnExit
        >
          <div ref={nodeRef} className={styles.card}>
            <Icon className={styles.icon} />
            <div>
              <h3 className={styles.title}>{current.title}</h3>
              <p className={styles.description}>{current.description}</p>
            </div>
          </div>
        </CSSTransition>
      </SwitchTransition>
    </section>
  );
}

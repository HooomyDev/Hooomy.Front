import React from "react";
import Block from "../../common/Block/Block";
import { DocumentTextIcon } from "@heroicons/react/24/solid";
import styles from "./DocTableOfContents.module.css";
import { useT } from "../../utils/useT";

export default function DocTableOfContents({ contents }) {
  const t = useT();

  const handleScrollToAnchor = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <Block title="Содержание" Icon={DocumentTextIcon}>
      <div className={styles.chapter}>
        <ul>
          {contents.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleScrollToAnchor(item.id);
                }}
              >
                {t(item.labelKey)}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Block>
  );
}

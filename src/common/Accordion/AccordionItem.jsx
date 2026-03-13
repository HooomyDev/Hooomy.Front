import React, { useContext, useRef, useEffect, useState } from "react";
import { AccordionContext } from "./Accordion";
import styles from "./Accordion.module.css";
import { ChevronRightIcon } from "@heroicons/react/24/solid";

export default function AccordionItem({ index, title, children }) {
  const { openIndex, toggle } = useContext(AccordionContext);
  const isOpen = openIndex === index;

  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [children]);

  return (
    <div className={styles.accordionItem}>
      <button className={styles.accordionHeader} onClick={() => toggle(index)}>
        {title}
        <span className={`${styles.icon} ${isOpen ? styles.iconOpen : ""}`}>
          <ChevronRightIcon className={styles.svgIcon} />
        </span>
      </button>
      <div
        ref={contentRef}
        className={`${styles.accordionContent} ${isOpen ? styles.open : ""}`}
        style={{ maxHeight: isOpen ? `${height}px` : "0px" }}
      >
        <div className={styles.inner}>{children}</div>
      </div>
    </div>
  );
}

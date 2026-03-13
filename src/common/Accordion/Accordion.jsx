import React, { useState, createContext } from "react";
import styles from "./Accordion.module.css";

export const AccordionContext = createContext();

export default function Accordion({ children }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <AccordionContext.Provider value={{ openIndex, toggle }}>
      <div className={styles.accordion}>{children}</div>
    </AccordionContext.Provider>
  );
}

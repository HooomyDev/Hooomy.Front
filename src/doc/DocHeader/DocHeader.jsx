import React from "react";
import Block from "../../common/Block/Block";
import {
  DocumentArrowDownIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/solid";
import styles from "./DocHeader.module.css";

export default function DocHeader({ title }) {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/files/privacy-policy.pdf";
    link.download = "privacy-policy.pdf";
    link.click();
  };

  return (
    <div className={styles.header}>
      <Block>
        <div className={styles.title}>
          <DocumentTextIcon className={styles.icon} />
          {title}
        </div>
      </Block>

      <div className={styles.download} onClick={handleDownload}>
        <DocumentArrowDownIcon className={styles.icon} />
      </div>
    </div>
  );
}

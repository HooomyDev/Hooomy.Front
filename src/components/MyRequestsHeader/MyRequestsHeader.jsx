import React from "react";
import styles from "./MyRequestsHeader.module.css";
import { useT } from "../../utils/useT";
import Block from "../../common/Block/Block";
import { ClipboardDocumentListIcon } from "@heroicons/react/24/solid";

export default function MyRequestsHeader() {
  const t = useT();

  return (
    <Block>
      <div className={styles.container}>
        <ClipboardDocumentListIcon className={styles.icon} />
        <div className={styles.title}>{t("requests.title")}</div>
      </div>
    </Block>
  );
}

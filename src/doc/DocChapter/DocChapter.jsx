import React from "react";
import Block from "../../common/Block/Block";
import { InformationCircleIcon } from "@heroicons/react/24/solid";
import styles from "./DocChapter.module.css";
import { useT } from "../../utils/useT";

export default function DocChapter({ id, titleKey, content }) {
  const t = useT();

  const renderContent = () => {
    return content.map((item, index) => {
      if (item.type === "p") {
        return <p key={index}>{t(item.textKey)}</p>;
      } else if (item.type === "li") {
        return <li key={index}>{t(item.textKey)}</li>;
      }
      return null;
    });
  };

  return (
    <Block title={t(titleKey)} Icon={InformationCircleIcon} id={id}>
      <div className={styles.chapter}>{renderContent()}</div>
    </Block>
  );
}

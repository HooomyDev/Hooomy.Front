import React from "react";
import styles from "./LastCompleteRequestsList.module.css";
import LastCompleteRequestsItem from "../LastCompleteRequestsItem/LastCompleteRequestsItem";

export default function LastCompleteRequestsList({ items = [] }) {
  return (
    <div className={styles.grid}>
      {items.map((item) => {
        return <LastCompleteRequestsItem item={item} />;
      })}
    </div>
  );
}

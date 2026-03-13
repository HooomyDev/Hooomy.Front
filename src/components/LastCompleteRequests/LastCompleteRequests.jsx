import React from "react";
import { lastCompleteRequests } from "../../stores/lastCompleteRequests";
import LastCompleteRequestsHeader from "../LastCompleteRequestsHeader/LastCompleteRequestsHeader";
import styles from "./LastCompleteRequests.module.css";
import LastCompleteRequestsList from "../LastCompleteRequestsList/LastCompleteRequestsList";

export default function LastCompleteRequests() {
  const requests = lastCompleteRequests.slice(0, 3);

  return (
    <div className={styles.wrapper}>
      <LastCompleteRequestsHeader />
      <LastCompleteRequestsList items={requests} />
    </div>
  );
}

import React from "react";
import { lastCompleteRequests } from "../../stores/lastCompleteRequests";
import LastCompleteRequestsHeader from "../LastCompleteRequestsHeader/LastCompleteRequestsHeader";
import styles from "./LastCompleteRequests.module.css";
import LastCompleteRequestsList from "../LastCompleteRequestsList/LastCompleteRequestsList";

export default function LastCompleteRequests() {
  return (
    <div className={styles.wrapper}>
      <LastCompleteRequestsHeader />
      <LastCompleteRequestsList items={lastCompleteRequests} />
    </div>
  );
}

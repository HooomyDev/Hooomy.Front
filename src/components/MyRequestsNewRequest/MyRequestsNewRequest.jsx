import React from "react";
import styles from "./MyRequestsNewRequest.module.css";
import { useT } from "../../utils/useT";
import Block from "../../common/Block/Block";
import { PencilIcon, PlusIcon } from "@heroicons/react/24/solid";

export default function MyRequestsNewRequest({ handleCreateRequest }) {
  const t = useT();

  return (
    <Block title={t("requests.newRequest")} Icon={PencilIcon}>
      <button
        type="button"
        className={styles.createRequestButton}
        onClick={() => handleCreateRequest()}
      >
        <PlusIcon className={styles.btnIcon} />
        {t("requests.createNewRequest")}
      </button>
    </Block>
  );
}

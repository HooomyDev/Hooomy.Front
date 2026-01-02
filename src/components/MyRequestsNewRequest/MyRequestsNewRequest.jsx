import React from "react";
import styles from "./MyRequestsNewRequest.module.css";
import { useT } from "../../utils/useT";
import Block from "../../common/Block/Block";
import { PencilIcon, PlusIcon } from "@heroicons/react/24/solid";
import Button from "../../common/Button/Button";

export default function MyRequestsNewRequest({ handleCreateRequest }) {
  const t = useT();

  return (
    <Block title={t("requests.newRequest")} Icon={PencilIcon}>
      <div className={styles.container}>
        <Button type="button" onClick={() => handleCreateRequest()}>
          <PlusIcon className={styles.btnIcon} />
          {t("requests.createNewRequest")}
        </Button>
      </div>
    </Block>
  );
}

import React from "react";
import styles from "./MyRequestsNewRequest.module.css";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useT } from "../../../../utils/useT";
import Block from "../../../../common/Block/Block";
import Button from "../../../../common/Button/Button";

export default function MyRequestsNewRequest({
  handleCreateRequest,
  disabled,
}) {
  const t = useT();

  return (
    <Block>
      <div className={styles.container}>
        <Button
          type="button"
          onClick={() => handleCreateRequest()}
          disabled={disabled}
        >
          <PlusIcon className={styles.btnIcon} />
          {t("requests.createNewRequest")}
        </Button>
      </div>
    </Block>
  );
}

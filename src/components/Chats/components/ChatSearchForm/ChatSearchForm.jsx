import React from "react";
import styles from "./ChatSearchForm.module.css";
import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/solid";
import { FormProvider, useForm } from "react-hook-form";
import InputField from "../../../../common/InputField/InputField";
import Button from "../../../../common/Button/Button";
import routes from "../../../../stores/routes.json";
import { useNavigate } from "react-router-dom";

export default function ChatSearchForm({ onSubmit, user }) {
  const navigate = useNavigate();

  const methods = useForm({
    defaultValues: {
      search: "",
    },
  });

  return (
    <div className={styles.search}>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <InputField name="search" placeholder="Поиск..." />
          <Button
            type="submit"
            className={styles.searchButton}
            variant="secondary"
          >
            <MagnifyingGlassIcon className={styles.icon} />
          </Button>
          {user.role === "Resident" && (
            <Button
              type="button"
              className={styles.searchButton}
              variant="secondary"
              onClick={() => navigate(routes.companies)}
            >
              <PlusIcon className={styles.icon} />
            </Button>
          )}
        </form>
      </FormProvider>
    </div>
  );
}

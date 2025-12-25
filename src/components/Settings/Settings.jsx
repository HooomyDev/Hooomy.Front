import React from "react";
import styles from "./Settings.module.css";
import Block from "../../common/Block/Block";
import SelectField from "../../common/SelectField/SelectField";
import { useForm, FormProvider } from "react-hook-form";
import { useTranslation } from "react-i18next";
import ThemePicker from "../ThemePicker/ThemePicker";
import { ChartPieIcon } from "@heroicons/react/24/solid";

export default function Settings() {
  const { t, i18n } = useTranslation();
  const currentLanguage = localStorage.getItem("lang") || "ru";

  const langOptions = [
    { value: "ru", label: "Русский" },
    { value: "en", label: "English" },
    { value: "by", label: "Беларуская" },
  ];

  const methods = useForm({
    defaultValues: {
      lang: currentLanguage,
    },
  });

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  return (
    <div className={styles.wrapper}>
      <Block>
        <div className={styles.title}>{t("settings.title")}</div>
      </Block>
      <FormProvider {...methods}>
        <form className={styles.form}>
          <Block title={t("settings.interface")} Icon={ChartPieIcon}>
            <ThemePicker />
            <SelectField
              label={t("settings.language")}
              name="lang"
              options={langOptions}
              OnChange={changeLanguage}
            />
          </Block>
        </form>
      </FormProvider>
    </div>
  );
}

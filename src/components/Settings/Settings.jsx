import React, { useState } from "react";
import styles from "./Settings.module.css";
import Block from "../../common/Block/Block";
import SelectField from "../../common/SelectField/SelectField";
import { useForm, FormProvider } from "react-hook-form";
import { useTranslation } from "react-i18next";
import ThemePicker from "../ThemePicker/ThemePicker";
import { ChartPieIcon, NewspaperIcon } from "@heroicons/react/24/solid";
import emailLogo from "../../assets/email-logo.png";
import tgLogo from "../../assets/telegram-icon.png";
import viberLogo from "../../assets/viber-icon.png";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import CheckBox from "../../common/CheckBox/CheckBox";

export default function Settings() {
  const { t, i18n } = useTranslation();
  const currentLanguage = localStorage.getItem("lang") || "ru";
  const [selected, setSelected] = useState([]);

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

  const toggleNotification = (value) => {
    setSelected((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  return (
    <div className={styles.wrapper}>
      <Block>
        <div className={styles.container}>
          <Cog6ToothIcon className={styles.icon} />
          <div className={styles.title}>{t("settings.title")}</div>
        </div>
      </Block>

      <FormProvider {...methods}>
        <form className={styles.form}>
          <Block title={t("settings.interface")} Icon={ChartPieIcon}>
            <div className={styles.container2}>
              <ThemePicker />
              <SelectField
                label={t("settings.language")}
                name="lang"
                options={langOptions}
                onValueChange={changeLanguage}
              />
            </div>
          </Block>
        </form>
      </FormProvider>

      <Block title={t("settings.notifications")} Icon={NewspaperIcon}>
        <div className={styles.socials}>
          <CheckBox
            value="email"
            label={
              <div className={styles.social}>
                <img className={styles.socialImg} src={emailLogo} alt="Email" />
                <span>Email</span>
              </div>
            }
            checked={selected.includes("email")}
            onChange={() => toggleNotification("email")}
          />
          <CheckBox
            value="telegram"
            label={
              <div className={styles.social}>
                <img className={styles.socialImg} src={tgLogo} alt="Telegram" />
                <span>Telegram</span>
              </div>
            }
            checked={selected.includes("telegram")}
            onChange={() => toggleNotification("telegram")}
          />
          <CheckBox
            value="viber"
            label={
              <div className={styles.social}>
                <img className={styles.socialImg} src={viberLogo} alt="Viber" />
                <span>Viber</span>
              </div>
            }
            checked={selected.includes("viber")}
            onChange={() => toggleNotification("viber")}
          />
        </div>
      </Block>
    </div>
  );
}

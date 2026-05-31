import { useTranslation } from "react-i18next";

export const useT = () => {
  const { t, i18n } = useTranslation();

  const translate = (key, opts = {}) => {
    return t(key, { returnObjects: true, ...opts });
  };

  translate.lang = i18n.language;

  return translate;
};

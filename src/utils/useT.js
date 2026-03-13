import { useTranslation } from "react-i18next";

export const useT = () => {
  const { t } = useTranslation();

  const translate = (key, opts = {}) => {
    return t(key, { returnObjects: true, ...opts });
  };

  return translate;
};

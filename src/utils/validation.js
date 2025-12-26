import i18n from "../locales/i18n";

export function validateEmail(email) {
  email = email.trim();

  if (!email) return i18n.t("errors.email.empty");
  if (email.length > 254) return i18n.t("errors.email.tooLong");

  const [local, domain] = email.split("@");
  if (!local || !domain) return i18n.t("errors.email.noAt");
  if (local.length > 64) return i18n.t("errors.email.localTooLong");
  if (domain.startsWith(".") || domain.endsWith(".") || domain.includes(".."))
    return i18n.t("errors.email.domainInvalid");

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) return i18n.t("errors.email.format");

  const forbiddenChars = /[\s(),:;<>[\]\\]/;
  if (forbiddenChars.test(email)) return i18n.t("errors.email.forbiddenChars");

  return true;
}

export function validatePassword(password) {
  if (!password) return i18n.t("errors.password.empty");
  if (password.length < 6) return i18n.t("errors.password.short");
  if (!/[A-Z]/.test(password)) return i18n.t("errors.password.noUpper");
  if (!/[a-z]/.test(password)) return i18n.t("errors.password.noLower");
  if (!/[0-9]/.test(password)) return i18n.t("errors.password.noDigit");
  if (!/[!@#$%^&*(),.?\":{}|<>]/.test(password))
    return i18n.t("errors.password.noSpecial");

  return true;
}

export function validateConfirmPassword(password, confirm) {
  if (!confirm) return i18n.t("errors.confirmPassword.empty");
  if (password !== confirm) return i18n.t("errors.confirmPassword.mismatch");
  return true;
}

export function validateName(name) {
  if (!name || !name.trim()) return i18n.t("errors.name.empty");
  if (name.length < 2) return i18n.t("errors.name.short");
  if (name.length > 50) return i18n.t("errors.name.long");
  if (!/^[А-Яа-яЁёA-Za-z-]+$/.test(name)) return i18n.t("errors.name.invalid");
  return true;
}

export function validateSurname(surname) {
  if (!surname || !surname.trim()) return i18n.t("errors.surname.empty");
  if (surname.length < 2) return i18n.t("errors.surname.short");
  if (surname.length > 50) return i18n.t("errors.surname.long");
  if (!/^[А-Яа-яЁёA-Za-z-]+$/.test(surname))
    return i18n.t("errors.surname.invalid");
  return true;
}

export function validatePatronymic(patronymic) {
  if (patronymic.length > 50) return i18n.t("errors.patronymic.long");
  return true;
}

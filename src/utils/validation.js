export function validateEmail(email) {
  email = email.trim();

  if (!email) return "Email не может быть пустым — введите адрес.";

  if (email.length > 254)
    return "Email слишком длинный: допустимо максимум 254 символа.";

  const [local, domain] = email.split("@");

  if (!local || !domain)
    return "Email должен содержать символ '@' и состоять из двух частей.";

  if (local.length > 64)
    return "Часть адреса до '@' слишком длинная (максимум 64 символа).";

  if (domain.startsWith(".") || domain.endsWith(".") || domain.includes(".."))
    return "Доменная часть некорректна: не может начинаться/заканчиваться точкой или содержать две точки подряд.";

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email))
    return "Формат email некорректен. Пример правильного адреса: user@example.com";

  const forbiddenChars = /[\s(),:;<>[\]\\]/;
  if (forbiddenChars.test(email))
    return "Email содержит недопустимые символы (пробелы, скобки, запятые и т.п.).";

  return "";
}
  
export function validatePassword(password) {
  if (!password) {
    return "Пароль не может быть пустым — придумайте пароль.";
  }

  if (password.length < 6) {
    return "Пароль слишком короткий: минимум 6 символов.";
  }

  if (!/[A-Z]/.test(password)) {
    return "Добавьте хотя бы одну заглавную букву (A–Z).";
  }

  if (!/[a-z]/.test(password)) {
    return "Добавьте хотя бы одну строчную букву (a–z).";
  }

  if (!/[0-9]/.test(password)) {
    return "Добавьте хотя бы одну цифру (0–9).";
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return "Добавьте хотя бы один спецсимвол (например, !, @, #, $).";
  }

  return "";
}
  
export function validateConfirmPassword(password, confirm) {
  if (!confirm) return "Подтвердите пароль";
  if (password !== confirm) return "Пароли не совпадают";
  return "";
}
  
export function validateName(name) {
  if (!name || !name.trim()) {
    return "Имя обязательно для заполнения";
  }
  if (name.length < 2) {
    return "Имя должно содержать минимум 2 символа";
  }
  if (name.length > 50) {
    return "Имя слишком длинное (максимум 50 символов)";
  }
  if (!/^[А-Яа-яЁёA-Za-z-]+$/.test(name)) {
    return "Имя может содержать только буквы и дефис";
  }
  return "";
}

export function validateSurname(surname) {
  if (!surname || !surname.trim()) {
    return "Фамилия обязательна для заполнения";
  }
  if (surname.length < 2) {
    return "Фамилия должна содержать минимум 2 символа";
  }
  if (surname.length > 50) {
    return "Фамилия слишком длинная (максимум 50 символов)";
  }
  if (!/^[А-Яа-яЁёA-Za-z-]+$/.test(surname)) {
    return "Фамилия может содержать только буквы и дефис";
  }
  return "";
}

export function validatePatronymic(patronymic) {
  if (patronymic.length > 50) {
    return "Отчество слишком длинное (максимум 50 символов)";
  }
  return "";
}
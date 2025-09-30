import {
  Squares2X2Icon,
  EyeIcon,
  Cog6ToothIcon,
  ChatBubbleBottomCenterTextIcon,
} from "@heroicons/react/24/outline";

export const items = [
  {
    icon: <Squares2X2Icon className="icon" />,
    title: "Все сервисы в одном месте",
    description: "Оплата, заявки, уведомления — единая точка входа для жильцов и управляющих компаний.",
  },
  {
    icon: <EyeIcon className="icon" />,
    title: "Прозрачность и контроль",
    description: "История платежей, статусы заявок и уведомления доступны онлайн в любое время.",
  },
  {
    icon: <Cog6ToothIcon className="icon" />,
    title: "Автоматизация процессов",
    description: "Сбор показаний, расчёт квитанций — всё работает без ручного труда.",
  },
  {
    icon: <ChatBubbleBottomCenterTextIcon className="icon" />,
    title: "Обратная связь и рейтинг",
    description: "Связь с УК, ЖКХ и Мингорисполкомом — всё в платформе.",
  },
];

import {
    BuildingOfficeIcon,
    WrenchScrewdriverIcon,
    BuildingLibraryIcon,
  } from "@heroicons/react/24/outline";
  
export  const tabs = [
    {
      id: "uk",
      title: "УК и ТСЖ",
      icon: BuildingOfficeIcon,
      description:
        "Приём заявок, контроль исполнения, аналитика по домам и подъездам. Всё в одном интерфейсе.",
      action: "Запросить демо",
    },
    {
      id: "zhkh",
      title: "Службы ЖКХ",
      icon: WrenchScrewdriverIcon,
      description:
        "Автоматический сбор показаний, планирование ремонтов, контроль подрядчиков и ресурсов.",
      action: "Связаться",
    },
    {
      id: "gov",
      title: "Мингорисполком",
      icon: BuildingLibraryIcon,
      description:
        "Мониторинг активности, отчётность по районам, цифровая обратная связь от граждан.",
      action: "Получить доступ",
    },
  ];
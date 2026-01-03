import React, { useEffect, useState } from "react";
import styles from "./Statistic.module.css";
import PageHeader from "../../common/PageHeader/PageHeader";
import {
  ChartBarIcon,
  AdjustmentsHorizontalIcon,
  PresentationChartBarIcon,
} from "@heroicons/react/24/solid";
import Block from "../../common/Block/Block";
import SelectField from "../../common/SelectField/SelectField";
import { useForm, FormProvider, Controller } from "react-hook-form";
import Button from "../../common/Button/Button";
import CountUp from "react-countup";
import HorizontalChart from "../../features/charts/HorizontalChart/HorizontalChart";

export default function Statistic() {
  const [summary] = useState({
    start: Math.floor(Math.random() * 20000) + 1000,
    receivedPerMonth: Math.floor(Math.random() * 20000) + 1000,
    completedPerMonth: Math.floor(Math.random() * 20000) + 1000,
    left: Math.floor(Math.random() * 20000) + 1000,
  });

  const months = [
    { id: 1, month: { id: 1, name: "Январь" }, year: 2025 },
    { id: 2, month: { id: 2, name: "Февраль" }, year: 2025 },
    { id: 3, month: { id: 3, name: "Март" }, year: 2025 },
    { id: 4, month: { id: 4, name: "Апрель" }, year: 2025 },
    { id: 5, month: { id: 5, name: "Май" }, year: 2025 },
    { id: 6, month: { id: 6, name: "Июнь" }, year: 2025 },
    { id: 7, month: { id: 7, name: "Июль" }, year: 2025 },
    { id: 8, month: { id: 8, name: "Август" }, year: 2025 },
    { id: 9, month: { id: 9, name: "Сентябрь" }, year: 2025 },
    { id: 10, month: { id: 10, name: "Октябрь" }, year: 2025 },
    { id: 11, month: { id: 11, name: "Ноябрь" }, year: 2025 },
    { id: 12, month: { id: 12, name: "Декабрь" }, year: 2025 },
  ];

  const districts = [
    { id: 0, name: "Все" },
    { id: 1, name: "Центральный р-н" },
    { id: 2, name: "Советский р-н" },
    { id: 3, name: "Первомайский р-н" },
    { id: 4, name: "Партизанский р-н" },
    { id: 5, name: "Заводской р-н" },
    { id: 6, name: "Ленинский р-н" },
    { id: 7, name: "Октябрьский р-н" },
    { id: 8, name: "Московский р-н" },
    { id: 9, name: "Фрунзенский р-н" },
  ];

  const data = [
    {
      category: "Водоснабжение. Горячая вода",
      inProgress: 1.2,
      completed: 0.8,
    },
    { category: "Электроснабжение", inProgress: 1.1, completed: 0.9 },
    { category: "Бытовые услуги", inProgress: 0.9, completed: 0.6 },
    {
      category: "Санитарное состояние многоквартирного дома",
      inProgress: 0.8,
      completed: 0.5,
    },
    { category: "Отопление", inProgress: 1.3, completed: 1.0 },
    { category: "Благоустройство территории", inProgress: 0.7, completed: 0.4 },
    { category: "Водоснабжение", inProgress: 1.0, completed: 0.7 },
    { category: "Общестроительные работы", inProgress: 0.6, completed: 0.3 },
    {
      category: "Санитарное состояние территории",
      inProgress: 0.5,
      completed: 0.2,
    },
    {
      category: "Техническое обслуживание ЗПУ",
      inProgress: 0.4,
      completed: 0.2,
    },
    { category: "Другое", inProgress: 0.3, completed: 0.1 },
    {
      category: "Техническое обслуживание лифта",
      inProgress: 0.6,
      completed: 0.4,
    },
    { category: "Обращение с ТКО", inProgress: 0.9, completed: 0.6 },
    {
      category: "Водоснабжение. Холодная вода",
      inProgress: 1.0,
      completed: 0.7,
    },
    { category: "Канализация", inProgress: 1.1, completed: 0.8 },
    {
      category: "Автомобильные дороги, тротуары",
      inProgress: 0.8,
      completed: 0.5,
    },
    { category: "Кровельные работы", inProgress: 0.7, completed: 0.4 },
    { category: "Уличное освещение", inProgress: 0.5, completed: 0.3 },
    {
      category: "Общественные места (Парки, скверы)",
      inProgress: 0.4,
      completed: 0.2,
    },
    { category: "Работы по ремонту стыков", inProgress: 0.3, completed: 0.1 },
    {
      category: "Техническое обслуживание зданий и сооружений",
      inProgress: 0.6,
      completed: 0.4,
    },
    {
      category: "Рекламные и информационные конструкции и объявления",
      inProgress: 0.2,
      completed: 0.1,
    },
  ];

  const methods = useForm({
    defaultValues: {
      month: months[months.length - 1].id,
      district: districts[0].id,
    },
  });

  const handleClearFilters = () => {
    reset({ month: months[months.length - 1].id, district: districts[0].id });
  };

  const { watch, reset } = methods;
  const selectedMonth = watch("month");
  const selectedDistrict = watch("district");

  useEffect(() => {
    console.log("Выбран месяц:", selectedMonth);
    console.log("Выбран район:", selectedDistrict);
  }, [selectedMonth, selectedDistrict]);

  return (
    <div className={styles.wrapper}>
      <PageHeader title="Статистика" icon={ChartBarIcon} />
      <Block title="Фильтры" Icon={AdjustmentsHorizontalIcon}>
        <FormProvider {...methods}>
          <form className={styles.filterForm}>
            <div className={styles.filters}>
              <Controller
                name="month"
                control={methods.control}
                render={({ field }) => (
                  <SelectField
                    {...field}
                    label="Месяц"
                    options={months.map((m) => ({
                      value: m.id,
                      label: `${m.month.name}, ${m.year} г.`,
                    }))}
                  />
                )}
              />

              <Controller
                name="district"
                control={methods.control}
                render={({ field }) => (
                  <SelectField
                    {...field}
                    label="Район"
                    options={districts.map((d) => ({
                      value: d.id,
                      label: d.name,
                    }))}
                  />
                )}
              />
            </div>

            <div className={styles.buttons}>
              <Button
                type="button"
                variant="secondary"
                onClick={handleClearFilters}
              >
                Сбросить фильтры
              </Button>

              <Button type="submit" className={styles.submitBtn}>
                Применить фильтры
              </Button>
            </div>
          </form>
        </FormProvider>
      </Block>

      <Block title="Работа с заявками" Icon={PresentationChartBarIcon}>
        <div className={styles.circles}>
          <div className={styles.circle}>
            <span className={styles.value}>
              <CountUp end={summary.start} duration={1.5} />
            </span>
            <span className={styles.label}>Начало</span>
          </div>

          <div className={styles.divider}></div>

          <div className={styles.circle}>
            <span className={styles.value}>
              <CountUp end={summary.receivedPerMonth} duration={1.5} />
            </span>
            <span className={styles.label}>Получено</span>
          </div>

          <div className={styles.divider}></div>

          <div className={styles.circle}>
            <span className={styles.value}>
              <CountUp end={summary.completedPerMonth} duration={1.5} />
            </span>
            <span className={styles.label}>Выполнено</span>
          </div>

          <div className={styles.divider}></div>

          <div className={styles.circle}>
            <span className={styles.value}>
              <CountUp end={summary.left} duration={1.5} />
            </span>
            <span className={styles.label}>Осталось</span>
          </div>
        </div>
      </Block>

      <Block title="График" Icon={ChartBarIcon}>
        <HorizontalChart data={data} />
      </Block>
    </div>
  );
}

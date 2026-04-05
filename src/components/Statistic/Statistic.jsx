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
import { useT } from "../../utils/useT";

export default function Statistic() {
  const t = useT();

  const [summary] = useState({
    start: Math.floor(Math.random() * 20000) + 1000,
    receivedPerMonth: Math.floor(Math.random() * 20000) + 1000,
    completedPerMonth: Math.floor(Math.random() * 20000) + 1000,
    left: Math.floor(Math.random() * 20000) + 1000,
  });

  const months = [
    { id: 1, name: "Январь", year: 2025 },
    { id: 2, name: "Февраль", year: 2025 },
    { id: 3, name: "Март", year: 2025 },
    { id: 4, name: "Апрель", year: 2025 },
    { id: 5, name: "Май", year: 2025 },
    { id: 6, name: "Июнь", year: 2025 },
    { id: 7, name: "Июль", year: 2025 },
    { id: 8, name: "Август", year: 2025 },
    { id: 9, name: "Сентябрь", year: 2025 },
    { id: 10, name: "Октябрь", year: 2025 },
    { id: 11, name: "Ноябрь", year: 2025 },
    { id: 12, name: "Декабрь", year: 2025 },
  ];

  const districts = [
    { id: 0, name: t("statistic.districts.all") },
    { id: 1, name: t("statistic.districts.central") },
    { id: 2, name: t("statistic.districts.soviet") },
    { id: 3, name: t("statistic.districts.firstMay") },
    { id: 4, name: t("statistic.districts.partisan") },
    { id: 5, name: t("statistic.districts.factory") },
    { id: 6, name: t("statistic.districts.lenin") },
    { id: 7, name: t("statistic.districts.october") },
    { id: 8, name: t("statistic.districts.moscow") },
    { id: 9, name: t("statistic.districts.frunze") },
  ];

  const data = [
    { key: "hotWater", inProgress: 1.2, completed: 0.8 },
    { key: "electricity", inProgress: 1.1, completed: 0.9 },
    { key: "services", inProgress: 0.9, completed: 0.6 },
    { key: "houseSanitation", inProgress: 0.8, completed: 0.5 },
    { key: "heating", inProgress: 1.3, completed: 1.0 },
    { key: "landscaping", inProgress: 0.7, completed: 0.4 },
    { key: "waterSupply", inProgress: 1.0, completed: 0.7 },
    { key: "construction", inProgress: 0.6, completed: 0.3 },
    { key: "territorySanitation", inProgress: 0.5, completed: 0.2 },
    { key: "zpuMaintenance", inProgress: 0.4, completed: 0.2 },
    { key: "other", inProgress: 0.3, completed: 0.1 },
    { key: "elevatorMaintenance", inProgress: 0.6, completed: 0.4 },
    { key: "wasteManagement", inProgress: 0.9, completed: 0.6 },
    { key: "coldWater", inProgress: 1.0, completed: 0.7 },
    { key: "sewerage", inProgress: 1.1, completed: 0.8 },
    { key: "roads", inProgress: 0.8, completed: 0.5 },
    { key: "roofing", inProgress: 0.7, completed: 0.4 },
    { key: "streetLighting", inProgress: 0.5, completed: 0.3 },
    { key: "publicPlaces", inProgress: 0.4, completed: 0.2 },
    { key: "jointRepair", inProgress: 0.3, completed: 0.1 },
    { key: "buildingMaintenance", inProgress: 0.6, completed: 0.4 },
    { key: "ads", inProgress: 0.2, completed: 0.1 },
  ];

  const methods = useForm({
    defaultValues: {
      month: months[months.length - 1].id,
      district: districts[0].id,
    },
  });

  const { watch, reset } = methods;
  const selectedMonth = watch("month");
  const selectedDistrict = watch("district");

  const onSubmit = (values) => {
    console.log("Filters applied:", values);
  };

  const handleClearFilters = () => {
    reset({ month: months[months.length - 1].id, district: districts[0].id });
  };

  useEffect(() => {
    console.log("Selected month:", selectedMonth);
    console.log("Selected district:", selectedDistrict);
  }, [selectedMonth, selectedDistrict]);

  return (
    <div className={styles.wrapper}>
      <PageHeader title={t("statistic.title")} icon={ChartBarIcon} />

      <Block
        title={t("statistic.filters.title")}
        Icon={AdjustmentsHorizontalIcon}
      >
        <FormProvider {...methods}>
          <form
            className={styles.filterForm}
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <div className={styles.filters}>
              <Controller
                name="month"
                control={methods.control}
                render={({ field }) => (
                  <SelectField
                    {...field}
                    label={t("statistic.filters.month")}
                    options={months.map((m) => ({
                      value: m.id,
                      label: `${m.name}, ${m.year}`,
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
                    label={t("statistic.filters.district")}
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
                {t("statistic.filters.reset")}
              </Button>

              <Button type="submit" className={styles.submitBtn}>
                {t("statistic.filters.apply")}
              </Button>
            </div>
          </form>
        </FormProvider>
      </Block>

      <Block
        title={t("statistic.summary.title")}
        Icon={PresentationChartBarIcon}
      >
        <div className={styles.circles}>
          <div className={styles.circle}>
            <span className={styles.value}>
              <CountUp end={summary.start} duration={1.5} />
            </span>
            <span className={styles.label}>{t("statistic.summary.start")}</span>
          </div>

          <div className={styles.divider}></div>

          <div className={styles.circle}>
            <span className={styles.value}>
              <CountUp end={summary.receivedPerMonth} duration={1.5} />
            </span>
            <span className={styles.label}>
              {t("statistic.summary.received")}
            </span>
          </div>

          <div className={styles.divider}></div>

          <div className={styles.circle}>
            <span className={styles.value}>
              <CountUp end={summary.completedPerMonth} duration={1.5} />
            </span>
            <span className={styles.label}>
              {t("statistic.summary.completed")}
            </span>
          </div>

          <div className={styles.divider}></div>

          <div className={styles.circle}>
            <span className={styles.value}>
              <CountUp end={summary.left} duration={1.5} />
            </span>
            <span className={styles.label}>{t("statistic.summary.left")}</span>
          </div>
        </div>
      </Block>

      <Block title={t("statistic.chart.title")} Icon={ChartBarIcon}>
        <HorizontalChart
          data={data.map((item) => ({
            ...item,
            category: t(`statistic.categories.${item.key}`),
          }))}
        />
      </Block>
    </div>
  );
}

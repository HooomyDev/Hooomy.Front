import React from "react";
import styles from "./MapPageContent.module.css";
import PageHeader from "../../common/PageHeader/PageHeader";
import { MapIcon, AdjustmentsHorizontalIcon } from "@heroicons/react/24/solid";
import Block from "../../common/Block/Block";
import Button from "../../common/Button/Button";
import RadioButton from "../../common/RadioButton/RadioButton";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { months } from "../../stores/months";
import SelectField from "../../common/SelectField/SelectField";
import Map from "../../features/map/Map/Map";
import { useT } from "../../utils/useT";

export default function MapPageContent() {
  const t = useT();

  const options = [
    { id: 0, title: t("mapPage.categories.all") },
    { id: 1, title: t("mapPage.categories.accepted") },
    { id: 2, title: t("mapPage.categories.completed") },
    { id: 3, title: t("mapPage.categories.remaining") },
  ];

  const districtsData = [
    {
      id: 1,
      name: t("mapPage.districts.central"),
      lng: 27.524753,
      lat: 53.934363,
      requests: 120,
    },
    {
      id: 2,
      name: t("mapPage.districts.soviet"),
      lng: 27.576935,
      lat: 53.931336,
      requests: 95,
    },
    {
      id: 3,
      name: t("mapPage.districts.firstMay"),
      lng: 27.623265,
      lat: 53.931464,
      requests: 80,
    },
    {
      id: 4,
      name: t("mapPage.districts.partisan"),
      lng: 27.630609,
      lat: 53.907059,
      requests: 60,
    },
    {
      id: 5,
      name: t("mapPage.districts.factory"),
      lng: 27.647042,
      lat: 53.869463,
      requests: 70,
    },
    {
      id: 6,
      name: t("mapPage.districts.lenin"),
      lng: 27.581887,
      lat: 53.85876,
      requests: 50,
    },
    {
      id: 7,
      name: t("mapPage.districts.october"),
      lng: 27.526587,
      lat: 53.855008,
      requests: 40,
    },
    {
      id: 8,
      name: t("mapPage.districts.moscow"),
      lng: 27.491451,
      lat: 53.869271,
      requests: 65,
    },
    {
      id: 9,
      name: t("mapPage.districts.frunze"),
      lng: 27.453009,
      lat: 53.898746,
      requests: 85,
    },
  ];

  const methods = useForm({
    defaultValues: {
      requestCategory: options[0].id,
      month: months[months.length - 1].id,
    },
  });

  const onSubmit = (values) => {
    console.log("Выбранные фильтры:", values);
  };

  return (
    <div className={styles.wrapper}>
      <PageHeader title={t("mapPage.title")} icon={MapIcon} />

      <div className={styles.content}>
        <div className={styles.optionsWrapper}>
          <Block
            title={t("mapPage.filters.title")}
            Icon={AdjustmentsHorizontalIcon}
          >
            <FormProvider {...methods}>
              <form
                onSubmit={methods.handleSubmit(onSubmit)}
                className={styles.options}
              >
                <Controller
                  name="month"
                  control={methods.control}
                  render={({ field }) => (
                    <SelectField
                      {...field}
                      label={t("mapPage.filters.month")}
                      options={months.map((m) => ({
                        value: m.id,
                        label: `${m.month.name}, ${m.year}`,
                      }))}
                    />
                  )}
                />

                <Controller
                  name="requestCategory"
                  control={methods.control}
                  render={({ field }) => (
                    <>
                      {options.map((option) => (
                        <RadioButton
                          key={option.id}
                          value={option.id}
                          label={option.title}
                          checked={field.value === option.id}
                          onChange={() => field.onChange(option.id)}
                          name={field.name}
                        />
                      ))}
                    </>
                  )}
                />

                <Button type="submit" className={styles.submitBtn}>
                  {t("mapPage.filters.apply")}
                </Button>
              </form>
            </FormProvider>
          </Block>
        </div>

        <Block title={t("mapPage.title")} Icon={MapIcon}>
          <div className={styles.mapWrapper}>
            <Map data={districtsData} allowMarkers={false} />
          </div>
        </Block>
      </div>
    </div>
  );
}

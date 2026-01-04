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

export default function MapPageContent() {
  const options = [
    { id: 0, title: "Все за месяц" },
    { id: 1, title: "Принятые заявки" },
    { id: 2, title: "Выполненные заявки" },
    { id: 3, title: "Оставшиеся заявки" },
  ];

  const districtsData = [
    {
      id: 1,
      name: "Центральный р-н",
      lng: 27.524753,
      lat: 53.934363,
      requests: 120,
    },
    {
      id: 2,
      name: "Советский р-н",
      lng: 27.576935,
      lat: 53.931336,
      requests: 95,
    },
    {
      id: 3,
      name: "Первомайский р-н",
      lng: 27.623265,
      lat: 53.931464,
      requests: 80,
    },
    {
      id: 4,
      name: "Партизанский р-н",
      lng: 27.630609,
      lat: 53.907059,
      requests: 60,
    },

    {
      id: 5,
      name: "Заводской р-н",
      lng: 27.647042,
      lat: 53.869463,
      requests: 70,
    },

    {
      id: 6,
      name: "Ленинский р-н",
      lng: 27.581887,
      lat: 53.85876,
      requests: 50,
    },
    {
      id: 7,
      name: "Октябрьский р-н",
      lng: 27.526587,
      lat: 53.855008,
      requests: 40,
    },
    {
      id: 8,
      name: "Московский р-н",
      lng: 27.491451,
      lat: 53.869271,
      requests: 65,
    },
    {
      id: 9,
      name: "Фрунзенский р-н",
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
    console.log("Выбранная категория:", values.requestCategory);
  };

  return (
    <div className={styles.wrapper}>
      <PageHeader title="Карта" icon={MapIcon} />

      <div className={styles.content}>
        <div className={styles.optionsWrapper}>
          <Block title="Фильтры" Icon={AdjustmentsHorizontalIcon}>
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
                      label="Месяц"
                      options={months.map((m) => ({
                        value: m.id,
                        label: `${m.month.name}, ${m.year} г.`,
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
                  Применить
                </Button>
              </form>
            </FormProvider>
          </Block>
        </div>

        <Block title="Карта" Icon={MapIcon}>
          <div className={styles.mapWrapper}>
            <Map data={districtsData} allowMarkers={false} />
          </div>
        </Block>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { useT } from "../../utils/useT";
import { getMapData } from "../../api/services/mapService";
import { adaptMapData } from "../../utils/mapDataAdapter";
import PageHeader from "../../common/PageHeader/PageHeader";
import Block from "../../common/Block/Block";
import SelectField from "../../common/SelectField/SelectField";
import Map from "../../features/map/Map/Map";
import Loader from "../../common/Loader/Loader";
import { MapIcon, AdjustmentsHorizontalIcon } from "@heroicons/react/24/solid";
import styles from "./MapPageContent.module.css";

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

export default function MapPageContent() {
  const t = useT();
  const [zoom] = useState(12);

  const methods = useForm({
    defaultValues: {
      requestCategory: 0,
      month: new Date().getMonth() + 1,
    },
  });

  const watchCategory = methods.watch("requestCategory");
  const watchMonth = methods.watch("month");

  const {
    data: backendData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["mapClusters", watchMonth, watchCategory, zoom],
    queryFn: () =>
      getMapData({
        month: watchMonth,
        requestCategory: watchCategory,
        zoom: zoom,
      }),
    staleTime: 5 * 60 * 1000,
  });

  const mapData = adaptMapData(backendData, zoom);

  const onSubmit = (values) => {
    refetch();
  };

  if (isLoading) {
    return (
      <div className={styles.wrapper}>
        <PageHeader title={t("mapPage.title")} icon={MapIcon} />
        <div className={styles.content}>
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <PageHeader title={t("mapPage.title")} icon={MapIcon} />

      <div className={styles.content}>
        <Block
          title={t("mapPage.filters.month")}
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
                    options={months.map((m) => ({
                      value: m.id,
                      label: `${m.name}, ${m.year}`,
                    }))}
                  />
                )}
              />
            </form>
          </FormProvider>
        </Block>

        <Block title={t("mapPage.title")} Icon={MapIcon}>
          <div className={styles.mapWrapper}>
            <Map data={mapData} allowMarkers={false} />
          </div>
        </Block>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import styles from "./MyRequests.module.css";
import { useT } from "../../utils/useT";
import Loader from "../../common/Loader/Loader";
import MyRequestsHeader from "../MyRequestsHeader/MyRequestsHeader";
import MyRequestsList from "../MyRequestsList/MyRequestsList";
import MyRequestsNewRequest from "../MyRequestsNewRequest/MyRequestsNewRequest";
import MyRequestsFilters from "../MyRequestsFilters/MyRequestsFilters";

export default function MyRequests() {
  const t = useT();
  const [allRequests, setAllRequests] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilters, setSelectedFilters] = useState([]);

  useEffect(() => {
    async function fetchRequests() {
      try {
        setLoading(true);

        // имитация загрузки
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // TODO: подключить реальные данные
        const data = [];

        setAllRequests(data);
        setRequests(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchRequests();
  }, [t]);

  const handleFilterSubmit = (filtered) => {
    setRequests(filtered);
  };

  const onFilterSelect = (value) => {
    if (value === "all") {
      setSelectedFilters([{ value: "all", label: t("requests.all") }]);
      return;
    }

    let updatedFilters = [...selectedFilters];

    if (value !== "all" && updatedFilters.some((f) => f.value === "all")) {
      updatedFilters = updatedFilters.filter((f) => f.value !== "all");
    }

    if (!updatedFilters.some((f) => f.value === value)) {
      updatedFilters.push({ value, label: t(`requests.${value}`) });
    }

    setSelectedFilters(updatedFilters);
  };

  const handleRemoveFilter = (value) => {
    setSelectedFilters((prevFilters) =>
      prevFilters.filter((filter) => filter.value !== value.value)
    );
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={styles.wrapper}>
      <MyRequestsHeader />

      <div className={styles.section}>
        <div className={styles.sectionItem1}>
          <MyRequestsList requests={requests} />
        </div>

        <div className={styles.sectionItem2}>
          <MyRequestsNewRequest />

          <MyRequestsFilters
            allRequests={allRequests}
            selectedFilters={selectedFilters}
            onFilterSubmit={handleFilterSubmit}
            onFilterSelect={onFilterSelect}
            onRemoveFilter={handleRemoveFilter}
          />
        </div>
      </div>
    </div>
  );
}

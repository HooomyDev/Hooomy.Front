import React, { useState } from "react";
import styles from "./RequestByAdress.module.css";
import InputField from "../../common/InputField/InputField";
import { useT } from "../../utils/useT";
import { apiClient as client } from "../../api/client";
import AutocompleteField from "../../common/AutocompleteField/AutocompleteField";

export default function RequestByAdress() {
  const t = useT();

  const [streetOptions, setStreetOptions] = useState([]);

  const handleStreetSearch = async (query) => {
    if (!query) {
      setStreetOptions([]);
      return;
    }

    try {
      const res = await client.get(
        `/search?query=${encodeURIComponent(query)}`
      );
      const options = res.data.streets.map((s) => ({
        value: s.title,
        label: s.title,
      }));
      setStreetOptions(options);
    } catch (error) {
      console.error("Street search failed:", error);
      setStreetOptions([]);
    }
  };

  return (
    <div className={styles.wrapper}>
      <AutocompleteField
        label={t("user.street")}
        name="street"
        options={streetOptions}
        required
        onSearch={handleStreetSearch}
      />

      <InputField
        required
        label={t("user.house")}
        name="house"
        rules={{
          max: {
            value: 100,
          },
          min: {
            value: 1,
          },
        }}
      />
    </div>
  );
}

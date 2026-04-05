import React, { useState } from "react";
import styles from "./RequestByAdress.module.css";
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
        `/addresses?searchQuery=${encodeURIComponent(query)}`
      );
      const options = res.data.addresses.map((s) => ({
        value: s.id,
        label: `${s.street}, ${s.houseNumber}`,
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
    </div>
  );
}

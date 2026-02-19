import React, { useEffect, useState } from "react";
import { useT } from "../../../utils/useT";
import styles from "./EmployeeStatisticChartPeriodSelector.module.css";
import Dropdown from "../../../common/Dropdown/Dropdown";
import Button from "../../../common/Button/Button";
import { debounce } from "lodash";

export default function EmployeeStatisticChartPeriodSelector({
  onSelect,
  period,
}) {
  const t = useT();

  const [isMobile, setIsMobile] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownText, setDropdownText] = useState(
    t("employeeStatisticChart.periods.week")
  );

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    const debouncedCheck = debounce(checkMobile, 150);

    checkMobile();
    window.addEventListener("resize", debouncedCheck);

    return () => {
      debouncedCheck.cancel();
      window.removeEventListener("resize", debouncedCheck);
    };
  }, []);

  const periods = [
    { key: 1, label: t("employeeStatisticChart.periods.week") },
    { key: 2, label: t("employeeStatisticChart.periods.twoWeeks") },
    { key: 3, label: t("employeeStatisticChart.periods.month") },
    {
      key: 4,
      label: t("employeeStatisticChart.periods.currentMonth"),
    },
    { key: 5, label: t("employeeStatisticChart.periods.halfYear") },
    { key: 6, label: t("employeeStatisticChart.periods.year") },
  ];

  const handlePeriodSelect = (period) => {
    onSelect(period.key);
    setDropdownText(period.label);
    setIsDropdownOpen(false);
  };

  const dropdownItems = periods.map((p) => ({
    label: p.label,
    onClick: () => handlePeriodSelect(p),
  }));

  if (isMobile) {
    return (
      <div className={styles.periodSelectorDropdown}>
        <div className={styles.periodSelectorDropdown}>
          <Button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            variant="secondary"
            className={styles.periodSelectorDropdownButton}
          >
            {dropdownText}
          </Button>
          <Dropdown
            items={dropdownItems}
            visible={isDropdownOpen}
            onClose={() => setIsDropdownOpen(false)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.periodSelector}>
      {periods.map(({ key, label }) => (
        <button
          key={key}
          className={`${styles.periodButton} ${
            period === key ? styles.active : ""
          }`}
          onClick={() => onSelect(key)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

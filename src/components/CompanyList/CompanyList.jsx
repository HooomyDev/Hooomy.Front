import React, { useEffect, useState } from "react";
import PageHeader from "../../common/PageHeader/PageHeader";
import styles from "./CompanyList.module.css";
import {
  ArrowRightCircleIcon,
  BuildingOffice2Icon,
  BuildingLibraryIcon,
  HomeModernIcon,
  BriefcaseIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
  SparklesIcon,
  SunIcon,
  MagnifyingGlassIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/solid";
import { useQuery } from "@tanstack/react-query";
import { getCompanies } from "../../api/services/companyService";
import Button from "../../common/Button/Button";
import Loader from "../../common/Loader/Loader";
import { FormProvider, useForm } from "react-hook-form";
import InputField from "../../common/InputField/InputField";
import { useNavigate } from "react-router-dom";
import EmptyBlock from "../../common/EmptyBlock/EmptyBlock";

const companyIcons = [
  BuildingOffice2Icon,
  BuildingLibraryIcon,
  HomeModernIcon,
  BriefcaseIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
  SparklesIcon,
  SunIcon,
];

export default function CompanyList() {
  const { data: companies, isLoading } = useQuery({
    queryKey: ["companies"],
    queryFn: getCompanies,
  });
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const navigate = useNavigate();

  const methods = useForm({
    defaultValues: {
      search: "",
    },
  });

  useEffect(() => {
    if (companies) {
      setFilteredCompanies(companies);
    }
  }, [companies]);

  const onSubmit = (data) => {
    const filtered =
      companies?.filter((company) =>
        company.name.toLowerCase().includes(data.search.toLowerCase())
      ) || [];

    setFilteredCompanies(filtered);
  };

  const hanldeCompanyClick = (companyId) => {
    navigate(`/companies/${companyId}`);
  };

  const getRandomIcon = (index) => {
    const IconComponent = companyIcons[index % companyIcons.length];
    return <IconComponent className={styles.icon} />;
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={styles.wrapper}>
      <PageHeader icon={WrenchScrewdriverIcon} title="Управляющие компании" />
      <div className={styles.search}>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <InputField name="search" placeholder="Поиск..." />
            <Button
              type="submit"
              className={styles.searchButton}
              variant="secondary"
            >
              <MagnifyingGlassIcon className={styles.icon} />
            </Button>
          </form>
        </FormProvider>
      </div>

      <div className={styles.container}>
        {filteredCompanies.length === 0 ? (
          <EmptyBlock Icon={WrenchScrewdriverIcon}>
            Пока что нет компаний
          </EmptyBlock>
        ) : (
          filteredCompanies.map((company, index) => (
            <div
              key={company.id || index}
              className={styles.company}
              onClick={() => hanldeCompanyClick(company.id)}
            >
              <div className={styles.companyInfo}>
                {getRandomIcon(index)}
                <span>{company.name}</span>
              </div>
              <Button className={styles.writeButton} variant="secondary">
                <ArrowRightCircleIcon className={styles.icon} />
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

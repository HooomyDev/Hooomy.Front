import React, { useMemo } from "react";
import Block from "../../common/Block/Block";
import {
  WrenchScrewdriverIcon,
  PhoneIcon,
  EnvelopeIcon,
  ClockIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/solid";
import { PlusIcon, PhotoIcon } from "@heroicons/react/24/outline";
import styles from "./AdminDatabaseHmo.module.css";
import { useForm, FormProvider } from "react-hook-form";
import InputField from "../../common/InputField/InputField";
import { useQuery } from "@tanstack/react-query";
import { getCompanies } from "../../api/services/companyService";
import { useNavigate } from "react-router-dom";
import routes from "../../stores/routes.json";
import Loader from "../../common/Loader/Loader";
import EmptyBlock from "../../common/EmptyBlock/EmptyBlock";
import PageHeader from "../../common/PageHeader/PageHeader";
import Button from "../../common/Button/Button";
import { useT } from "../../utils/useT";

export default function AdminDatabaseHmo() {
  const t = useT();
  const navigate = useNavigate();

  const { data: companies = [], isLoading } = useQuery({
    queryKey: ["companies"],
    queryFn: () => getCompanies(),
  });

  const methods = useForm({
    defaultValues: {
      searchName: "",
    },
  });

  const { watch } = methods;
  const searchName = watch("searchName");

  const filteredCompanies = useMemo(() => {
    if (!searchName) return companies;

    return companies.filter((company) =>
      company.name.toLowerCase().includes(searchName.toLowerCase()),
    );
  }, [companies, searchName]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={styles.wrapper}>
      <PageHeader
        icon={WrenchScrewdriverIcon}
        title={t("adminDashboard.hmo")}
      />
      <Block>
        <FormProvider {...methods}>
          <div className={styles.searchBlock}>
            <div className={styles.searchField}>
              <InputField
                name="searchName"
                label={t("common.search")}
                placeholder={t("common.search")}
                required={false}
                rules={{}}
              />
            </div>

            <Button
              variant="secondary"
              className={styles.addNewUserButton}
              onClick={() => navigate(routes.addHmo)}
            >
              <PlusIcon className={styles.icon} />
            </Button>
          </div>
        </FormProvider>
      </Block>
      <Block>
        <div className={styles.companiesList}>
          {filteredCompanies.length === 0 ? (
            <EmptyBlock Icon={WrenchScrewdriverIcon}>
              Список ЖЭУ пуст
            </EmptyBlock>
          ) : (
            filteredCompanies.map((company) => (
              <div key={company.id} className={styles.companyCard}>
                <div className={styles.companyLogo}>
                  {company.logoUrl ? (
                    <img
                      src={company.logoUrl}
                      alt={company.name}
                      className={styles.logoImage}
                    />
                  ) : (
                    <div className={styles.placeholderLogo}>
                      <PhotoIcon className={styles.placeholderIcon} />
                    </div>
                  )}
                </div>

                <div className={styles.companyInfo}>
                  <h3 className={styles.companyName}>{company.name}</h3>
                  <div className={styles.companyMeta}>
                    {company.phone && (
                      <span className={styles.metaItem}>
                        <PhoneIcon className={styles.metaIcon} />
                        {company.phone}
                      </span>
                    )}
                    {company.email && (
                      <span className={styles.metaItem}>
                        <EnvelopeIcon className={styles.metaIcon} />
                        {company.email}
                      </span>
                    )}
                    {company.workingHours && (
                      <span className={styles.metaItem}>
                        <ClockIcon className={styles.metaIcon} />
                        {company.workingHours}
                      </span>
                    )}
                  </div>
                </div>

                <button
                  className={styles.detailsBtn}
                  onClick={() => navigate(`${routes.companies}/${company.id}`)}
                  title="Подробнее"
                >
                  <ArrowRightIcon className={styles.detailsIcon} />
                </button>
              </div>
            ))
          )}
        </div>
      </Block>
    </div>
  );
}

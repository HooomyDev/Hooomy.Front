import React, { useMemo } from "react";
import Block from "../../common/Block/Block";
import {
  Cog6ToothIcon,
  PhotoIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/solid";
import { PlusIcon } from "@heroicons/react/24/outline";
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

export default function AdminDatabaseHmo() {
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
      company.name.toLowerCase().includes(searchName.toLowerCase())
    );
  }, [companies, searchName]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={styles.wrapper}>
      <PageHeader icon={WrenchScrewdriverIcon} title="Управляющие компании" />
      <Block>
        <FormProvider {...methods}>
          <div className={styles.searchBlock}>
            <div className={styles.searchField}>
              <InputField
                name="searchName"
                label="Поиск по названию"
                placeholder="Название ЖЭУ"
                required={false}
                rules={{}}
              />
            </div>

            <div
              className={styles.addNewUserButton}
              onClick={() => navigate(routes.addHmo)}
            >
              <PlusIcon className={styles.icon} />
            </div>
          </div>
        </FormProvider>

        <div className={styles.companiesList}>
          {filteredCompanies.length === 0 ? (
            <EmptyBlock Icon={Cog6ToothIcon}>Список компаний пуст</EmptyBlock>
          ) : (
            filteredCompanies.map((company) => (
              <div key={company.id} className={styles.companyCard}>
                <div className={styles.companyLogo}>
                  {company.logoUrl ? (
                    <img
                      src={`${company.logoUrl}`}
                      alt={company.name}
                      className={styles.logoImage}
                    />
                  ) : (
                    <PhotoIcon />
                  )}
                </div>

                <div className={styles.companyInfo}>
                  <h3 className={styles.companyName}>{company.name}</h3>
                </div>
              </div>
            ))
          )}
        </div>
      </Block>
    </div>
  );
}

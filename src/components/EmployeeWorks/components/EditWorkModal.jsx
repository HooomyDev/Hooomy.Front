import React, { useEffect } from "react";
import styles from "./EditWorkModal.module.css";
import { FormProvider, useForm } from "react-hook-form";
import { XMarkIcon } from "@heroicons/react/24/solid";
import InputField from "../../../common/InputField/InputField";
import SelectField from "../../../common/SelectField/SelectField";
import DateField from "../../../common/DateField/DateField";
import AutocompleteField from "../../../common/AutocompleteField/AutocompleteField";
import Button from "../../../common/Button/Button";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../../../stores/authStore";
import { getCompanyDetails } from "../../../api/services/companyService";
import { useT } from "../../../utils/useT";

export default function EditWorkModal({
  isOpen,
  onClose,
  work,
  onSave,
  categories,
  streetOptions = [],
  onSearchStreets,
}) {
  const t = useT();
  const { user } = useAuthStore();
  const methods = useForm({
    defaultValues: {
      title: "",
      description: "",
      category: null,
      seriousness: 1,
      address: work?.addressId,
      plannedStartTime: "",
      plannedEndTime: "",
      factStartTime: "",
      factEndTime: "",
    },
    mode: "onChange",
  });

  const { data: company } = useQuery({
    queryKey: ["company", user?.companyId],
    queryFn: () => getCompanyDetails(user?.companyId),
  });

  const {
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitting },
  } = methods;

  const plannedStartTime = watch("plannedStartTime");
  const plannedEndTime = watch("plannedEndTime");
  const factStartTime = watch("factStartTime");
  const factEndTime = watch("factEndTime");

  useEffect(() => {
    if (work) {
      reset({
        title: work.title || "",
        description: work.description || "",
        category: work.category || 0,
        seriousness: work.seriousness || 1,
        address: work.addressId || "",
        plannedStartTime: work.plannedStartTime
          ? work.plannedStartTime.slice(0, 16)
          : "",
        plannedEndTime: work.plannedEndTime
          ? work.plannedEndTime.slice(0, 16)
          : "",
        factStartTime: work.factStartTime
          ? work.factStartTime.slice(0, 16)
          : "",
        factEndTime: work.factEndTime ? work.factEndTime.slice(0, 16) : "",
      });
    } else {
      reset({
        title: "",
        description: "",
        category: 0,
        seriousness: 1,
        address: "",
        plannedStartTime: "",
        plannedEndTime: "",
        factStartTime: "",
        factEndTime: "",
      });
    }
  }, [work, reset]);

  const onSubmit = (data) => {
    const workData = {
      ...(work && { id: work.id }),
      title: data.title,
      description: data.description,
      category: parseInt(data.category),
      seriousness: parseInt(data.seriousness),
      addressId: data.address,
      plannedStartTime: new Date(data.plannedStartTime).toISOString(),
      plannedEndTime: new Date(data.plannedEndTime).toISOString(),
      ...(work && {
        factStartTime: data.factStartTime
          ? new Date(data.factStartTime).toISOString()
          : null,
        factEndTime: data.factEndTime
          ? new Date(data.factEndTime).toISOString()
          : null,
      }),
    };
    onSave(workData);
  };

  if (!isOpen) return null;

  const categoryOptions = Object.entries(categories).map(([code, key]) => {
    const categoryCode = Number(code);
    return {
      value: categoryCode,
      label: t(`statistic.categories.${key}`),
    };
  });

  const addressOptions =
    company?.addresses?.map((addr) => ({
      value: addr.id,
      label: addr.fullAddress,
    })) || [];

  // ⚡️ Вынесено внутрь компонента для реактивности при смене языка
  const seriousnessOptions = [
    {
      value: 1,
      label: t("employeeWorkEditModal.seriousnessOptions.informational"),
    },
    {
      value: 2,
      label: t("employeeWorkEditModal.seriousnessOptions.important"),
    },
  ];

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>
            {work
              ? t("employeeWorkEditModal.title.edit")
              : t("employeeWorkEditModal.title.create")}
          </h2>
          <button className={styles.closeButton} onClick={onClose}>
            <XMarkIcon className={styles.closeIcon} />
          </button>
        </div>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <InputField
              name="title"
              label={t("employeeWorkEditModal.fields.titleLabel")}
              required
              rules={{
                required: t("employeeWorkEditModal.validation.titleRequired"),
              }}
            />

            <InputField
              name="description"
              label={t("employeeWorkEditModal.fields.descriptionLabel")}
              multiline
              rows={3}
              required
              rules={{
                required: t(
                  "employeeWorkEditModal.validation.descriptionRequired",
                ),
              }}
            />

            <SelectField
              name="category"
              label={t("employeeWorkEditModal.fields.categoryLabel")}
              options={categoryOptions}
              required
              rules={{
                required: t(
                  "employeeWorkEditModal.validation.categoryRequired",
                ),
              }}
            />

            <SelectField
              name="seriousness"
              label={t("employeeWorkEditModal.fields.seriousnessLabel")}
              options={seriousnessOptions}
              required
              rules={{
                required: t(
                  "employeeWorkEditModal.validation.seriousnessRequired",
                ),
              }}
            />

            <AutocompleteField
              label={t("employeeWorkEditModal.fields.addressLabel")}
              name="address"
              options={addressOptions}
              required
              rules={{
                required: t("employeeWorkEditModal.validation.addressRequired"),
              }}
            />

            <div className={styles.dateRow}>
              <DateField
                name="plannedStartTime"
                label={t("employeeWorkEditModal.fields.plannedStartLabel")}
                type="datetime-local"
                required
                rules={{
                  required: t(
                    "employeeWorkEditModal.validation.plannedStartRequired",
                  ),
                  validate: (value) => {
                    if (!value || !plannedEndTime) return true;
                    return (
                      new Date(value) < new Date(plannedEndTime) ||
                      t("employeeWorkEditModal.validation.startBeforeEnd")
                    );
                  },
                }}
              />
              <DateField
                name="plannedEndTime"
                label={t("employeeWorkEditModal.fields.plannedEndLabel")}
                type="datetime-local"
                required
                rules={{
                  required: t(
                    "employeeWorkEditModal.validation.plannedEndRequired",
                  ),
                  validate: (value) => {
                    if (!value || !plannedStartTime) return true;
                    return (
                      new Date(value) > new Date(plannedStartTime) ||
                      t("employeeWorkEditModal.validation.endAfterStart")
                    );
                  },
                }}
              />
            </div>

            {work && (
              <div className={styles.dateRow}>
                <DateField
                  name="factStartTime"
                  label={t("employeeWorkEditModal.fields.factStartLabel")}
                  type="datetime-local"
                  rules={{
                    validate: (value) => {
                      if (!value || !factEndTime) return true;
                      return (
                        new Date(value) < new Date(factEndTime) ||
                        t("employeeWorkEditModal.validation.startBeforeEnd")
                      );
                    },
                  }}
                />
                <DateField
                  name="factEndTime"
                  label={t("employeeWorkEditModal.fields.factEndLabel")}
                  type="datetime-local"
                  rules={{
                    validate: (value) => {
                      if (!value || !factStartTime) return true;
                      return (
                        new Date(value) > new Date(factStartTime) ||
                        t("employeeWorkEditModal.validation.endAfterStart")
                      );
                    },
                  }}
                />
              </div>
            )}

            <div className={styles.actions}>
              <Button type="button" variant="secondary" onClick={onClose}>
                {t("employeeWorkEditModal.actions.cancel")}
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting
                  ? t("employeeWorkEditModal.actions.saving")
                  : work
                    ? t("employeeWorkEditModal.actions.saveEdit")
                    : t("employeeWorkEditModal.actions.saveCreate")}
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}

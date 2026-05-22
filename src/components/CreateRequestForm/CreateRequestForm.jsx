import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import FileUploadField from "../../common/FileUploadField/FileUploadField";
import RequestByAdress from "../RequestByAdress/RequestByAdress";
import RequestByMap from "../RequestByMap/RequestByMap";
import InputField from "../../common/InputField/InputField";
import SelectField from "../../common/SelectField/SelectField";
import Loader from "../../common/Loader/Loader";
import PageHeader from "../../common/PageHeader/PageHeader";
import Block from "../../common/Block/Block";
import { useT } from "../../utils/useT";
import {
  createRequest,
  getRequestCategories,
  uploadRequestPhotos,
} from "../../api/services/requestService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  DocumentPlusIcon,
  MapPinIcon,
  MapIcon,
  TagIcon,
  DocumentTextIcon,
  PhotoIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/solid";
import routes from "../../stores/routes.json";
import styles from "./CreateRequestForm.module.css";

const LOCATION_TABS = [
  {
    id: "address",
    labelKey: "modal.requestByAddress",
    Icon: MapPinIcon,
  },
  {
    id: "map",
    labelKey: "modal.requestByMap",
    Icon: MapIcon,
  },
];

export default function CreateRequestForm() {
  const t = useT();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("address");

  const { data: requestCategories, isLoading } = useQuery({
    queryKey: ["requestCategories"],
    queryFn: () => getRequestCategories(),
  });

  const methods = useForm({
    defaultValues: {
      district: "",
      street: "",
      title: "",
      description: "",
      photo: [],
      location: null,
      category: 0,
    },
  });

  const submitMutation = useMutation({
    mutationFn: async (data) => {
      const address = data.street ? data.street : data.location?.address || "";
      const requestId = await createRequest(
        data.title,
        data.description,
        address,
        data.category
      );
      if (data.photos && data.photos.length > 0) {
        const formData = new FormData();
        data.photos.forEach((photo) => formData.append("files", photo));
        await uploadRequestPhotos(requestId, formData);
      }
      return requestId;
    },
    onSuccess: () => {
      methods.reset();
      queryClient.invalidateQueries({ queryKey: ["requests"] });
      navigate(routes.myRequests);
    },
    onError: (error) => {
      console.error("Ошибка при создании запроса:", error);
    },
  });

  if (isLoading) return <Loader />;

  return (
    <div className={styles.wrapper}>
      <PageHeader title={t("modal.newRequest")} icon={DocumentPlusIcon} />

      <div className={styles.layout}>
        {/* Form */}
        <Block>
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit((data) =>
                submitMutation.mutate(data)
              )}
              className={styles.form}
            >
              {/* Location type switcher */}
              <div className={styles.section}>
                <div className={styles.sectionHeader}>
                  <MapPinIcon className={styles.sectionIcon} />
                  <span className={styles.sectionTitle}>
                    {t("modal.requestByAddress")}
                  </span>
                </div>
                <div className={styles.tabSwitcher}>
                  {LOCATION_TABS.map(({ id, labelKey, Icon }) => (
                    <button
                      key={id}
                      type="button"
                      className={`${styles.tabCard} ${
                        activeTab === id ? styles.tabCardActive : ""
                      }`}
                      onClick={() => setActiveTab(id)}
                    >
                      <Icon className={styles.tabCardIcon} />
                      <span>{t(labelKey)}</span>
                    </button>
                  ))}
                </div>
                <div className={styles.tabContent}>
                  {activeTab === "address" ? (
                    <RequestByAdress />
                  ) : (
                    <RequestByMap />
                  )}
                </div>
              </div>

              <div className={styles.divider} />

              {/* Category */}
              <div className={styles.section}>
                <div className={styles.sectionHeader}>
                  <TagIcon className={styles.sectionIcon} />
                  <span className={styles.sectionTitle}>
                    {t("requests.category")}
                  </span>
                </div>
                <SelectField
                  label={t("requests.categoryLabel")}
                  {...methods.register("category")}
                  options={
                    requestCategories?.map((c) => ({
                      value: c.code,
                      label: c.name,
                    })) || []
                  }
                  required
                />
              </div>

              <div className={styles.divider} />

              {/* Details */}
              <div className={styles.section}>
                <div className={styles.sectionHeader}>
                  <DocumentTextIcon className={styles.sectionIcon} />
                  <span className={styles.sectionTitle}>
                    {t("requests.details")}
                  </span>
                </div>
                <InputField
                  required
                  label={t("requests.titleLabel")}
                  name="title"
                  rules={{ max: { value: 150 }, min: { value: 1 } }}
                  maxLength={150}
                />
                <InputField
                  label={t("user.requestDescription")}
                  name="description"
                  multiline
                  rules={{ max: { value: 300 }, min: { value: 1 } }}
                  required
                  maxLength={300}
                />
              </div>

              <div className={styles.divider} />

              {/* Photos */}
              <div className={styles.section}>
                <div className={styles.sectionHeader}>
                  <PhotoIcon className={styles.sectionIcon} />
                  <span className={styles.sectionTitle}>{t("user.photo")}</span>
                </div>
                <FileUploadField required label={t("user.photo")} />
              </div>

              <button
                type="submit"
                className={styles.submitButton}
                disabled={submitMutation.isPending}
              >
                <CheckCircleIcon className={styles.submitIcon} />
                {submitMutation.isPending ? "..." : t("user.send")}
              </button>
            </form>
          </FormProvider>
        </Block>
      </div>
    </div>
  );
}

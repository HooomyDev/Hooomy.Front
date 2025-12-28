import React from "react";
import PageWrapper from "../../common/PageWrapper/PageWrapper";
import { chapters } from "./src/chapters";
import { contents } from "./src/contents";
import DocViewer from "../../doc/DocViewer/DocViewer";
import { useT } from "../../utils/useT";

export default function PrivacyPolicyPage() {
  const t = useT();
  return (
    <PageWrapper>
      <DocViewer
        file="privacy"
        contents={contents}
        chapters={chapters}
        title={t("privacy.title")}
      />
    </PageWrapper>
  );
}

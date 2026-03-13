import React from "react";
import PageWrapper from "../../common/PageWrapper/PageWrapper";
import { chapters } from "./src/chapters";
import { contents } from "./src/contents";
import DocViewer from "../../features/doc/DocViewer/DocViewer";

export default function PrivacyPolicyPage() {
  return (
    <PageWrapper>
      <DocViewer
        file="privacy"
        contents={contents}
        chapters={chapters}
        titleKey="privacy.title"
      />
    </PageWrapper>
  );
}

import React from "react";
import PageWrapper from "../../common/PageWrapper/PageWrapper";
import DocViewer from "../../features/doc/DocViewer/DocViewer";
import { chapters } from "./src/chapters";
import { contents } from "./src/contents";

export default function UserTermsPage() {
  return (
    <PageWrapper>
      <DocViewer
        chapters={chapters}
        contents={contents}
        file="terms"
        titleKey="userTerms.title"
      />
    </PageWrapper>
  );
}

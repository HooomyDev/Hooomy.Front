import React from "react";
import DocViewer from "../../features/doc/DocViewer/DocViewer";
import PageWrapper from "../../common/PageWrapper/PageWrapper";
import { contents } from "./src/contents";
import { chapters } from "./src/chapters";

export default function CookiesPolicyPage() {
  return (
    <PageWrapper>
      <DocViewer
        titleKey="cookie.title"
        contents={contents}
        chapters={chapters}
        file="cookie"
      />
    </PageWrapper>
  );
}

import React from "react";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import MainHero from "../../components/MainHero/MainHero";
import LastCompleteRequests from "../../components/LastCompleteRequests/LastCompleteRequests";

export default function HomePage() {
  return (
    <PageWrapper>
      <MainHero />
      <LastCompleteRequests />
    </PageWrapper>
  );
}

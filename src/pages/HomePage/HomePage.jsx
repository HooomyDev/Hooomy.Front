import React from "react";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import MainHero from "../../components/MainHero/MainHero";
import LastCompleteRequests from "../../components/LastCompleteRequests/LastCompleteRequests";
import Contacts from "../../components/Contacts/Contacts";

export default function HomePage() {
  return (
    <PageWrapper>
      <MainHero />
      <LastCompleteRequests />
      <Contacts />
    </PageWrapper>
  );
}

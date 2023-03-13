import type { NextPage } from "next";
import { Header, Container } from "semantic-ui-react";
import Layout from "../src/components/layout";
import { useTranslation } from "next-i18next";

const ConsumerInfo: NextPage = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Layout>
        <Container>
          <Header>{t("consumer-info")}</Header>
        </Container>
      </Layout>
    </div>
  );
};

export default ConsumerInfo;

import type { NextPage } from "next";
import {
  Button,
  Segment,
  Divider,
  Header,
  Item,
  Label,
  Icon,
  Container,
} from "semantic-ui-react";
import Layout from "../src/components/layout";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { PATH } from "../src/utils/path";

interface ConsumerInfo {
  CID: number;
  Name: string;
  Addr: String;
  Tel: string;
  IPAddr: string;
}

const Consumer: NextPage = () => {
  const { t } = useTranslation();
  const router = useRouter();

  function handleOnClick(cid: number) {
    router.push({
      pathname: PATH.CONSUMERINFO,
      query: {
        cid: cid,
      },
    });
  }

  return (
    <div>
      <Layout>
        <Container>
          <Header>{t("consumer")}</Header>
          <Segment>
            <Item.Group>
              <Item>
                <Item.Content>
                  <Item.Header>{TestConsumer.Name}</Item.Header>
                  <Item.Meta>{TestConsumer.Addr}</Item.Meta>
                  <Item.Description>{TestConsumer.Tel}</Item.Description>
                  <Item.Extra>
                    <Label>NAS</Label>
                    <Button
                      priamry
                      floated="right"
                      onClick={() => handleOnClick(TestConsumer.CID)}
                    >
                      Details
                      <Icon name="right chevron" />
                    </Button>
                  </Item.Extra>
                </Item.Content>
              </Item>
              <Divider />
            </Item.Group>
          </Segment>
        </Container>
      </Layout>
    </div>
  );
};

export default Consumer;

const TestConsumer: ConsumerInfo = {
  CID: 1,
  Name: "Consumer 1",
  Addr: "xx市xx區xx路xx號xF",
  Tel: "123456789",
  IPAddr: "111.111.111.111",
};

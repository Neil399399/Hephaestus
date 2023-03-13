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

interface ConsumerInfo {
  Name: string;
  Addr: String;
  Tel: string;
  IPAddr: string;
}

const Consumer: NextPage = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Layout>
        <Container>
          <Header>{t("Consumer")}</Header>
          <Segment>
            <Item.Group>
              <Item>
                <Item.Content>
                  <Item.Header>{TestConsumer.Name}</Item.Header>
                  <Item.Meta>{TestConsumer.Addr}</Item.Meta>
                  <Item.Description>{TestConsumer.Tel}</Item.Description>
                  <Item.Extra>
                    <Label>NAS</Label>
                    <Button priamry floated="right">
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
  Name: "Consumer 1",
  Addr: "xx市xx區xx路xx號xF",
  Tel: "123456789",
  IPAddr: "111.111.111.111",
};

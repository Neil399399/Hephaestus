import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
} from "semantic-ui-react";
import styled from "styled-components";
import { useTranslation } from "next-i18next";

const LoginForm: React.FC = () => {
  const { t } = useTranslation();
  return (
    <StyledGrid textAlign="center" verticalAlign="middle">
      <StyledColumn>
        <Header as="h2" color="black" textAlign="center">
          {t("login")}
        </Header>
        <Form size="large">
          <Segment stacked>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder={t("email-address")}
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder={t("password")}
              type="password"
            />

            <Button color="black" fluid size="large">
              {t("login")}
            </Button>
          </Segment>
        </Form>
        <Message>
          <a href="#">{t("signup")}</a>
        </Message>
      </StyledColumn>
    </StyledGrid>
  );
};
export default LoginForm;

const StyledGrid = styled(Grid)`
  height: 100vh;
`;
const StyledColumn = styled(Grid.Column)`
  max-width: 500px;
`;

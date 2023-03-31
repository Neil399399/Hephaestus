import type { NextPage } from "next";
import { Header, Container, Segment, Form, Label } from "semantic-ui-react";
import Layout from "../src/components/layout";
import { useTranslation } from "next-i18next";
import { Formik, FieldArray } from "formik";
import { ConsumerDetail } from "../src/utils/types";
import { useEffect, useState } from "react";

const ConsumerInfo: NextPage = () => {
  const { t } = useTranslation();
  //@TODO: call api and get info
  const [info, setInfo] = useState<ConsumerDetail>(TestConsumerInfo);
  //@TODO: check permission
  const [readOnly, setReadOnly] = useState<boolean>(true);
  // useEffect(() => {
  //   setInfo(TestConsumerInfo);
  // }, []);

  //@TODO: validate func

  //@TODO: submit
  function call() {
    console.log("submit");
    console.log(info);
  }

  return (
    <div>
      <Layout>
        <Container>
          <Header>{t("consumer-info")}</Header>
          <Segment>
            <Formik
              initialValues={{
                name: info?.Name,
                tel: info?.Tel,
                addr: info?.Addr,
                remotes: info?.Remotes,
              }}
              onSubmit={call}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
              }) => (
                <Form onSubmit={handleSubmit}>
                  <Header size="medium">{t("basic-info")}</Header>
                  <Form.Group widths="equal">
                    <Form.Input
                      readOnly={readOnly}
                      label={t("name")}
                      type="string"
                      name="name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                    />
                    <Form.Input
                      readOnly={readOnly}
                      label={t("tel")}
                      type="string"
                      name="tel"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.tel}
                    />
                    <Form.Input
                      readOnly={readOnly}
                      label={t("addr")}
                      type="string"
                      name="addr"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.addr}
                    />
                  </Form.Group>
                  <Header size="medium">{t("remote")}</Header>
                  <FieldArray
                    name="remotes"
                    render={() => {
                      return !values.remotes ||
                        values.remotes.length <= 0 ? null : (
                        <div>
                          {values.remotes.map((v) => (
                            <Form.Group key={v.ID} widths={5}>
                              <Form.Input
                                readOnly={readOnly}
                                label={t("comment")}
                                type="string"
                                name="comment"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={v.Comment}
                              />{" "}
                              <Form.Input
                                readOnly={readOnly}
                                label={t("ip")}
                                type="string"
                                name="ip"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={v.IP}
                              />
                              <Form.Input
                                readOnly={readOnly}
                                label={t("port")}
                                type="string"
                                name="port"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={v.Port}
                              />
                              <Form.Input
                                readOnly={readOnly}
                                label={t("login-account")}
                                type="string"
                                name="loginAcc"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={v.LoginAcc}
                              />
                              <Form.Input
                                readOnly={readOnly}
                                label={t("login-password")}
                                type="password"
                                name="loginPwd"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={v.LoginPwd}
                              />
                            </Form.Group>
                          ))}
                        </div>
                      );
                    }}
                  />

                  {/* <Form.Input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  /> */}
                  {!readOnly && <Form.Button type="submit">Submit</Form.Button>}
                </Form>
              )}
            </Formik>
          </Segment>
        </Container>
      </Layout>
    </div>
  );
};

export default ConsumerInfo;

const TestConsumerInfo: ConsumerDetail = {
  CID: 1,
  Name: "Consumer 1",
  Addr: "xx市xx區xx路xx號xF",
  Tel: "123456789",
  IPAddr: "111.111.111.111",
  Remotes: [
    {
      ID: 1,
      IP: "111.111.111.111",
      Port: 3389,
      Comment: "mail",
      LoginAcc: "administrator",
      LoginPwd: "123456",
    },
    {
      ID: 2,
      IP: "222.222.222.222",
      Port: 3389,
      Comment: "mail",
      LoginAcc: "administrator",
      LoginPwd: "123456",
    },
  ],
};

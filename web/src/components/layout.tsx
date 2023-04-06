import React, { ReactNode } from "react";
import { useTranslation } from "next-i18next";
import styled from "styled-components";
import { Menu } from "semantic-ui-react";
import { useRouter } from "next/router";
import { PATH } from "../utils/path";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <StyledLayout>
      <SideBar>
        <StyledMenu inverted pointing vertical>
          <Menu.Item>
            <Menu.Header>{t("consumer")}</Menu.Header>
            <Menu.Menu>
              <Menu.Item
                name={t("all-consumer")}
                onClick={() => router.push(PATH.CONSUMER)}
              />
            </Menu.Menu>
          </Menu.Item>
        </StyledMenu>
      </SideBar>

      <Content>{children}</Content>
    </StyledLayout>
  );
};

export default Layout;

const StyledLayout = styled.div`
  height: 100vh;
  display: flex;
`;

const SideBar = styled.div`
  background-color: green;
  width: 15%;
  display: inline;
`;

const Content = styled.div`
  width: 100%;
  display: inline;
`;

const StyledMenu = styled(Menu)`
  height: 100%;
  &.ui.menu {
    border-radius: 0;
    width: 100%;
  }
`;

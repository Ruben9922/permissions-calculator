import React from "react";
import {Container, Icon, Menu} from "semantic-ui-react";

export default function MenuComponent() {
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item header link href=".">Unix Permissions Calculator</Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item link href="//rubendougall.co.uk/">
            <Icon name="arrow left"/>
            Back to Main Website
          </Menu.Item>
          <Menu.Item link href="https://github.com/Ruben9922/permissions-calculator">
            <Icon name="github"/>
            GitHub
          </Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>
  );
}

import React from "react";
import {Container, Grid, Header} from "semantic-ui-react";
import MenuBar from "./MenuComponent";
import FormComponent from "./FormComponent";
import OctalOutput from "./OctalOutput";
import SymbolicOutput from "./SymbolicOutput";
import ReactGA from "react-ga";
import produce from "immer";

const TRACKING_ID = "UA-23280894-8";
ReactGA.initialize(TRACKING_ID);

const initialPermissions = {
  special: {
    setuid: false,
    setgid: false,
    stickyMode: false,
  },
  user: {
    read: false,
    write: false,
    execute: false,
  },
  group: {
    read: false,
    write: false,
    execute: false,
  },
  other: {
    read: false,
    write: false,
    execute: false,
  }
};

export default function App() {
  const [permissions, setPermissions] = React.useState(initialPermissions);

  const handleChange = (triad, permission, value) => {
    setPermissions(produce(draft => {
      draft[triad][permission] = value;
    }));
  };

  const handleClear = () => setPermissions(initialPermissions);

  return (
    <div>
      <MenuBar/>
      <div style={{marginTop: "4em"}}>
        <Header as="h1" textAlign="center">Unix Permissions Calculator</Header>
        <Container textAlign="center">
          <p>
            Check the required permissions in the following table and the octal and symbolic notations will be updated
            accordingly.
          </p>
        </Container>
        <Grid centered padded stackable>
          <Grid.Row>
            <Grid.Column width={10}>
              <FormComponent permissions={permissions} onChange={handleChange} onClear={handleClear} />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={3}>
            <Grid.Column>
              <OctalOutput permissions={permissions} />
            </Grid.Column>

            <Grid.Column>
              <SymbolicOutput permissions={permissions} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    </div>
  );
}

import React, {Component} from "react";
import {Grid, Header} from "semantic-ui-react";
import MenuBar from "./MenuComponent";
import FormComponent from "./FormComponent";
import OctalOutput from "./OctalOutput";
import SymbolicOutput from "./SymbolicOutput";

class App extends Component {
  render() {
    return (
      <div>
        <MenuBar/>
        <div style={{marginTop: "4em"}}>
          <Header as="h1" textAlign="center">Unix Permissions Calculator</Header>
          <Grid centered padded stackable>
            <Grid.Row>
              <Grid.Column width={10}>
                <FormComponent/>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={3}>
              <Grid.Column>
                <OctalOutput/>
              </Grid.Column>

              <Grid.Column>
                <SymbolicOutput/>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </div>
    );
  }
}

export default App;

import React, {Component} from "react";
import {Grid, Header} from "semantic-ui-react";
import MenuBar from "./MenuComponent";
import FormComponent from "./FormComponent";
import OctalOutput from "./OctalOutput";
import SymbolicOutput from "./SymbolicOutput";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      permissions: {
        special: {
          setuid: false,
          setgid: false,
          stickyMode: false
        },
        user: {
          read: false,
          write: false,
          execute: false
        },
        group: {
          read: false,
          write: false,
          execute: false
        },
        other: {
          read: false,
          write: false,
          execute: false
        }
      }
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(triad, permission, value) {
    this.setState(prevState => {
      let updatedTriad = Object.assign({}, prevState.permissions[triad], {[permission]: value});
      let updatedPermissions = Object.assign({}, prevState.permissions, {[triad]: updatedTriad});
      return {
        permissions: updatedPermissions
      };
    });
  }

  render() {
    return (
      <div>
        <MenuBar/>
        <div style={{marginTop: "4em"}}>
          <Header as="h1" textAlign="center">Unix Permissions Calculator</Header>
          <Grid centered padded stackable>
            <Grid.Row>
              <Grid.Column width={10}>
                <FormComponent permissions={this.state.permissions} onChange={this.handleChange}/>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={3}>
              <Grid.Column>
                <OctalOutput permissions={this.state.permissions}/>
              </Grid.Column>

              <Grid.Column>
                <SymbolicOutput permissions={this.state.permissions}/>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </div>
    );
  }
}

export default App;

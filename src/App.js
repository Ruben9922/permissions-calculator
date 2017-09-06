import React, {Component} from 'react';
import {Form, Grid, Segment, Table, Header, Menu, Container, Icon} from 'semantic-ui-react';

class App extends Component {
  render() {
    return (
      <div>
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
        <div style={{marginTop: "4em"}}>
          <Header as="h1" textAlign="center">Unix Permissions Calculator</Header>
          <Grid centered padded stackable>
            <Grid.Row>
              <Grid.Column width={10}>
                <Segment>
                  <p>
                    Check the required permissions.
                  </p>
                  <Form>
                    <Table celled unstackable>
                      <Table.Header>
                        <Table.Row>
                          <Table.HeaderCell>Special</Table.HeaderCell>
                          <Table.HeaderCell>User</Table.HeaderCell>
                          <Table.HeaderCell>Group</Table.HeaderCell>
                          <Table.HeaderCell>Other</Table.HeaderCell>
                        </Table.Row>
                      </Table.Header>

                      <Table.Body>
                        <Table.Row>
                          <Table.Cell>
                            <Form.Checkbox label="setuid"/>
                          </Table.Cell>
                          <Table.Cell>
                            <Form.Checkbox label="Read"/>
                          </Table.Cell>
                          <Table.Cell>
                            <Form.Checkbox label="Read"/>
                          </Table.Cell>
                          <Table.Cell>
                            <Form.Checkbox label="Read"/>
                          </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell>
                            <Form.Checkbox label="setgid"/>
                          </Table.Cell>
                          <Table.Cell>
                            <Form.Checkbox label="Write"/>
                          </Table.Cell>
                          <Table.Cell>
                            <Form.Checkbox label="Write"/>
                          </Table.Cell>
                          <Table.Cell>
                            <Form.Checkbox label="Write"/>
                          </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell>
                            <Form.Checkbox label="Sticky mode"/>
                          </Table.Cell>
                          <Table.Cell>
                            <Form.Checkbox label="Execute"/>
                          </Table.Cell>
                          <Table.Cell>
                            <Form.Checkbox label="Execute"/>
                          </Table.Cell>
                          <Table.Cell>
                            <Form.Checkbox label="Execute"/>
                          </Table.Cell>
                        </Table.Row>
                      </Table.Body>

                      <Table.Footer>
                        <Table.Row>
                          <Table.HeaderCell colSpan={4} style={{textAlign: "center"}}>
                            <Form.Button type="button">Clear</Form.Button>
                          </Table.HeaderCell>
                        </Table.Row>
                      </Table.Footer>
                    </Table>
                  </Form>
                </Segment>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={3}>
              <Grid.Column>
                <div>
                  <Header as="h4" attached="top" inverted>Octal Notation</Header>
                  <Segment attached="bottom" textAlign="center">
                    <p style={{fontSize: "2em", margin: "0"}}>0000</p>
                    <p>Example: <code><b>chmod 0000 /path/to/file</b></code></p>
                  </Segment>
                </div>
              </Grid.Column>

              <Grid.Column>
                <div>
                  <Header as="h4" attached="top" inverted>Symbolic Notation</Header>
                  <Segment attached="bottom" textAlign="center">
                    <samp style={{fontSize: "2em", margin: "0"}}>---------</samp>
                  </Segment>
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </div>
    );
  }
}

export default App;

import React, {Component} from "react";
import {Form, Segment, Table} from "semantic-ui-react";

class FormComponent extends Component {
  render() {
    return (
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
    );
  }
}

export default FormComponent;

import React, {Component} from "react";
import {Form, Segment, Table} from "semantic-ui-react";

class FormComponent extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, data) {
    console.log(data.dataPermission);
  }

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
                  <Form.Checkbox type="checkbox" label="setuid"
                                 onChange={(e, d) => this.props.onChange("special", "setuid", d.checked)}/>
                </Table.Cell>
                <Table.Cell>
                  <Form.Checkbox type="checkbox" label="Read"
                                 onChange={(e, d) => this.props.onChange("user", "read", d.checked)}/>
                </Table.Cell>
                <Table.Cell>
                  <Form.Checkbox type="checkbox" label="Read"
                                 onChange={(e, d) => this.props.onChange("group", "read", d.checked)}/>
                </Table.Cell>
                <Table.Cell>
                  <Form.Checkbox type="checkbox" label="Read"
                                 onChange={(e, d) => this.props.onChange("other", "read", d.checked)}/>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Form.Checkbox type="checkbox" label="setgid"
                                 onChange={(e, d) => this.props.onChange("special", "setgid", d.checked)}/>
                </Table.Cell>
                <Table.Cell>
                  <Form.Checkbox type="checkbox" label="Write"
                                 onChange={(e, d) => this.props.onChange("user", "write", d.checked)}/>
                </Table.Cell>
                <Table.Cell>
                  <Form.Checkbox type="checkbox" label="Write"
                                 onChange={(e, d) => this.props.onChange("group", "write", d.checked)}/>
                </Table.Cell>
                <Table.Cell>
                  <Form.Checkbox type="checkbox" label="Write"
                                 onChange={(e, d) => this.props.onChange("other", "write", d.checked)}/>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Form.Checkbox type="checkbox" label="Sticky mode"
                                 onChange={(e, d) => this.props.onChange("special", "stickyMode", d.checked)}/>
                </Table.Cell>
                <Table.Cell>
                  <Form.Checkbox type="checkbox" label="Execute"
                                 onChange={(e, d) => this.props.onChange("user", "execute", d.checked)}/>
                </Table.Cell>
                <Table.Cell>
                  <Form.Checkbox type="checkbox" label="Execute"
                                 onChange={(e, d) => this.props.onChange("group", "execute", d.checked)}/>
                </Table.Cell>
                <Table.Cell>
                  <Form.Checkbox type="checkbox" label="Execute"
                                 onChange={(e, d) => this.props.onChange("other", "execute", d.checked)}/>
                </Table.Cell>
              </Table.Row>
            </Table.Body>

            <Table.Footer>
              <Table.Row>
                <Table.HeaderCell colSpan={4} style={{textAlign: "center"}}>
                  <Form.Button type="button" onClick={(e, d) => this.props.onClear()}>Clear</Form.Button>
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

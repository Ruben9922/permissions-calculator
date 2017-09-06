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
                  <Form.Checkbox type="checkbox" label="setuid" checked={this.props.permissions.special.setuid}
                                 onChange={(e, d) => this.props.onChange("special", "setuid", d.checked)}/>
                </Table.Cell>
                <Table.Cell>
                  <Form.Checkbox type="checkbox" label="Read" checked={this.props.permissions.user.read}
                                 onChange={(e, d) => this.props.onChange("user", "read", d.checked)}/>
                </Table.Cell>
                <Table.Cell>
                  <Form.Checkbox type="checkbox" label="Read" checked={this.props.permissions.group.read}
                                 onChange={(e, d) => this.props.onChange("group", "read", d.checked)}/>
                </Table.Cell>
                <Table.Cell>
                  <Form.Checkbox type="checkbox" label="Read" checked={this.props.permissions.other.read}
                                 onChange={(e, d) => this.props.onChange("other", "read", d.checked)}/>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Form.Checkbox type="checkbox" label="setgid" checked={this.props.permissions.special.setgid}
                                 onChange={(e, d) => this.props.onChange("special", "setgid", d.checked)}/>
                </Table.Cell>
                <Table.Cell>
                  <Form.Checkbox type="checkbox" label="Write" checked={this.props.permissions.user.write}
                                 onChange={(e, d) => this.props.onChange("user", "write", d.checked)}/>
                </Table.Cell>
                <Table.Cell>
                  <Form.Checkbox type="checkbox" label="Write" checked={this.props.permissions.group.write}
                                 onChange={(e, d) => this.props.onChange("group", "write", d.checked)}/>
                </Table.Cell>
                <Table.Cell>
                  <Form.Checkbox type="checkbox" label="Write" checked={this.props.permissions.other.write}
                                 onChange={(e, d) => this.props.onChange("other", "write", d.checked)}/>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Form.Checkbox type="checkbox" label="Sticky mode" checked={this.props.permissions.special.stickyMode}
                                 onChange={(e, d) => this.props.onChange("special", "stickyMode", d.checked)}/>
                </Table.Cell>
                <Table.Cell>
                  <Form.Checkbox type="checkbox" label="Execute" checked={this.props.permissions.user.execute}
                                 onChange={(e, d) => this.props.onChange("user", "execute", d.checked)}/>
                </Table.Cell>
                <Table.Cell>
                  <Form.Checkbox type="checkbox" label="Execute" checked={this.props.permissions.group.execute}
                                 onChange={(e, d) => this.props.onChange("group", "execute", d.checked)}/>
                </Table.Cell>
                <Table.Cell>
                  <Form.Checkbox type="checkbox" label="Execute" checked={this.props.permissions.other.execute}
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

import React from "react";
import {Form, Table} from "semantic-ui-react";
import "./FormComponent.css";

export default function FormComponent({ permissions, onChange, onClear }) {
  return (
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
              <Form.Checkbox type="checkbox" label="setuid" checked={permissions.special.setuid}
                             onChange={(e, d) => onChange("special", "setuid", d.checked)}/>
            </Table.Cell>
            <Table.Cell>
              <Form.Checkbox type="checkbox" label="Read" checked={permissions.user.read}
                             onChange={(e, d) => onChange("user", "read", d.checked)}/>
            </Table.Cell>
            <Table.Cell>
              <Form.Checkbox type="checkbox" label="Read" checked={permissions.group.read}
                             onChange={(e, d) => onChange("group", "read", d.checked)}/>
            </Table.Cell>
            <Table.Cell>
              <Form.Checkbox type="checkbox" label="Read" checked={permissions.other.read}
                             onChange={(e, d) => onChange("other", "read", d.checked)}/>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Form.Checkbox type="checkbox" label="setgid" checked={permissions.special.setgid}
                             onChange={(e, d) => onChange("special", "setgid", d.checked)}/>
            </Table.Cell>
            <Table.Cell>
              <Form.Checkbox type="checkbox" label="Write" checked={permissions.user.write}
                             onChange={(e, d) => onChange("user", "write", d.checked)}/>
            </Table.Cell>
            <Table.Cell>
              <Form.Checkbox type="checkbox" label="Write" checked={permissions.group.write}
                             onChange={(e, d) => onChange("group", "write", d.checked)}/>
            </Table.Cell>
            <Table.Cell>
              <Form.Checkbox type="checkbox" label="Write" checked={permissions.other.write}
                             onChange={(e, d) => onChange("other", "write", d.checked)}/>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Form.Checkbox type="checkbox" label="Sticky mode" checked={permissions.special.stickyMode}
                             onChange={(e, d) => onChange("special", "stickyMode", d.checked)}/>
            </Table.Cell>
            <Table.Cell>
              <Form.Checkbox type="checkbox" label="Execute" checked={permissions.user.execute}
                             onChange={(e, d) => onChange("user", "execute", d.checked)}/>
            </Table.Cell>
            <Table.Cell>
              <Form.Checkbox type="checkbox" label="Execute" checked={permissions.group.execute}
                             onChange={(e, d) => onChange("group", "execute", d.checked)}/>
            </Table.Cell>
            <Table.Cell>
              <Form.Checkbox type="checkbox" label="Execute" checked={permissions.other.execute}
                             onChange={(e, d) => onChange("other", "execute", d.checked)}/>
            </Table.Cell>
          </Table.Row>
        </Table.Body>

        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan={4} style={{textAlign: "center"}}>
              <Form.Button type="button" onClick={(e, d) => onClear()}>Clear</Form.Button>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </Form>
  );
}

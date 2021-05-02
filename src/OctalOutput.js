import React from "react";
import {Header, Segment} from "semantic-ui-react";

function computeDigit(read, write, execute) {
  let digit = 0;
  if (read) {
    digit += 4;
  }
  if (write) {
    digit += 2;
  }
  if (execute) {
    digit += 1;
  }
  return digit;
}

export default function OctalOutput({ permissions }) {
  const computeOctal = () =>
    String(computeDigit(permissions.special.setuid, permissions.special.setgid, permissions.special.stickyMode))
    + String(computeDigit(permissions.user.read, permissions.user.write, permissions.user.execute))
    + String(computeDigit(permissions.group.read, permissions.group.write, permissions.group.execute))
    + String(computeDigit(permissions.other.read, permissions.other.write, permissions.other.execute));

  let octal = computeOctal();
  return (
    <div>
      <Header as="h4" attached="top" inverted>Octal Notation</Header>
      <Segment attached="bottom" textAlign="center">
        <p style={{fontSize: "2em", margin: "0"}}>{octal}</p>
        <p>Example: <code><b>chmod {octal} /path/to/file</b></code></p>
      </Segment>
    </div>
  );
}

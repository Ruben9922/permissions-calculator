import React, {Component} from "react";
import {Header, Segment} from "semantic-ui-react";

class OctalOutput extends Component {
  render() {
    return (
      <div>
        <Header as="h4" attached="top" inverted>Octal Notation</Header>
        <Segment attached="bottom" textAlign="center">
          <p style={{fontSize: "2em", margin: "0"}}>0000</p>
          <p>Example: <code><b>chmod 0000 /path/to/file</b></code></p>
        </Segment>
      </div>
    );
  }
}

export default OctalOutput;

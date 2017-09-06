import React, {Component} from "react";
import {Header, Segment} from "semantic-ui-react";

class SymbolicOutput extends Component {
  render() {
    return (
      <div>
        <Header as="h4" attached="top" inverted>Symbolic Notation</Header>
        <Segment attached="bottom" textAlign="center">
          <samp style={{fontSize: "2em", margin: "0"}}>---------</samp>
        </Segment>
      </div>
    );
  }
}

export default SymbolicOutput;

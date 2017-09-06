import React, {Component} from "react";
import {Header, Segment} from "semantic-ui-react";

class SymbolicOutput extends Component {
  constructor(props) {
    super(props);

    this.computeSymbolic = this.computeSymbolic.bind(this);
  }

  static computeTriad(triad, special, stickyMode) {
    return (triad.read ? "r" : "-") + (triad.write ? "w" : "-")
      + (triad.execute ?
        (special ? (stickyMode ? "t" : "s") : "x") :
        (special ? (stickyMode ? "T" : "S") : "-"));
  }

  computeSymbolic() {
    const permissions = this.props.permissions;
    return SymbolicOutput.computeTriad(permissions.user, permissions.special.setuid, false)
      + SymbolicOutput.computeTriad(permissions.group, permissions.special.setgid, false)
      + SymbolicOutput.computeTriad(permissions.other, permissions.special.stickyMode, true);
  }

  render() {
    return (
      <div>
        <Header as="h4" attached="top" inverted>Symbolic Notation</Header>
        <Segment attached="bottom" textAlign="center">
          <samp style={{fontSize: "2em", margin: "0"}}>{this.computeSymbolic()}</samp>
        </Segment>
      </div>
    );
  }
}

export default SymbolicOutput;

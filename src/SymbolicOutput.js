import React from "react";
import {Header, Segment} from "semantic-ui-react";

function computeTriad(triad, special, stickyMode) {
  return (triad.read ? "r" : "-") + (triad.write ? "w" : "-")
    + (triad.execute ?
      (special ? (stickyMode ? "t" : "s") : "x") :
      (special ? (stickyMode ? "T" : "S") : "-"));
}

export default function SymbolicOutput({ permissions }) {
  const computeSymbolic = () =>
    computeTriad(permissions.user, permissions.special.setuid, false)
    + computeTriad(permissions.group, permissions.special.setgid, false)
    + computeTriad(permissions.other, permissions.special.stickyMode, true);

  return (
    <div>
      <Header as="h4" attached="top" inverted>Symbolic Notation</Header>
      <Segment attached="bottom" textAlign="center">
        <samp style={{fontSize: "2em", margin: "0"}}>{computeSymbolic()}</samp>
      </Segment>
    </div>
  );
}

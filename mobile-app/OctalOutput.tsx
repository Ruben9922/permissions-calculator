import React from "react";
import { Text, View } from "react-native";
import { Permissions } from "./permissions.ts";

type OctalOutputProps = {
  permissions: Permissions;
};

export default function OctalOutput({permissions}: OctalOutputProps): React.JSX.Element {
  const computeDigit = (read: boolean, write: boolean, execute: boolean): number => {
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
  };

  const octal =
    String(computeDigit(permissions.special.setuid, permissions.special.setgid, permissions.special.stickyMode))
    + String(computeDigit(permissions.user.read, permissions.user.write, permissions.user.execute))
    + String(computeDigit(permissions.group.read, permissions.group.write, permissions.group.execute))
    + String(computeDigit(permissions.other.read, permissions.other.write, permissions.other.execute));

  return (
    <View>
      <Text>Octal</Text>
      <Text>{octal}</Text>
      <Text>
        Example: <Text>chmod {octal} /path/to/file</Text>
      </Text>
    </View>
  );
}

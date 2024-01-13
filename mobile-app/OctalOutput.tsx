import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import {Text} from "react-native-paper";
import {Permissions} from "./permissions.ts";
import Clipboard from "@react-native-clipboard/clipboard";

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
    <View style={styles.container}>
      <Text variant="titleMedium">Numeric Notation</Text>
      <TouchableOpacity onPress={() => Clipboard.setString(octal)}>
        <Text variant="displaySmall" style={styles.code}>
          {octal}
        </Text>
      </TouchableOpacity>
      <Text variant="bodyLarge">
        Example: <Text style={[styles.code, styles.bold]}>chmod {octal} /path/to/file</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  code: {
    fontFamily: "monospace",
  },
  bold: {
    fontWeight: "700",
  },
});

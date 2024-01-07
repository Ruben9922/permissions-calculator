import React from "react";
import {StyleSheet, View} from "react-native";
import {Text} from "react-native-paper";
import {Permission, Permissions} from "./permissions.ts";

type SymbolicOutputProps = {
  permissions: Permissions;
};

export default function SymbolicOutput({permissions}: SymbolicOutputProps): React.JSX.Element {
  const computeReadSymbol = (read: boolean): string => (read ? "r" : "-");
  const computeWriteSymbol = (write: boolean): string => (write ? "w" : "-");
  const computeExecuteSymbol = (execute: boolean, special: boolean, stickyMode: boolean): string => {
    if (execute) {
      if (special) {
        if (stickyMode) {
          return "t";
        } else {
          return "s";
        }
      } else {
        return "x";
      }
    } else {
      if (special) {
        if (stickyMode) {
          return "T";
        } else {
          return "S";
        }
      } else {
        return "-";
      }
    }
  };

  const computeSymbolicForTriad = (classPermissions: Record<Permission, boolean>, special: boolean, stickyMode: boolean): string => {
    const readSymbol = computeReadSymbol(classPermissions.read);
    const writeSymbol = computeWriteSymbol(classPermissions.write);
    const executeSymbol = computeExecuteSymbol(classPermissions.execute, special, stickyMode);

    return readSymbol + writeSymbol + executeSymbol;
  };

  const symbolic = computeSymbolicForTriad(permissions.user, permissions.special.setuid, false)
    + computeSymbolicForTriad(permissions.group, permissions.special.setgid, false)
    + computeSymbolicForTriad(permissions.other, permissions.special.stickyMode, true);

  return (
    <View style={styles.container}>
      <Text variant="titleMedium">Symbolic Notation</Text>
      <Text variant="displaySmall" style={styles.code}>{symbolic}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  code: {
    fontFamily: "monospace",
  },
  bold: {
    fontWeight: "700",
  },
});

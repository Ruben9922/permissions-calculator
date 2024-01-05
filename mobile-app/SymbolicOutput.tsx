import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Permission, Permissions } from "./permissions.ts";

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
      <Text style={styles.title}>Symbolic Notation</Text>
      <Text style={[styles.code, styles.large, styles.bold]}>{symbolic}</Text>
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
  medium: {
    fontSize: 16,
  },
  large: {
    fontSize: 28,
  },
  bold: {
    fontWeight: "700",
  },
});

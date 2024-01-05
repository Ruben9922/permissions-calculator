import React from "react";
import { StyleSheet, Text, useColorScheme, View } from "react-native";
import { colors } from "./colors.ts";
import { Permissions } from "./permissions.ts";

type OctalOutputProps = {
  permissions: Permissions;
};

export default function OctalOutput({permissions}: OctalOutputProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === "dark";
  const currentColors = isDarkMode ? colors.dark : colors.light;
  const textStyle = {color: currentColors.primary};

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
      <Text style={[textStyle, styles.title]}>Octal Notation</Text>
      <Text style={[textStyle, styles.code, styles.large, styles.bold]}>{octal}</Text>
      <Text style={[textStyle, styles.medium]}>
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

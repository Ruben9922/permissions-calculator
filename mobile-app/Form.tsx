import startCase from "lodash/fp/startCase";
import React from "react";
import { StyleSheet, Text, useColorScheme, View } from "react-native";
import CheckBoxWithText from "./CheckBoxWithText.tsx";
import { colors } from "./colors.ts";
import { Class, Permission, Permissions, SpecialPermission } from "./permissions.ts";

type FormProps = {
  permissions: Permissions;
  handleSpecialChange: (permission: SpecialPermission, value: boolean) => void;
  handleChange: ($class: Class, permission: Permission, value: boolean) => void;
};

export default function Form({
                permissions,
                handleSpecialChange,
                handleChange,
              }: FormProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === "dark";
  const currentColors = isDarkMode ? colors.dark : colors.light;
  const textStyle = {color: currentColors.primary};

  return (
    <View style={styles.container}>
      {Object.entries(permissions).map(([$class, classPermissions]) => (
        <View style={styles.column} key={$class}>
          <Text style={[textStyle, styles.columnLabel]}>{startCase($class)}</Text>
          {Object.entries(classPermissions).map(([permission, value]) => {
            const onValueChange = (updatedValue: boolean) =>
              $class === "special"
                ? handleSpecialChange(
                  permission as SpecialPermission,
                  updatedValue,
                )
                : handleChange(
                  $class as Class,
                  permission as Permission,
                  updatedValue,
                );

            return (
              <CheckBoxWithText
                key={permission}
                value={value}
                text={startCase(permission)}
                onValueChange={onValueChange}
              />
            );
          })}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
  },
  column: {
    flexDirection: "column",
    flex: 1,
  },
  columnLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 2,
  },
});
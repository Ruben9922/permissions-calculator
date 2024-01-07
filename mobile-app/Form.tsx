import startCase from "lodash/fp/startCase";
import React from "react";
import {StyleSheet, View} from "react-native";
import {Checkbox, Text} from "react-native-paper";
import {
  Class,
  Permission,
  Permissions,
  SpecialPermission,
} from "./permissions.ts";

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
  return (
    <View style={styles.container}>
      {Object.entries(permissions).map(([$class, classPermissions]) => (
        <View style={styles.column} key={$class}>
          <Text variant="labelLarge" style={styles.columnLabel}>{startCase($class)}</Text>
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
              <Checkbox.Item
                key={permission}
                status={value ? "checked" : "unchecked"}
                label={startCase(permission)}
                onPress={() => onValueChange(!value)}
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
    marginBottom: 2,
  },
});

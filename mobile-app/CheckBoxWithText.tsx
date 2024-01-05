import CheckBox from "@react-native-community/checkbox";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type CheckBoxWithTextProps = {
  value: boolean;
  text: string;
  onValueChange?: (value: boolean) => void;
};

export default function CheckBoxWithText({
                            value,
                            text,
                            onValueChange,
                          }: CheckBoxWithTextProps): React.JSX.Element {
  return (
    <View style={styles.checkBoxContainer}>
      <CheckBox value={value} onValueChange={onValueChange} style={styles.checkBox} />
      <Text style={styles.label}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  checkBoxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkBox: {
    marginLeft: -4,
  },
  label: {
    margin: 0,
    marginBottom: 1,
    fontSize: 16,
  },
});

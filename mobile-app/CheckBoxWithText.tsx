import CheckBox from "@react-native-community/checkbox";
import React from "react";
import { StyleSheet, Text, useColorScheme, View } from "react-native";
import { colors } from "./colors.ts";

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
  const isDarkMode = useColorScheme() === "dark";
  const currentColors = isDarkMode ? colors.dark : colors.light;
  const textStyle = {color: currentColors.primary};

  return (
    <View style={styles.checkBoxContainer}>
      <CheckBox value={value} onValueChange={onValueChange} style={styles.checkBox} />
      <Text style={[textStyle, styles.label]} onPress={() => onValueChange ? onValueChange(!value) : undefined}>{text}</Text>
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

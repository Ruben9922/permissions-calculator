/**
 * @format
 */

import React from "react";
import {AppRegistry} from "react-native";
import {MD3DarkTheme as DefaultTheme, PaperProvider} from "react-native-paper";
import {SafeAreaProvider} from "react-native-safe-area-context";
import App from "./App";
import {name as appName} from "./app.json";

const customTheme = {
  colors: {
    primary: "rgb(165, 200, 255)",
    onPrimary: "rgb(0, 49, 95)",
    primaryContainer: "rgb(0, 71, 134)",
    onPrimaryContainer: "rgb(212, 227, 255)",
    secondary: "rgb(188, 199, 220)",
    onSecondary: "rgb(39, 49, 65)",
    secondaryContainer: "rgb(61, 71, 88)",
    onSecondaryContainer: "rgb(216, 227, 248)",
    tertiary: "rgb(218, 189, 226)",
    onTertiary: "rgb(61, 40, 70)",
    tertiaryContainer: "rgb(85, 63, 93)",
    onTertiaryContainer: "rgb(247, 216, 255)",
    error: "rgb(255, 180, 171)",
    onError: "rgb(105, 0, 5)",
    errorContainer: "rgb(147, 0, 10)",
    onErrorContainer: "rgb(255, 180, 171)",
    background: "rgb(26, 28, 30)",
    onBackground: "rgb(227, 226, 230)",
    surface: "rgb(26, 28, 30)",
    onSurface: "rgb(227, 226, 230)",
    surfaceVariant: "rgb(67, 71, 78)",
    onSurfaceVariant: "rgb(195, 198, 207)",
    outline: "rgb(141, 145, 153)",
    outlineVariant: "rgb(67, 71, 78)",
    shadow: "rgb(0, 0, 0)",
    scrim: "rgb(0, 0, 0)",
    inverseSurface: "rgb(227, 226, 230)",
    inverseOnSurface: "rgb(47, 48, 51)",
    inversePrimary: "rgb(0, 95, 175)",
    elevation: {
      level0: "transparent",
      level1: "rgb(33, 37, 41)",
      level2: "rgb(37, 42, 48)",
      level3: "rgb(41, 47, 55)",
      level4: "rgb(43, 49, 57)",
      level5: "rgb(46, 52, 62)",
    },
    surfaceDisabled: "rgba(227, 226, 230, 0.12)",
    onSurfaceDisabled: "rgba(227, 226, 230, 0.38)",
    backdrop: "rgba(45, 49, 56, 0.4)",
  },
};

const theme = {
  ...DefaultTheme,
  colors: customTheme.colors,
};

export default function Main() {
  return (
    <PaperProvider theme={theme}>
      <SafeAreaProvider>
        <App />
      </SafeAreaProvider>
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);

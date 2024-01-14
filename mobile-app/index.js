/**
 * @format
 */

import React from "react";
import {AppRegistry, useColorScheme} from "react-native";
import {MD3DarkTheme as DefaultTheme, PaperProvider} from "react-native-paper";
import {SafeAreaProvider} from "react-native-safe-area-context";
import App from "./App";
import {name as appName} from "./app.json";
import {customDarkTheme, customLightTheme} from "./customDarkTheme";

export default function Main() {
  const colorScheme = useColorScheme();
  const isDarkMode = !colorScheme || colorScheme === "dark";

  const theme = {
    ...DefaultTheme,
    colors: isDarkMode ? customDarkTheme.colors : customLightTheme.colors,
    dark: isDarkMode,
  };

  return (
    <PaperProvider theme={theme}>
      <SafeAreaProvider>
        <App />
      </SafeAreaProvider>
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);

import CheckBox from "@react-native-community/checkbox";
import React from "react";
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import {Colors} from "react-native/Libraries/NewAppScreen";
import {useImmer} from "use-immer";
import startCase from "lodash/fp/startCase";
import Form from "./Form.tsx";
import OctalOutput from "./OctalOutput.tsx";
import {
  Class,
  Permission,
  permissionsAllSelected,
  permissionsNoneSelected,
  SpecialPermission
} from "./permissions.ts";
import SymbolicOutput from "./SymbolicOutput.tsx";

function App(): React.JSX.Element {
  const [permissions, updatePermissions] = useImmer(permissionsNoneSelected);

  const isDarkMode = useColorScheme() === "dark";

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const handleSpecialChange = (
    permission: SpecialPermission,
    value: boolean,
  ): void => {
    updatePermissions(draft => {
      draft.special[permission] = value;
    });
  };

  const handleChange = (
    $class: Class,
    permission: Permission,
    value: boolean,
  ): void => {
    updatePermissions(draft => {
      if ($class !== "special") {
        draft[$class][permission] = value;
      }
    });
  };

  const handleSelectAll = (): void => updatePermissions(permissionsAllSelected);
  const handleDeselectAll = (): void => updatePermissions(permissionsNoneSelected);

  const allDeselected = Object.values(permissions)
    .flatMap(classPermissions => Object.values(classPermissions))
    .every(x => !x);

  const allSelected = Object.values(permissions)
    .flatMap(classPermissions => Object.values(classPermissions))
    .every(x => x);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={[styles.mainContainer, {
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }]}>
          <View style={{rowGap: 8}}>
            <Text style={[styles.title, {textAlign: "center"}]}>Unix Permissions Calculator</Text>
            <Text style={[styles.description, {textAlign: "center"}]}>
              Check the required permissions and the octal and symbolic notations
              will be updated accordingly.
            </Text>
          </View>
          <View style={{rowGap: 10}}>
            <ScrollView horizontal={true}>
              <Form
                permissions={permissions}
                handleSpecialChange={handleSpecialChange}
                handleChange={handleChange}
              />
            </ScrollView>
            <View style={styles.buttonContainer}>
              <Button
                title="Select all"
                onPress={handleSelectAll}
                disabled={allSelected}
              />
              <Button
                title="Deselect all"
                onPress={handleDeselectAll}
                disabled={allDeselected}
              />
            </View>
          </View>
          <OctalOutput permissions={permissions} />
          <SymbolicOutput permissions={permissions} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    rowGap: 40,
    paddingHorizontal: 24,
    paddingVertical: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
  },
  description: {
    fontSize: 18,
    fontWeight: "400",
  },
  buttonContainer: {
    flexDirection: "row",
    alignSelf: "center",
    gap: 10,
  },
});

export default App;

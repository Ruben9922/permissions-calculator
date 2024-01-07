import { produce } from "immer";
import React from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import {Appbar, Button, Text, useTheme} from "react-native-paper";
import {useImmer} from "use-immer";
import Form from "./Form.tsx";
import OctalOutput from "./OctalOutput.tsx";
import {
  Class,
  Permission,
  permissionsAllSelected,
  permissionsNoneSelected,
  SpecialPermission,
} from "./permissions.ts";
import SymbolicOutput from "./SymbolicOutput.tsx";
import { SafeAreaView } from "react-native-safe-area-context";

function App(): React.JSX.Element {
  const [permissions, updatePermissions] = useImmer(permissionsNoneSelected);

  const theme = useTheme();
  const backgroundStyle = {backgroundColor: theme.colors.background};

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
    <SafeAreaView style={[backgroundStyle, {flex: 1}]}>
      <StatusBar
        barStyle={theme.dark ? "light-content" : "dark-content"}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Appbar.Header elevated={true}>
        <Appbar.Content title="Unix Permissions Calculator" />
      </Appbar.Header>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View style={styles.mainContainer}>
          <View style={{rowGap: 8}}>
            <Text variant="bodyLarge" style={{textAlign: "center"}}>
              Check the required permissions and the octal and symbolic notations
              will be updated accordingly.
            </Text>
          </View>
          <View style={{rowGap: 10}}>
            <ScrollView horizontal={true} style={{alignSelf: "center"}}>
              <Form
                permissions={permissions}
                handleSpecialChange={handleSpecialChange}
                handleChange={handleChange}
              />
            </ScrollView>
            <View style={styles.buttonContainer}>
              <Button onPress={handleSelectAll} disabled={allSelected} mode="outlined">
                Select all
              </Button>
              <Button onPress={handleDeselectAll} disabled={allDeselected} mode="outlined">
                Deselect all
              </Button>
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
    flexDirection: "column",
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

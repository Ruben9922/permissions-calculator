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

type Class = "special" | "user" | "group" | "other";
type Permission = "read" | "write" | "execute";
type SpecialPermission = "setuid" | "setgid" | "stickyMode";
type Permissions = Omit<
  Record<Class, Record<Permission, boolean>>,
  "special"
> & {special: Record<SpecialPermission, boolean>};

function createPermissions(value: boolean): Permissions {
  const specialClass: Class = "special";
  const normalClasses: Class[] = ["user", "group", "other"];
  const normalPermissionArray: Permission[] = ["read", "write", "execute"];
  const specialPermissionArray: SpecialPermission[] = ["setuid", "setgid", "stickyMode"];

  const specialPermissions: Record<typeof specialClass, Record<SpecialPermission, boolean>> = {
    special: Object.assign({}, ...specialPermissionArray.map(permission => ({[permission]: value}))),
  };

  const normalPermissions: Partial<Omit<Record<Class, Record<Permission, boolean>>, "special">>[] = normalClasses
    .map<[Class, Permission[]]>($class => [$class, normalPermissionArray])
    .map<[Class, Record<Permission, boolean>]>(([$class, permissionArray]) => (
      [$class, Object.assign({}, ...permissionArray.map(permission => ({[permission]: value})))]
    ))
    .map<Partial<Omit<Record<Class, Record<Permission, boolean>>, "special">>>(([$class, classPermissions]) => ({
      [$class]: classPermissions,
    }));

  return Object.assign({}, specialPermissions, ...normalPermissions);
}

const permissionsNoneSelected: Permissions = createPermissions(false);
const permissionsAllSelected: Permissions = createPermissions(true);

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
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Text style={styles.sectionTitle}>Unix Permissions Calculator</Text>
          <Text style={styles.sectionTitle}>
            Check the required permissions and the octal and symbolic notations
            will be updated accordingly.
          </Text>
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
          <OctalOutput permissions={permissions} />
          <SymbolicOutput permissions={permissions} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

type CheckBoxWithTextProps = {
  value: boolean;
  text: string;
  onValueChange?: (value: boolean) => void;
};

function CheckBoxWithText({
  value,
  text,
  onValueChange,
}: CheckBoxWithTextProps): React.JSX.Element {
  return (
    <View style={checkBoxStyles.checkBoxContainer}>
      <CheckBox value={value} onValueChange={onValueChange} />
      <Text style={checkBoxStyles.label}>{text}</Text>
    </View>
  );
}

type FormProps = {
  permissions: Permissions;
  handleSpecialChange: (permission: SpecialPermission, value: boolean) => void;
  handleChange: ($class: Class, permission: Permission, value: boolean) => void;
};

function Form({
  permissions,
  handleSpecialChange,
  handleChange,
}: FormProps): React.JSX.Element {
  return (
    <View style={formStyle.container}>
      {Object.entries(permissions).map(([$class, classPermissions]) => (
        <View style={formStyle.column} key={$class}>
          <Text>{startCase($class)}</Text>
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

type OctalOutputProps = {
  permissions: Permissions;
};

function OctalOutput({permissions}: OctalOutputProps): React.JSX.Element {
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
    <View>
      <Text>Octal</Text>
      <Text>{octal}</Text>
      <Text>
        Example: <Text>chmod {octal} /path/to/file</Text>
      </Text>
    </View>
  );
}

type SymbolicOutputProps = {
  permissions: Permissions;
};

function SymbolicOutput({permissions}: SymbolicOutputProps): React.JSX.Element {
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
    <View>
      <Text>Symbolic Notation</Text>
      <Text>{symbolic}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
  },
  highlight: {
    fontWeight: "700",
  },
  buttonContainer: {
    flexDirection: "row",
    alignSelf: "center",
  },
});

const checkBoxStyles = StyleSheet.create({
  checkBoxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    margin: 0,
  },
});

const formStyle = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  column: {
    flexDirection: "column",
    flex: 1,
  },
});

export default App;

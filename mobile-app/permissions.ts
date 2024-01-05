export type Class = "special" | "user" | "group" | "other";
export type Permission = "read" | "write" | "execute";
export type SpecialPermission = "setuid" | "setgid" | "stickyMode";
export type Permissions = Omit<
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

export const permissionsNoneSelected: Permissions = createPermissions(false);
export const permissionsAllSelected: Permissions = createPermissions(true);

export var Permissions;
(function (Permissions) {
    Permissions[Permissions["None"] = 0] = "None";
    Permissions[Permissions["VIEW_DETAILS_PRODUCTS"] = 1] = "VIEW_DETAILS_PRODUCTS";
    Permissions[Permissions["VIEW_SALES"] = 2] = "VIEW_SALES";
    Permissions[Permissions["EDIT_PRODUCTS"] = 4] = "EDIT_PRODUCTS";
    Permissions[Permissions["MANAGE_CLIENTS"] = 8] = "MANAGE_CLIENTS";
    Permissions[Permissions["MANAGE_EMPLOYEES"] = 15] = "MANAGE_EMPLOYEES"; // 1111
})(Permissions || (Permissions = {}));

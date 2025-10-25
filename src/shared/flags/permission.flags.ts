export enum Permissions {
    None = 0,
    VIEW_DETAILS_PRODUCTS = 1 << 0, // 0001
    VIEW_SALES = 1 << 1,     // 0010
    EDIT_PRODUCTS = 1 << 2,    // 0100
    MANAGE_CLIENTS = 1 << 3,   // 1000
    MANAGE_EMPLOYEES = ~(~0 << 4)   // 1111
}
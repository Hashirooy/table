import type { SelectOption } from "../Select/Select";




export type TableData = {
  id?:string;
  properties?: Properties | undefined
}

export type Properties = {
  name?: string;
  status?: string;
}

export type Order = TableData & {
  id?: string;
  properties?: Properties & {
    order: string;
    customer?: string;
    product?: string;
    quantity?: string;
    price?: string;
  }
}

export type User = TableData &{
  id?: string;
  properties?: Properties & {
    email?: string;
    password?: string;
    isActivated?: boolean;
    roles?: string[];
    department?: string;
    date?: string;
    role?: string;
    
  }
}

export type SortColumn = "asc" | "desc";

export const tableFilterOptions: {
  users: SelectOption[];
  orders: SelectOption[];
  tasks: SelectOption[];
} = {
  users: [
    { value: "active", content: "Active" },
    { value: "away", content: "Away" },
    { value: "inactive", content: "Inactive" },
    { value: "", content: "All" },
  ],
  orders: [
    { value: "paid", content: "Paid" },
    { value: "pending", content: "Pending" },
    { value: "cancelled", content: "Cancelled" },
    { value: "", content: "All" },
  ],
  tasks: [
    { value: "in_progress", content: "In progress" },
    { value: "todo", content: "Todo" },
    { value: "done", content: "Done" },
    { value: "", content: "All" },
  ],
};

export const TableSchemaUsers = [
  {
    id: 1,
    name: "User",
    description: "Table 1 description",
    route: "properties.name",
  },
  {
    id: 2,
    name: "Email",
    description: "Table 2 description",
    route: "properties.email",
  },
  {
    id: 3,
    name: "Office",
    description: "Table 3 description",
    route: "properties.department",
  },
  {
    id: 4,
    name: "Role",
    description: "Table 4 description",
    route: "properties.role",
  },
  {
    id: 5,
    name: "Start date",
    description: "Table 5 description",
    route: "properties.date",
  },
  {
    id: 6,
    name: "Status",
    description: "Table 6 description",
    route: "properties.status",
  },
];

export const TableSchemaOrders = [
  {
    id: 1,
    name: "Order",
    description: "Table 1 description",
    route: "properties.order",
  },
  {
    id: 2,
    name: "Customer",
    description: "Table 2 description",
    route: "properties.customer",
  },
  {
    id: 3,
    name: "Product",
    description: "Table 3 description",
    route: "properties.product",
  },
  {
    id: 4,
    name: "Quantity",
    description: "Table 4 description",
    route: "properties.quantity",
  },
  {
    id: 5,
    name: "Price",
    description: "Table 5 description",
    route: "properties.price",
  },
  {
    id: 6,
    name: "Status",
    description: "Table 6 description",
    route: "properties.status",
  },
  {
    id: 7,
    name: "Name",
    description: "Table 7 description",
    route: "properties.name",
  },
];



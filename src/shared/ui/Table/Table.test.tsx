import "@testing-library/jest-dom/vitest";
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Table } from "./Table";
import { TableSchemaUsers } from "./type";
import { useTableQuery } from "../../helper/hooks/useTableQuery";
import type { User } from "../../../entities/User/model/types/userSchema";
import { screen } from "@testing-library/react";

function TableWithRouter() {
  const table = useTableQuery("table_1");
  const data: User[] = [
    {
      id: "1",
      properties: {
        name: "John Doe",
        email: "john.doe@example.com",
        department: "IT",
        role: "Developer",
        date: "2021-01-01",
        status: "active",
      },
    },
  ];
  return <Table data={data} tableSchema={TableSchemaUsers} table={table} />;
}

describe("Table", () => {
  it("should render", () => {
    render(
      <MemoryRouter>
        <TableWithRouter />
      </MemoryRouter>,
    );
    expect(screen.getByRole("heading", { name: /table/i })).toBeInTheDocument();
  });
});

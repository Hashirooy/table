import "@testing-library/jest-dom/vitest";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Table } from "./Table";
import { TableSchemaUsers, type TableData } from "./type";

const tableMock = {
  get: (_key: string, defaultValue?: string) => defaultValue,
  set: vi.fn(),
  params: new URLSearchParams(),
};

function renderTable(props: { data: TableData[]; isLoading?: boolean }) {
  return render(
    <Table
      data={props.data}
      tableSchema={TableSchemaUsers}
      table={tableMock}
      isLoading={props.isLoading}
    />,
  );
}

describe("Table", () => {
  it("should render", () => {
    const data: TableData[] = [
      {
        id: "1",
        properties: {
          name: "John Doe",
          status: "active",
        },
      },
    ];
    renderTable({ data, isLoading: false });
    expect(screen.getByRole("heading", { name: /table/i })).toBeInTheDocument();
  });

  it("not found", () => {
    renderTable({ data: [], isLoading: false });
    expect(screen.getByText(/no data found/i)).toBeInTheDocument();
  });

  it("data is not correct", () => {
    const data: TableData[] = [
      {
        id: "64a0f0e0f0f0f0f0f0f0f205",
        // @ts-ignore
        title: "Настройка алертов Grafana",
        status: "in_progress",
        date: "2025-01-18T00:00:00.000Z",
        category: "infra",
        assignee: ["64a0f0e0f0f0f0f0f0f0f104", "64a0f0e0f0f0f0f0f0f0f10a"],
        priority: "medium",
        description: "CPU, память, ошибки 5xx.",
      },
    ];

    renderTable({ data, isLoading: false });
    expect(screen.getByText(/Data not matching schema/i)).toBeInTheDocument();
  });

  it("table is loading", () => {
    const data: TableData[] = [
      {
        id: "64a0f0e0f0f0f0f0f0f0f205",
        // @ts-ignore
        title: "Настройка алертов Grafana",
        status: "in_progress",
        date: "2025-01-18T00:00:00.000Z",
        category: "infra",
        assignee: ["64a0f0e0f0f0f0f0f0f0f104", "64a0f0e0f0f0f0f0f0f0f10a"],
        priority: "medium",
        description: "CPU, память, ошибки 5xx.",
      },
    ];

    renderTable({ data, isLoading: true });
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });
});

import { useEffect, useState } from "react";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import cls from "./Table.module.scss";
import { Select } from "../Select/Select";
import { filteredFunc } from "../../helper/serach";
import { TableContent } from "./TableContent";
import {
  tableFilterOptions,
  TableSchemaOrders,
  TableSchemaUsers,
  type Order,
  type SortColumn,
} from "./type";
import { filteredByStatusFunc } from "../../helper/filter";
import { sortFunc } from "../../helper/sort";

import { useDebounce } from "../../helper/hooks/useDebounce";
import { Pagination } from "../Pagination/Pagination";
import type { useTableQuery } from "../../helper/hooks/useTableQuery";

export interface TableColumn {
  id: number;
  name: string;
  description: string;
}

export interface TableRow {
  id: number;
  name: string;
  position: string;
  office: string;
  age: number;
  startDate: string;
  salary: number;
}

interface TableProps {
  data: {}[];
  tableSchema: typeof TableSchemaUsers | typeof TableSchemaOrders;
  table: ReturnType<typeof useTableQuery>;
}

const PAGE_SIZE = "5";

export const Table = (props: TableProps) => {
  const { data, tableSchema, table } = props;
  const [search, setSearch] = useState(
    (table.get("search", "") as string) || "",
  );
  const [filteredData, setFilteredData] = useState(data);
  const [statusFilter, setStatusFilter] = useState(
    (table.get("statusFilter", "") as string) || "",
  );
  const [sortColumn, setSortColumn] = useState<SortColumn>(
    (table.get("sortColumn", "asc") as SortColumn) || "asc",
  );
  const [page, setPage] = useState(
    Number(table.get("page", "1") as string) || 1,
  );
  const [pageSize, setPageSize] = useState<number>(Number(PAGE_SIZE));

  const totalPages = Math.ceil(filteredData.length / Number(pageSize));

  const paginatedData = filteredData.slice(
    (page - 1) * Number(pageSize),
    page * Number(pageSize),
  );

  const handlePageSizeChange = (value: string) => {
    setPageSize(parseInt(value));
    setPage(1);
    table.set({ pageSize: value, page: "1" });
  };

  const inputChangeHandler = useDebounce((value: string) => {
    setSearch(value);
    if (search === "") {
      setFilteredData(data);
    }
    setFilteredData(filteredFunc(data, value));
    table.set({ search: value });
  }, 500);

  const statusFilterChangeHandler = (value: string) => {
    setStatusFilter(value);
    if (statusFilter === "") {
      setFilteredData(data);
    }
    setFilteredData(filteredByStatusFunc(data, value));
    table.set({ statusFilter: value });
  };

  const clearStatusFilterHandler = () => {
    setStatusFilter("");
    setFilteredData(data);
    table.set({ statusFilter: "" });
  };

  const sortColumnOnClick = (column: string) => {
    setSortColumn((prev) => (prev === "asc" ? "desc" : "asc"));
    console.log(column);
    setFilteredData(sortFunc(data, column, sortColumn));
    table.set({ sortColumn: sortColumn });
  };

  useEffect(() => {
    const urlSearch = (table.get("search", "") as string) || "";
    const urlStatus = (table.get("statusFilter", "") as string) || "";
    const urlOrderRaw =
      (table.get("sortOrder", "") as string) ||
      (table.get("sortColumn", "") as string) ||
      "asc";
    const urlSortOrder: SortColumn = urlOrderRaw === "desc" ? "desc" : "asc";
    const urlSortField = (table.get("sortField", "") as string) || "";
    const urlPage = Number(table.get("page", "1")) || 1;

    setSearch(urlSearch);
    setStatusFilter(urlStatus);
    setSortColumn(urlSortOrder);

    let next = data;
    if (urlStatus) next = filteredByStatusFunc(next, urlStatus);
    if (urlSearch) next = filteredFunc(next, urlSearch);
    if (urlSortField) next = sortFunc(next, urlSortField, urlSortOrder);
    setFilteredData(next);
    setPage(urlPage);
  }, [data, table.params.toString()]);

  return (
    <>
      <div className={cls.tableContainer}>
        <div className={cls.tableTitle}>
          <h3>Table</h3>
        </div>
        <div className={cls.tableOptions}>
          <div className={cls.tableOptionsLeft}>
            Show
            <Select
              options={[
                { value: "5", content: "5" },
                { value: "10", content: "10" },
                { value: "20", content: "20" },
                { value: "30", content: "30" },
              ]}
              value={pageSize.toString()}
              onChange={handlePageSizeChange}
            />{" "}
            entries
            <div className={cls.tableFilter}>
              Filter by:
              <Select
                options={
                  tableFilterOptions[
                    tableSchema === TableSchemaUsers ? "users" : "orders"
                  ]
                }
                value={statusFilter == "" ? "" : statusFilter}
                onChange={statusFilterChangeHandler}
              />
              <Button
                onClick={clearStatusFilterHandler}
                size="medium"
                theme="primary"
                circle={false}
              >
                Clear
              </Button>
            </div>
          </div>
          <div className={cls.tableOptionsRight}>
            <Input
              type="text"
              placeholder="Search"
              value={search}
              onChange={inputChangeHandler}
            />
          </div>
        </div>
        <table className={cls.table}>
          <TableContent
            data={paginatedData}
            tableSchema={tableSchema}
            onClick={sortColumnOnClick}
          />
        </table>
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </>
  );
};

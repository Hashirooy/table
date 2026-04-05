import { useState } from "react";
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
import type { User } from "../../../entities/User/model/types/userSchema";

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
}

export const Table = (props: TableProps) => {
  const { data, tableSchema } = props;
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState(data);
  const [showEntries, setShowEntries] = useState("10");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortColumn, setSortColumn] = useState<SortColumn>("asc");

  const inputChangeHandler = (value: string) => {
    setSearch(value);
    if (search === "") {
      setFilteredData(data);
    }
    setFilteredData(filteredFunc(data, value));
  };

  const statusFilterChangeHandler = (value: string) => {
    setStatusFilter(value);
    if (statusFilter === "") {
      setFilteredData(data);
    }
    setFilteredData(filteredByStatusFunc(data, value));
  };

  const clearStatusFilterHandler = () => {
    setStatusFilter("");
    setFilteredData(data);
  };

  const sortColumnOnClick = (column: string) => {
    setSortColumn((prev) => (prev === "asc" ? "desc" : "asc"));
    console.log(column);
    setFilteredData(sortFunc(data, column, sortColumn));
  };

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
                { value: "10", content: "10" },
                { value: "20", content: "20" },
                { value: "30", content: "30" },
              ]}
              value={showEntries}
              onChange={setShowEntries}
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
            data={filteredData}
            tableSchema={tableSchema}
            onClick={sortColumnOnClick}
          />
        </table>
      </div>
    </>
  );
};

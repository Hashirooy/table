import cls from "./Table.module.scss";
import ArrowIcon from "../../assets/Icons/arrow.svg";
import { TableSchemaOrders, TableSchemaUsers } from "./type";
import { useState } from "react";

interface TableContentProps {
  data: {}[];
  tableSchema: typeof TableSchemaUsers | typeof TableSchemaOrders;
  onClick: (column: string) => void;
}

export const TableContent = (props: TableContentProps) => {
  const { data, tableSchema, onClick } = props;
  /** Какая колонка показывает «развёрнутую» стрелку; только одна за раз */
  const [openColumnId, setOpenColumnId] = useState<number | null>(null);

  const getValueByPath = (obj: any, path: string) => {
    return path.split(".").reduce((acc, key) => acc?.[key], obj);
  };
  const handleSortColumn = (column: string) => {
    onClick(column);
  };
  return (
    <>
      <thead className={cls.tableHead}>
        <tr className={cls.tableRow}>
          {tableSchema.map((col) => (
            <th key={col.id} className={cls.tableCell} scope="col">
              {col.name}
              <img
                src={ArrowIcon}
                className={
                  cls.arrow +
                  " " +
                  (openColumnId === col.id ? cls.open : cls.closed)
                }
                alt=""
                onClick={() => {
                  setOpenColumnId((prev) => (prev === col.id ? null : col.id));
                  handleSortColumn(col.name);
                }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setOpenColumnId((prev) =>
                      prev === col.id ? null : col.id,
                    );
                    handleSortColumn(col.name);
                  }
                }}
              />
            </th>
          ))}
        </tr>
      </thead>
      <tbody className={cls.tableBody}>
        {data.length ? (
          data.map((item: any, index: number) => (
            <tr key={index} className={cls.tableRow}>
              {tableSchema.map((col: any) => (
                <td key={col.id} className={cls.tableCell}>
                  {getValueByPath(item, col.route)}
                </td>
              ))}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={tableSchema.length} className={cls.tableCell}>
              No data
            </td>
          </tr>
        )}
      </tbody>
    </>
  );
};

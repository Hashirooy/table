import cls from "./Table.module.scss";

import { TableSchemaOrders, TableSchemaUsers } from "./type";

interface TableContentProps {
  data: {}[];
  tableSchema: typeof TableSchemaUsers | typeof TableSchemaOrders;
}

export const TableContent = (props: TableContentProps) => {
  const { data, tableSchema } = props;

  const getValueByPath = (obj: any, path: string) => {
    return path.split(".").reduce((acc, key) => acc?.[key], obj);
  };
  return (
    <>
      <thead className={cls.tableHead}>
        <tr className={cls.tableRow}>
          {tableSchema.map((col) => (
            <th key={col.id} className={cls.tableCell} scope="col">
              {col.name}
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

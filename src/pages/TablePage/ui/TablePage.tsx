import { Table } from "../../../shared/ui/Table/Table";
import { useEffect, useState } from "react";
import { fetchAllUsers } from "../models/services/fechAllUsers";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../app/providers/StoreProviders/config/hooks";
import {
  getTableError,
  getTableIsLoading,
  getTableUsers,
} from "../models/selectors";
import {
  TableSchemaOrders,
  TableSchemaUsers,
  type Order,
} from "../../../shared/ui/Table/type";
import styles from "./TablePage.module.scss";

const TablePage = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(getTableIsLoading);
  const error = useAppSelector(getTableError);
  const users = useAppSelector(getTableUsers);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    dispatch(fetchAllUsers());
    const fetchOrders = async () => {
      const response = await fetch("/api/orders");
      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }
      const data = await response.json();
      setOrders(data);
    };
    fetchOrders();
  }, [dispatch]);

  if (isLoading || orders.length === 0) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.tablePage}>
      <Table data={users} tableSchema={TableSchemaUsers} />
      <Table data={orders} tableSchema={TableSchemaOrders} />
    </div>
  );
};

export default TablePage;

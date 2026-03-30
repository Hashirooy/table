import { Table } from "../../../shared/ui/Table/Table";
import { useEffect } from "react";
import { fetchAllUsers } from "../models/services/fechAllUsers";
import { useAppDispatch, useAppSelector } from "../../../app/providers/StoreProviders/config/hooks";
import { getTableError, getTableIsLoading, getTableUsers } from "../models/selectors";

const TablePage = () => {
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector(getTableIsLoading);
    const error = useAppSelector(getTableError);
    const users = useAppSelector(getTableUsers);
    console.log(users);

    useEffect(() => {
        dispatch(fetchAllUsers());
    }, [dispatch]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }


    return (<Table users={users} tableType="users" />);
}

export default TablePage;
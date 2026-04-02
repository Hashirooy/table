import { Table } from "../../../shared/ui/Table/Table";
import { useEffect, useState } from "react";
import { fetchAllUsers } from "../models/services/fechAllUsers";
import { useAppDispatch, useAppSelector } from "../../../app/providers/StoreProviders/config/hooks";
import { getTableError, getTableIsLoading, getTableUsers } from "../models/selectors";

//  
// Поиск выносим на уровень feature
// 
const TablePage = () => {
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector(getTableIsLoading);
    const error = useAppSelector(getTableError);
    const users = useAppSelector(getTableUsers);
    const [searchQuery, setSearchQuery] = useState('')
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

    // Поиск и condition - фича
    return (<Table users={users.filter(condition)} tableType="users" onSearch={(value) => setSearchQuery(value)} />);
}

export default TablePage;
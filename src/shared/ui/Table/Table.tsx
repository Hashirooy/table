import { useEffect, useState } from 'react';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import cls from './Table.module.scss';
import { Select } from '../Select/Select';
// Shared может тольо экспортировать, никаких импортов
import type { User } from '../../../entities/User/model/types/userSchema';
import { filteredUsersFunc } from '../../helper/serach';
// import { TableSchema } from '../../../pages/TablePage/models/types/tableSchema';


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

// Есть зависимость от конкретной сущности 
interface TableProps {
    users: User[];
    tableType: 'users' | 'orders';
}

export const Table = ({ users, tableType, onSearch }: TableProps) => {
    const [search, setSearch] = useState('');
    const [filteredUsers, setFilteredUsers] = useState(users);
    const [showEntries, setShowEntries] = useState('10');


    const inputChangeHandler = (value: string) => {
        // нужен дебаунс
        setSearch(value);
        console.log(value)
        if (search === '') {
            setFilteredUsers(users);
        }
        setFilteredUsers(filteredUsersFunc(users, value));
    };

    useEffect(() => {
        console.log(filteredUsers)
    }, [filteredUsers])


    return (
        <>
            {tableType === 'users' && <div className={cls.tableContainer}>
                <div className={cls.tableTitle}>
                    <h3>Table</h3>
                </div>
                <div className={cls.tableOptions}>
                    <div className={cls.tableOptionsLeft}>
                        Show<Select options={[{ value: '10', content: '10' }, { value: '20', content: '20' }, { value: '30', content: '30' }]} value={showEntries} onChange={setShowEntries} /> entries
                    </div>
                    <div className={cls.tableOptionsRight}>
                        <Input type="text" placeholder="Search" value={search} onChange={onSearch} />
                    </div>
                </div>
                <table className={cls.table}>
                    <thead className={cls.tableHead}>
                        <tr className={cls.tableRow}>
                            {tableColumnsUsers.map((col) => (
                                <th key={col.id} className={cls.tableCell} scope="col">
                                    {col.name}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className={cls.tableBody}>
                        {filteredUsers ? filteredUsers.map((row) => (
                            <tr key={row.id} className={cls.tableRow}>
                                <td className={cls.tableCell}>{row.name}</td>
                                <td className={cls.tableCell}>{row.email}</td>
                                <td className={cls.tableCell}>{row.department}</td>
                                <td className={cls.tableCell}>{row.role}</td>
                                <td className={cls.tableCell}>{row.date}</td>
                                <td className={cls.tableCell}>{row.status}</td>
                            </tr>
                        )) : <tr><td colSpan={6} className={cls.tableCell}>No data</td></tr>}
                    </tbody>
                </table>
            </div>}
        </>
    );
};

// // в отдельный файл 
// // Колонки заточены под юзера (Колонки должны приниматься как пар-тр)
export const tableColumnsUsers: TableColumn[] = [
    { id: 1, name: 'User', description: 'Table 1 description' },
    { id: 2, name: 'Email', description: 'Table 2 description' },
    { id: 3, name: 'Office', description: 'Table 3 description' },
    { id: 4, name: 'Role', description: 'Table 4 description' },
    { id: 5, name: 'Start date', description: 'Table 5 description' },
    { id: 6, name: 'Status', description: 'Table 6 description' },
];


// const User = {
//     properties: {
//         name: '',
//         date: "",
//         id: "",
//         email: ""
//     }
// }

// export const TableSchema = [
//     { id: 1, name: 'User', description: 'Table 1 description', route: "properties.name" },
//     { id: 2, name: 'Email', description: 'Table 2 description' },
//     { id: 3, name: 'Office', description: 'Table 3 description' },
//     { id: 4, name: 'Role', description: 'Table 4 description' },
//     { id: 5, name: 'Start date', description: 'Table 5 description' },
//     { id: 6, name: 'Status', description: 'Table 6 description' },
// ]


// const componnt = (schema = TableSchema, data[]) => {
//     return (
//         {
//             data.map(item => {
//                 schema.map((row) => {
//                     <>
//                         {{ row.name }}: {{ item[row.route] }}
//                     </>
//                 })
//             })

//         }
//     )
// }
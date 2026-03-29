import { useState } from 'react';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import cls from './Table.module.scss';
import { Select } from '../Select/Select';
import type { User } from '../../../entities/User/model/types/UserSchema';

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
    users: User[];
    tableType: 'users' | 'tasks';
}

export const Table = ({ users, tableType }: TableProps) => {
    const [search, setSearch] = useState('');
    const [showEntries, setShowEntries] = useState('10');
    return (
        <div className={cls.tableContainer}>
            <div className={cls.tableTitle}>
                <h3>Table</h3>
            </div>
            <div className={cls.tableOptions}>
                <div className={cls.tableOptionsLeft}>
                    Show<Select options={[{ value: '10', content: '10' }, { value: '20', content: '20' }, { value: '30', content: '30' }]} value={showEntries} onChange={setShowEntries} /> entries
                </div>
                <div className={cls.tableOptionsRight}>
                    <Input type="text" placeholder="Search" value={search} onChange={setSearch} />
                </div>
            </div>
            <table className={cls.table}>
                <thead className={cls.tableHead}>
                    <tr className={cls.tableRow}>
                        {tableColumns.map((col) => (
                            <th key={col.id} className={cls.tableCell} scope="col">
                                {col.name}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className={cls.tableBody}>
                    {users.map((row) => (
                        <tr key={row.id} className={cls.tableRow}>
                            <td className={cls.tableCell}>{row.name}</td>
                            <td className={cls.tableCell}>{row.email}</td>
                            <td className={cls.tableCell}>{row.department}</td>
                            <td className={cls.tableCell}>{row.role}</td>
                            <td className={cls.tableCell}>{row.date}</td>
                            <td className={cls.tableCell}>{row.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};


export const tableColumns: TableColumn[] = [
    { id: 1, name: 'User', description: 'Table 1 description' },
    { id: 2, name: 'Position', description: 'Table 2 description' },
    { id: 3, name: 'Office', description: 'Table 3 description' },
    { id: 4, name: 'Age', description: 'Table 4 description' },
    { id: 5, name: 'Start date', description: 'Table 5 description' },
    { id: 6, name: 'Salary', description: 'Table 6 description' },
];


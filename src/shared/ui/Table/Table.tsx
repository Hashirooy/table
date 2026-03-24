import { useState } from 'react';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import cls from './Table.module.scss';

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


export const Table = () => {
    // fetch

    const [search, setSearch] = useState('');
    return (
        <div className={cls.tableContainer}>
            <div className={cls.tableTitle}>
                <h3>Table</h3>
            </div>
            <div className={cls.tableOptions}>
                <div className={cls.tableOptionsLeft}>
                    Show<Button size="medium" theme="primary" circle={false}>?</Button> entries
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
                    {tableBody.map((row) => (
                        <tr key={row.id} className={cls.tableRow}>
                            <td className={cls.tableCell}>{row.name}</td>
                            <td className={cls.tableCell}>{row.position}</td>
                            <td className={cls.tableCell}>{row.office}</td>
                            <td className={cls.tableCell}>{row.age}</td>
                            <td className={cls.tableCell}>{row.startDate}</td>
                            <td className={cls.tableCell}>{row.salary}</td>
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

export const tableBody: TableRow[] = [
    {
        id: 1,
        name: 'John Doe',
        position: 'Software Engineer',
        office: 'New York',
        age: 30,
        startDate: '2021-01-01',
        salary: 100000,
    },
    {
        id: 2,
        name: 'Jane Smith',
        position: 'Software Engineer',
        office: 'New York',
        age: 30,
        startDate: '2021-01-01',
        salary: 100000,
    },
    {
        id: 3,
        name: 'Jim Beam',
        position: 'Software Engineer',
        office: 'New York',
        age: 30,
        startDate: '2021-01-01',
        salary: 100000,
    },
    {
        id: 4,
        name: 'John Doe',
        position: 'Software Engineer',
        office: 'New York',
        age: 30,
        startDate: '2021-01-01',
        salary: 100000,
    },
    {
        id: 5,
        name: 'John Doe',
        position: 'Software Engineer',
        office: 'New York',
        age: 30,
        startDate: '2021-01-01',
        salary: 100000,
    },
    {
        id: 6,
        name: 'John Doe',
        position: 'Software Engineer',
        office: 'New York',
        age: 30,
        startDate: '2021-01-01',
        salary: 100000,
    },
];
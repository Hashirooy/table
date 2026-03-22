import { useState } from 'react';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import cls from './Header.module.scss'
import { AccountBar } from '../../../widgets/AccountBar/Accountbar';

export const Header = () => {

  const [search, setSearch] = useState("");
  const onChangeSearch = (value: string) => {
    setSearch(value);
  }
  return <div className={cls.header}>
    <div className={cls.headerContent}>
      <Button onClick={() => {}} size="medium" theme="primary" circle={false}>?</Button>
      <Input type="text" placeholder="Search" value={search} onChange={onChangeSearch} />
    </div>
    <div className={cls.headerActions}>
      <Button onClick={() => {}} size="medium" theme="primary" circle={true}>?</Button>
      <Button onClick={() => {}} size="medium" theme="primary" circle={true}>?</Button>
      <AccountBar text="John Doe" avatar="https://via.placeholder.com/150"/>
    </div>
  </div>;
};
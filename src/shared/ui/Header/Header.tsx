import { useEffect, useState } from 'react';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import cls from './Header.module.scss'
import { AccountBar } from '../../../widgets/AccountBar/Accountbar';

  interface HeaderProps {
    isMediumScreen: boolean;
    onClickHeaderActions: () => void;
    onClickOpen: () => void;
  }

export const Header = ({isMediumScreen, onClickHeaderActions, onClickOpen}: HeaderProps) => {
 
  const [search, setSearch] = useState("");
  const onChangeSearch = (value: string) => {
    setSearch(value);
  }
  const onClickHeaderActionsHandler = () => {
    onClickHeaderActions();
  }
  const onClickOpenHandler = () => {
    onClickOpen();
  }
  return <div className={cls.header}> 
    <div className={cls.headerContent}>
      <Button onClick={onClickOpenHandler} size="medium" theme="primary" circle={false}>?</Button>
      { isMediumScreen ? <Input type="text" placeholder="Search" value={search} onChange={onChangeSearch} /> : <></>}
    </div>
    <div className={cls.headerActions}>
     { isMediumScreen ? <><Button onClick={() => {}} size="medium" theme="primary" circle={true}>?</Button>
      <Button onClick={() => {}} size="medium" theme="primary" circle={true}>?</Button>
      <AccountBar text="John Doe" avatar="https://via.placeholder.com/150"/></> : <Button onClick={onClickHeaderActionsHandler} size="medium" theme="primary" circle={true}>?</Button>}
    </div>
  </div>;
};
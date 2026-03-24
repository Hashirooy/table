import { Link } from 'react-router-dom';
import cls from './SideBarItem.module.scss'
import ArrowIcon from '../../assets/Icons/arrow.svg';

interface SideBarItemProps {
    items: SidebarItemType;
    onClick?: () => void;
}

 interface SidebarItemType {
    path: string;
    text: string;
    icon: string;
    authOnly?: boolean;
    to: string;
}

export const SideBarItem = (props: SideBarItemProps) => {
    const { items } = props;

    return <div className={cls.sideBarItem}>
            <Link to={items.to} className={cls.link}>
            <span className={cls.iconContainer}>
                <img src={items.icon} alt={items.text} />
                <span>{items.text}</span>
            </span>
                
                <img src={ArrowIcon} alt="arrow" />
        </Link>
    </div>;
}
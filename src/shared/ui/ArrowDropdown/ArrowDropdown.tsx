import cls from './ArrowDropdown.module.scss';
import ArrowIcon from '../../assets/Icons/arrow.svg';
import { useState } from 'react';

interface ArrowDropdownItem {
    text: string;
    href: string;
}

interface ArrowDropdownProps {
    items: ArrowDropdownItem[];
}

export const ArrowDropdown = (props: ArrowDropdownProps) => {
    const { items } = props;
    const [isOpen, setIsOpen] = useState(false);
    return(
        <div className={cls.arrowDropdownWrapper}>
               <img
                src={ArrowIcon}
                className={cls.arrow + ' ' + (isOpen ? cls.open : cls.closed)}
                alt="arrow"
                onClick={() => setIsOpen((v) => !v)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setIsOpen((v) => !v);
                    }
                }}
            />
            {isOpen && (
                <div className={cls.arrowDropdownContent}>
                    {items.map((item) => (
                        <a className={cls.arrowDropdownItem} href={item.href} key={item.text}>{item.text}</a>
                    ))}
                </div>
            )}
        </div>
    )
}
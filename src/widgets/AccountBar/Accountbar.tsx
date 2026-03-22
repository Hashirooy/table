import cls from './AccountBar.module.scss'
import ArrowIcon from '../../shared/assets/Icons/arrow.svg';
import { useState } from 'react';

interface AccountBarProps {
    text: string;
    avatar: string;
}

export const AccountBar = (props: AccountBarProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const { text, avatar } = props;
    return (
        <div className={cls.accountBar}>
            <img className={cls.avatar} src={avatar} alt="avatar" />
            <p>{text}</p>
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
        </div>
    )
}
import cls from './Button.module.scss'
import { classNames, type Mods } from '../../helper/ClassNames/ClassNames';

interface ButtonProps {
    children?: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    type?: ButtonType;
    size?: ButtonSize;
    theme?: ButtonVariant;
    circle?: boolean;
}

type ButtonSize = 'small' | 'medium' | 'large';
type ButtonVariant = 'primary' | 'secondary' | 'tertiary';
type ButtonType = 'button' | 'submit' | 'reset';


export const Button = (props: ButtonProps) => {

    const { children, onClick, disabled, type, size, theme, circle } = props;
    const mods: Mods = {
        [cls[theme as ButtonVariant]]: true,
        [cls.circle]: circle,
        [cls[size as ButtonSize]]: true,
        [cls.disabled]: disabled,
    };

    const onClickHandler = () => {
        if (disabled) return;
        onClick?.();
    }

    return <button className={classNames(cls.button, mods, [])} onClick={onClickHandler} disabled={disabled} type={type ?? 'button'}>{children}</button>;
};
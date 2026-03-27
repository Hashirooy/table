import { classNames } from "../../helper/ClassNames/ClassNames";
import cls from './Select.module.scss';

export interface SelectOption {
    value: string;
    content: string;
}

interface SelectProps {
    className?: string;
    label?: string;
    options?: SelectOption[];
    value?: string;
    onChange?: (value: string) => void;
    readonly?: boolean;
}


export const Select = (props: SelectProps) => {
    const { className, label, options, value, onChange, readonly } = props;

    const onChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onChange?.(e.target.value);
    }

    const optionsList = options?.map((option) => (
        <option key={option.value} value={option.value}>{option.content}</option>
    ));

    return (
        <div className={classNames(cls.Wrapper, {}, [className])}>
        {label && (
            <span className={cls.label}>
                {`${label}>`}
            </span>
        )}
        <select
            disabled={readonly}
            className={cls.select}
            value={value}
            onChange={onChangeHandler}
        >
            {optionsList}
        </select>
    </div>
    )
}
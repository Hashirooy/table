import cls from './Input.module.scss'


interface InputProps {
    type: string;
    placeholder: string;
    value: string | number;
    onChange: (e: string) => void;
}

export const Input = (props: InputProps) => {
    const { type, placeholder, value, onChange } = props;
    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    }
    return <input className={cls.input} type={type} placeholder={placeholder} value={value} onChange={onChangeHandler} />;
};
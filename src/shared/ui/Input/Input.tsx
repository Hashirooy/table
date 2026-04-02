import cls from './Input.module.scss'
import React, { memo, useEffect, useRef, useState,
} from 'react';


interface InputProps  {
    type: string;
    placeholder: string;
    value: string | number;
    onChange?: (value: string) => void;
    onBlur?: (value: string) => void;
}

export const Input = (props: InputProps) => {
    const { type, placeholder, value, onChange, onBlur } = props;
    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
    }
    const onBlurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
        onBlur?.(e.target.value);
    }
    return <input className={cls.input} type={type} placeholder={placeholder} value={value} onChange={onChangeHandler} onBlur={onBlurHandler} />;
};
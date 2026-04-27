"use client"

import styles from "./Input.module.css"
import { useId, type FocusEventHandler, type KeyboardEventHandler } from "react";

interface InputProps {
    title: string;
    placeholder?: string;
    value: string | number;
    onChange?: (val: string | number)=>void;
    type?: string;
    error?: string;
    hint?: string;
    id?: string;
    name?: string;
    required?: boolean;
    autoComplete?: string;
    disabled?: boolean;
    readOnly?: boolean;
    multiline?: boolean;
    rows?: number;
    inputClassName?: string;
    onBlur?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    onKeyDown?: KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    "aria-invalid"?: boolean;
    "aria-describedby"?: string;
}

export const Input = ({
    title,
    placeholder = "",
    value,
    onChange,
    type = "text",
    error = "",
    hint,
    id,
    name,
    required = false,
    autoComplete,
    disabled = false,
    readOnly = false,
    multiline = false,
    rows = 4,
    inputClassName,
    onBlur,
    onKeyDown,
    "aria-invalid": ariaInvalid,
    "aria-describedby": ariaDescribedBy,
}: InputProps) => {
    const generatedId = useId();
    const inputId = id ?? `input-${generatedId}`;
    const errorId = `${inputId}-error`;
    const describedBy = [ariaDescribedBy, error !== "" ? errorId : undefined].filter(Boolean).join(" ") || undefined;
    const invalid = ariaInvalid ?? error !== "";
    const isReadOnly = readOnly || !onChange;

    return(
        <div className={styles.InputBlock}>
            <label className={styles.InputTitleBlock} htmlFor={inputId}>
                
                <p className={styles.InputTitle}>{title}</p>
                {required && <span className={styles.Required}>*</span>}
            </label>
            {multiline ? (
                <textarea
                id={inputId}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange ? (e) => onChange(e.target.value) : undefined}
                onBlur={onBlur}
                onKeyDown={onKeyDown}
                required={required}
                autoComplete={autoComplete}
                disabled={disabled}
                readOnly={isReadOnly}
                aria-invalid={invalid}
                aria-describedby={describedBy}
                rows={rows}
                className={`${styles.Input} ${styles.Textarea} ${error !== "" ? styles.Error : ""} ${inputClassName ?? ""}`.trim()}
                />
            ) : (
                <input 
                id={inputId}
                name={name}
                type={type} 
                placeholder={placeholder}
                value={value}
                onChange={onChange ? (e) => onChange(e.target.value) : undefined}
                onBlur={onBlur}
                onKeyDown={onKeyDown}
                required={required}
                autoComplete={autoComplete}
                disabled={disabled}
                readOnly={isReadOnly}
                aria-invalid={invalid}
                aria-describedby={describedBy}
                className={`${styles.Input} ${error !== "" ? styles.Error : ""} ${inputClassName ?? ""}`.trim()}
                />
            )}
            {hint && error === "" && (
                <p className={styles.Hint}>{hint}</p>
            )}
            {error !== "" &&
            <div className={styles.ErrorFrame}>
                <p id={errorId} role="alert" aria-live="polite">
                    {error}
                </p>
            </div>
            }


        </div>
    )
}

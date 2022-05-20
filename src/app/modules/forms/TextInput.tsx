import { UseFormRegister, FieldError } from "react-hook-form";
import { InputType } from './index';

interface Props {
    register: UseFormRegister<any>;
    name: string;
    isRequired: boolean;
    label?: string;
    labelFlex?: string;
    type: InputType;
    required?: string;
    value?: string;
    className: string;
    validation?: { [key: string]: any };
    errors: { [key: string]: FieldError };
    placeholder?: string;
    autoComplete?: string;
}

export const TextInput: React.FC<Props> = ({
    register,
    name,
    label,
    labelFlex,
    isRequired,
    required,
    type,
    value,
    className,
    validation = {},
    errors,
    placeholder = "",
    autoComplete,
}) => {
    return (
        <>
            {labelFlex && (
                <label className="form-label fw-bolder text-dark fs-6 mb-0">
                    <span className={required}>{labelFlex}</span>
                    <i className="fas fa-exclamation-circle ms-2 fs-7"></i>
                </label>
            )}
            {label && (<label htmlFor={name} className={`${required} form-label`}>{label}</label>)}
            <input
                className={`${className} ${errors?.[name] ? "is-invalid" : ""
                    }`}
                {...register(name, validation)}
                id={name}
                type={type}
                value={value}
                placeholder={placeholder}
                autoComplete={autoComplete}
                aria-invalid={errors?.[name] ? "true" : "false"}
                required={isRequired}
            />
            {errors?.[name] && (
                <span className='invalid-feedback'>
                    <strong>{errors?.[name].message}</strong>
                </span>
            )}
        </>
    );
};
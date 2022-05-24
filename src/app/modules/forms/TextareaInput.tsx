import { UseFormRegister, FieldError } from "react-hook-form";

interface Props {
    register: UseFormRegister<any>;
    name: string;
    label: string;
    required?: string;
    className: string;
    validation?: { [key: string]: any };
    errors: { [key: string]: FieldError };
    placeholder?: string;
}

export const TextareaInput: React.FC<Props> = ({
    register,
    name,
    label,
    required,
    className,
    validation = {},
    errors,
    placeholder = "",
}) => {
    return (
        <>
            <label htmlFor={name} className={`${required} form-label fs-6 fw-bold mb-2`}><strong>{label}</strong></label>
            <textarea
                className={`${className} ${errors?.[name] ? "is-invalid" : ""
                    }`}
                {...register(name, validation)}
                id={name}
                placeholder={placeholder}
                aria-invalid={errors?.[name] ? "true" : "false"}
            />
            {errors?.[name] && (
                <span className='invalid-feedback'>
                    <strong>{errors?.[name].message}</strong>
                </span>
            )}
        </>
    );
};
import { UseFormRegister, FieldError } from "react-hook-form";
import { InputType } from "./index";

interface Props {
    register: UseFormRegister<any>;
    name: string;
    className: string;
    label?: string;
    type: InputType;
    value: string;
    checked?: boolean;
    validation?: { [key: string]: any };
    errors: { [key: string]: FieldError };
}

export const TextRadioInput: React.FC<Props> = ({
    register,
    name,
    className,
    type,
    value,
    checked,
    validation = {},
    errors,
}) => {
    return (
        <>
            <input
                className={className}
                {...register(name, validation)}
                id={name}
                type={type}
                value={value}
                checked={checked}
                aria-invalid={errors?.name ? "true" : "false"}
            />
             {errors?.name && (
                 <strong className='fv-plugins-message-container text-danger'>
                    <div className='fv-help-block'>
                        <span role='alert'>{errors?.name.message}</span>
                    </div>
                </strong>
            )}
        </>
    );
};
import { UseFormRegister, FieldError } from "react-hook-form";

interface Props {
    register: UseFormRegister<any>;
    name: string;
    dataItem: any;
    isRequired: boolean;
    label?: string;
    labelFlex?: string;
    required?: string;
    className: string;
    validation?: { [key: string]: any };
    errors: { [key: string]: any };
}

export const SelectValueNameInput: React.FC<Props> = ({
    register,
    name,
    label,
    dataItem,
    labelFlex,
    isRequired,
    required,
    className,
    validation = {},
    errors,
}) => {
    return (
        <>
            {labelFlex && (
                <label className="form-label fw-bolder text-dark fs-6 mb-2">
                    <span className={required}>{labelFlex}</span>
                    {/* {isRequired && (<i className="fas fa-exclamation-circle ms-2 fs-7"></i>)} */}
                </label>
            )}
            {label && (<label htmlFor={name} className={`${required} form-label`}>{label}</label>)}
            <select className={`${className} ${errors?.[name] ? "is-invalid" : ""
                }`} {...register(name, validation)} required={isRequired}>
                <option value="">Choose status</option>
                {dataItem?.map((item: any, index: number) => (
                    <option value={item?.name} key={index}>{item?.name}</option>
                ))}
            </select>
            {errors?.[name] && (
                <strong className='fv-plugins-message-container text-danger'>
                    <div className='fv-help-block'>
                        <span role='alert'>{errors?.name.message}</span>
                    </div>
                </strong>
            )}
        </>
    );
};
import { UseFormRegister, FieldError } from "react-hook-form";
import { InputType } from './index';
import {
    FormLabel
} from "@chakra-ui/react";

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
    errors: { [key: string]: FieldError };
}

export const SelectVoucherInput: React.FC<Props> = ({
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
                <FormLabel className="form-label fw-bolder text-dark fs-6 mb-0">
                    <span className={required}>{labelFlex}</span>
                    <i className="fas fa-exclamation-circle ms-2 fs-7"></i>
                </FormLabel>
            )}
            {label && (<FormLabel htmlFor={name} className={`${required} form-label`}>{label}</FormLabel>)}
            <select className={`${className} ${errors?.[name] ? "is-invalid" : ""
                }`} {...register(name, validation)} required={isRequired}>
                <option value="">Choose currency</option>
                {dataItem?.map((item: any, index: number) => (
                    <option value={item?.code} key={index}>{item?.code}</option>
                ))}
            </select>
            {errors?.[name] && (
                <span className='invalid-feedback'>
                    <strong>{errors?.[name].message}</strong>
                </span>
            )}
        </>
    );
};
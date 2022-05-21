import { KTSVG } from "../../../_metronic/helpers";

interface Props {
    onChange: any;
    className: string;
    placeholder: string;
}

export const SearchInput: React.FC<Props> = ({
    onChange,
    className,
    placeholder,
}) => {
    return (
        <>
            <KTSVG
                path='/media/icons/duotune/general/gen021.svg'
                className='svg-icon-2 svg-icon-lg-1 svg-icon-gray-500 position-absolute top-50 ms-5 translate-middle-y'
            />

            <input
                type='text'
                className={className}
                onChange={onChange}
                placeholder={placeholder}
            />
        </>
    );
};
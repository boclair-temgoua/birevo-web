import dyaxios from '../../../utility/commons/dyaxios';

export const getCurrencies = () => {
    return dyaxios.get(`/currencies`);
};

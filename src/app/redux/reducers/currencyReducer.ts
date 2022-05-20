import produce from 'immer';

const initialState: any = {
    currencies: [],
};

export default produce((draft, action = {}) => {
    switch (action.type) {
        case 'GET_CURRENCIES':
            draft.currencies = action.payload;
            return;
        default:
    }
}, initialState);

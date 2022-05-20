import produce from 'immer';

const initialState: any = {
    user: [],
};

export default produce((draft, action = {}) => {
    switch (action.type) {
        case 'SHOW_USER':
            draft.user = action.payload;
            return;
        default:
    }
}, initialState);

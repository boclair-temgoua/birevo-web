// ** Checks if an object is empty (returns boolean)
// export const isObjEmpty = (obj: unknown) => Object.keys(obj).length === 0;
// ** Returns K format from a number
import jwt_decode from 'jwt-decode';
export const kFormatter = (num: number) => (num > 999 ? `${(num / 1000).toFixed(1)}k` : num);

// ** Converts HTML to string
export const htmlToString = (html: any) => html.replace(/<\/?[^>]+(>|$)/g, '');

// ** Checks if the passed date is today
const isToday = (date: Date) => {
    const today = new Date();
    return (
        /* eslint-disable operator-linebreak */
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
        /* eslint-enable */
    );
};

/**
 ** Return if user is logged in
 ** This is completely up to you and how you want to store the token in your frontend application
 *  ? e.g. If you are using cookies to store the application please update this function
 */
export const isUserLoggedIn = () =>
    JSON.parse(String(localStorage.getItem(String(process.env.REACT_APP_BASE_NAME_TOKEN))));

export const getCurrentUserFormToken = () => {
    const token = window.localStorage.getItem(String(process.env.REACT_APP_BASE_NAME_TOKEN));
    if (token !== null) {
        const user: any = jwt_decode(token);
        return user;
    } else {
        return 'Inconnu';
    }
};

export const logout = () => {
    localStorage.removeItem(String(process.env.REACT_APP_BASE_NAME_TOKEN));
};

export const getCurrentToken = () =>
    JSON.parse(String(localStorage.getItem(String(process.env.REACT_APP_BASE_NAME_TOKEN))));

export const getUserData = () =>
    JSON.parse(String(localStorage.getItem(String(process.env.REACT_APP_BASE_NAME_TOKEN))));

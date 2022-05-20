export const authHeader = () => {
    const user = JSON.parse(String(localStorage.getItem(String(process.env.REACT_APP_BASE_NAME_TOKEN))));
    if (user && user?.results) {
        return `Authorization: ${user?.results}`;
    } else {
        return {};
    }
};

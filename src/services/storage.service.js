const getToken = () => {
    return localStorage.getItem('token') || null;
}

const setToken = (token) => {
    localStorage.setItem('token', token);
}

export {
    getToken,
    setToken
};
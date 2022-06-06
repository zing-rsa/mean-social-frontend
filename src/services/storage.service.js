const getLocalUserInfo = () => {
    const LocalToken = localStorage.getItem('token') || null;
    // const LocalUser = JSON.parse(localStorage.getItem('user') || '[]') || null;
    return { LocalToken: LocalToken };
}

const setLocalUserInfo = (token) => {  
    if (token) localStorage.setItem('token', token);
    // if (user)  localStorage.setItem('user', JSON.stringify(user));
}

const clearLocalUserInfo = () => {
    localStorage.removeItem('token');
}

export { 
    getLocalUserInfo, 
    clearLocalUserInfo,
    setLocalUserInfo    
};
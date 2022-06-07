const getLocalUserInfo = () => {
    const LocalToken = localStorage.getItem('token') || null;
    return { LocalToken: LocalToken };
}

const setLocalUserInfo = (token) => {  
    if (token) localStorage.setItem('token', token);
}

const clearLocalUserInfo = () => {
    localStorage.removeItem('token');
}

export { 
    getLocalUserInfo, 
    clearLocalUserInfo,
    setLocalUserInfo    
};


export default {
    api_url: process.env.REACT_APP_API_URL,
    unauthedRoutes: ['/login', '/signup', '/'],
    headers: (token) => { 
        return { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    }
}
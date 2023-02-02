

export default {
    api_url: process.env.REACT_APP_API_URL,
    media_url: process.env.REACT_APP_MEDIA_URL,
    unauthedRoutes: ['/login', '/signup', '/'],
    headers: (token) => { 
        return { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    }
}


export default {
    api_url: process.env.REACT_APP_API_URL,
    media_url: (id) => 'https://drive.google.com/uc?id=<id>&export=view'.replace('<id>', id),
    headers: (token) => { 
        return { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    }
}
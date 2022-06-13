

export default {
    api_url: process.env.REACT_APP_API_URL,
    headers: (token) => { return { 'authorization': token}}
}
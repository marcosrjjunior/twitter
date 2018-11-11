import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.1.6:3000'
});

// 10.0.2.2 Default Android
// 10.0.3.2 GenyMotion

export default api;
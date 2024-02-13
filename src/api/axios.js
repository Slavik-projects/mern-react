import axios from 'axios';
//const BASE_URL = 'http://localhost:3500'
//const BASE_URL = 'http://localhost:4000'
const BASE_URL = 'https://technotes-api-v2d3.onrender.com'

export default axios.create({
	baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
	baseURL: BASE_URL,
	headers: { 'Content-Type': 'application/json' },
	withCredentials: true
});



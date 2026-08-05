import axios from 'axios';
const api =axios.create({
    baseURL:"https://swapi.info/api",
});
export default api;

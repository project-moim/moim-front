import axios from "axios";
import store from "src/redux/store";

const instance = axios.create({
    baseURL: 'http://localhost:8080/'
})

instance.interceptors.request.use(
    (config) => {
        const token = store.getState().auth.token;
        config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (err) => {
        console.log(err);
        return Promise.reject(err);
    }
)

export default instance;
import axios from "axios";

class User {
    email: string;
    password: string;
    name?: string;
    address: string;
}

const baseUrl = `${process.env.REACT_APP_API_URL}api`;

export const signup = async (user: User) => {
    return await axios.post(`${baseUrl}/join`, user, { withCredentials: true });
}

export const login = (email: string, password: string) => {
    return axios.post(`${baseUrl}/login`, { email: email, password: password });
}
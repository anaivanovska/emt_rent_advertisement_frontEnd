import axios from 'axios';
import {tokenName, tokenPrefix} from "../Constants";

const AxiosAuthenticatedInstance = () => {
    let axiosInstance = axios.create();
    axiosInstance.interceptors.request.use(config => {
        const tokenValue = localStorage.getItem(tokenName);
        config.headers.Authorization = `${tokenPrefix} ${tokenValue}`;
        return config;
    });
    return axiosInstance;
};

export default AxiosAuthenticatedInstance();

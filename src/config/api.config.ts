import axios, { AxiosInstance } from "axios";
import { Config } from "types/config.type";

export const config: Config.Api = {
    url: "http://127.0.0.1:8000",
    version: 'v1'
}

const instance: AxiosInstance = axios.create({
    baseURL: `${config.url}/${config.version}`,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
})

export const api = instance;


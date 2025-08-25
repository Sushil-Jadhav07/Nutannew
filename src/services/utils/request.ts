import axios, { AxiosRequestConfig } from "axios";
import { API_BE } from "@/utils/routes";

const requestConfig: AxiosRequestConfig = {
  baseURL: API_BE,
  timeout: 5000,
};

export const request = axios.create(requestConfig);

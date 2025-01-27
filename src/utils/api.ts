import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const defaultHeaders = {
    "Content-Type": "application/json",
};

export const axiosCall = async (
    method: "GET" | "POST" | "PUT" | "DELETE",
    url: string,
    customHeaders?: Record<string, string>,
    body?: unknown,
    params?: Record<string, unknown>
) => {
    const config: AxiosRequestConfig = {
        method,
        url,
        headers: { ...defaultHeaders, ...customHeaders },
        data: body,
        params,
    };

    try {
        const response: AxiosResponse = await axios.request(config);
        return response.data;
    } catch (error) {
        console.error("API call error:", error);
        throw error;
    }
};

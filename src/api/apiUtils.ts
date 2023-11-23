/* eslint-disable  @typescript-eslint/no-explicit-any */


import { AxiosInstance, AxiosRequestConfig } from 'axios';
export function convertKeysToCamelCase(obj: Record<string, any>): Record<string, any> {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }

    if (Array.isArray(obj)) {
        return obj.map((item) => convertKeysToCamelCase(item));
    }

    return Object.keys(obj).reduce((result: Record<string, any>, key) => {
        const camelCaseKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
        // eslint-disable-next-line no-param-reassign
        result[camelCaseKey] = convertKeysToCamelCase(obj[key]);
        return result;
    }, {});
}

export type RequestConfig = Omit<AxiosRequestConfig, 'url' | 'method'>;

export function withExtractedData(
    client: AxiosInstance,
    extractData: (AxiosResponse: any) => Record<string, any>
) {
    async function request<T>(axiosConfig: AxiosRequestConfig): Promise<T> {
        const res = await client.request(axiosConfig);
        return (convertKeysToCamelCase(extractData(res)) as T);
    }

    async function get<T>(url: string, config?: RequestConfig): Promise<T> {
        return request({ url, ...config, method: 'GET' });
    }

    async function post<T>(url: string, config?: RequestConfig): Promise<T> {
        return request({ url, ...config, method: 'POST' });
    }

    async function put<T>(url: string, config?: RequestConfig): Promise<T> {
        return request({ url, ...config, method: 'PUT' });
    }

    async function patch<T>(url: string, config?: RequestConfig): Promise<T> {
        return request({ url, ...config, method: 'PATCH' });
    }

    return {
        get, post, put, patch
    };
}

export default {};

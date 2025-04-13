declare module 'axios' {
  interface AxiosRequestConfig {
    baseURL?: string;
    headers?: Record<string, string>;
    params?: Record<string, any>;
    timeout?: number;
    [key: string]: any;
  }

  interface AxiosResponse<T = any> {
    data: T;
    status: number;
    statusText: string;
    headers: Record<string, string>;
    config: AxiosRequestConfig;
    [key: string]: any;
  }

  interface AxiosInstance {
    get<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
    post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
    put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
    delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
    [key: string]: any;
  }

  function create(config?: AxiosRequestConfig): AxiosInstance;

  const axios: {
    create: typeof create;
    get: AxiosInstance['get'];
    post: AxiosInstance['post'];
    put: AxiosInstance['put'];
    delete: AxiosInstance['delete'];
    [key: string]: any;
  };

  export default axios;
} 
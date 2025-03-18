import axios, { AxiosInstance } from 'axios';
import { useNavigate } from 'react-router-dom';

export class ApiInterceptor {
    public navigate = useNavigate();
    public axios: AxiosInstance = axios.create();
    private static instance: ApiInterceptor;

    private constructor() {
        this.initRequest();
        this.initResponse();
    }

    public static getInstance(): ApiInterceptor {
        if (!ApiInterceptor.instance) {
            ApiInterceptor.instance = new ApiInterceptor();
        }
        return ApiInterceptor.instance;
    }

    private initRequest() {
        this.axios.interceptors.request.use(
            (config) => {
                // this section is commented until initial auth configs done
                config.headers['TimeZone'] = Intl.DateTimeFormat().resolvedOptions().timeZone;
                config.headers['Authorization'] = 'Bearer ' + 'eyjhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsIm5hbWUiOiJhZG1pbiIsImlhdCI6MTUxNjIzOTAyMn0.4TJOKV'
                return config;
            },
            (error) => {
                Promise.reject(error);
            }
        )
    }

    private initResponse() {
        this.axios.interceptors.response.use(
            (response) => {
                return response;
            },
            (error) => {
                if (error.response) {
                    if (error.response.status === 401) {
                        alert("Session Expired. Your current session has ended. Please log in again to continue");
                        setTimeout(() => {
                            location.reload()
                        }, 1500)
                    }
                    return error.response;
                } else {
                    this.navigate("/auth/sign-in");
                }
            }
        );

    }

}
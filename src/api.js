import axios from "axios";

import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import Login from './pages/auth/Login.js'

const baseUrl = "https://api-senior-care.herokuapp.com/api";
//request interceptor to add the auth token header to requests
axios.interceptors.request.use(
    (config) => {
        const info = localStorage.getItem("token");
        if (info) {
            const data = JSON.parse(info)
            config.headers["token"] = data.data.token;
        }
        return config;
    },
    (error) => {
        Promise.reject(error);
    }
);
// response interceptor to refresh token on receiving token expired error
axios.interceptors.response.use(
    (response) => {
        return response;
    },
    async function (error) {
        const originalRequest = await error.config;
        let refreshToken = localStorage.getItem("token");
        if (refreshToken) {
            const info = JSON.parse(refreshToken)
            const token = info.data?.token

            if (
                token &&
                error.response.status === 403 &&
                !originalRequest._retry
            ) {
                localStorage.removeItem("token")
                window.location.reload();
                Swal.fire({
                    icon: "error",
                    title: "Seccion caducada...",
                    text: "Inicie seccion nuevamente",
                });
                // console.log(token)
                originalRequest._retry = true;
                console.log('tokne => ', token)
                return axios
                    .post(`${baseUrl}/v1/auth/refresh-token`, {}, {
                        headers: {
                            token
                        }
                    })
                    .then((res) => {
                        console.log("en api .js", res);
                        if (res.status === 200) {
                            const newData = {
                                ...info,
                                data: {
                                    ...info.data,
                                    token
                                }
                            }
                            console.log("En el error 403", newData)
                            localStorage.setItem("token", JSON.stringify(...newData));
                            console.log("Access token refreshed!");
                            return axios(originalRequest);
                        }
                    })
                    .catch(console.log)

            }
        }
    }
)


//functions to make api calls
const api = {
    signup: (body) => {
        return axios.post(`${baseUrl}/v1/auth/register`, body);
    },
    login: (body) => {
        return axios.post(`${baseUrl}/v1/auth/login`, body);
    },
    refreshToken: () => {
        return axios.post(`${baseUrl}/v1/auth/refresh-token`);
    },
    registers: (body) => {
        return axios.post(`${baseUrl}/v1/job/register`, body)
    },
    getjob: () => {
        return axios.get(`${baseUrl}/v1/job/getJobs`)
    },
    getuser: () => {
        return axios.get(`${baseUrl}/v1/user/user-info`)
    }
};
export default api;

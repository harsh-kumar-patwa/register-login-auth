import { axiosInstance } from "./index";

export const RegisterUser = async (data) => {
    try {
        const res = await axiosInstance.post("api/users/register", data);
        return res.data;
    } catch (error) {
        return error;
    }
}
export const LoginUser = async (data) => {
    try {
        const res = await axiosInstance.post("api/users/login", data);
        return res.data;
    } catch (error) {
        return error;
    }
}
export const GetCurrentUser = async () => {
    try {
        const res = await axiosInstance.get("api/users/get-current-user");
        return res.data;
    } catch (error) {
        return error;
    }
}

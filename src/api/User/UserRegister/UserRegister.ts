import apiConfig from '../../apiConfig';
import axiosClient from '../../axiosClient';
import { API_USER_MODEL } from "../const";

export const UserRegister = async (data: any) => {
    const methodUrl = [API_USER_MODEL.url + API_USER_MODEL.methods.register.url].join('/');

    const resp = await axiosClient.post(methodUrl, data);

    if (resp) {
        return { "success": true, data: resp };
    } else {
        return { "success": false, data: {}, message: resp ?? 'unknownError' };
    }

}

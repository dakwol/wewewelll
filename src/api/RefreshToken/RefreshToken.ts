import axiosClient from '../axiosClient';
import { API_TOKEN_MODEL } from "./const";

export const RefreshToken = async (data: any) => {
    const methodUrl = [API_TOKEN_MODEL.url + API_TOKEN_MODEL.methods.tokenRefresh.url].join('/');

    const resp = await axiosClient.post(methodUrl, data)

    if (resp) {
        return { "success": true, data: resp };
    } else {
        return { "success": false, data: {}, message: resp ?? 'unknownError' };
    }

}

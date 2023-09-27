import axiosClient from '../../axiosClient';
import { API_USER_MODEL } from "../const";

export const getUserPhoneCheck = async (phone: any) => {
    const methodUrl = [API_USER_MODEL.url + '/' + API_USER_MODEL.methods.userPhoneCheck.url].join('/');

    const resp = await axiosClient.get(methodUrl + '/' + phone)

    console.log('====================================');
    console.log('ddd', resp);
    console.log('====================================');
    if (resp) {
        return { "success": true, data: resp };
    } else {
        return { "success": false, data: {}, message: resp ?? 'unknownError', status: 404 };
    }

}

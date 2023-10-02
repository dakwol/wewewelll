import axiosClient from '../../axiosClient';
import { API_USER_MODEL } from "../const";

export const getUserPhone = async (type: string, phone?: any) => {
    const methodUrl = [API_USER_MODEL.url + '/' + API_USER_MODEL.methods.userPhone.url].join('/');

    console.log('====================================');
    console.log(phone);
    console.log('====================================');

    const resp = type === 'get' ?
        await axiosClient.get(methodUrl + '/' + phone)
        :
        await axiosClient.post(methodUrl, phone)

    if (resp) {
        return { "success": true, data: resp };
    } else {
        return { "success": false, data: {}, message: resp ?? 'unknownError', status: 404 };
    }

}

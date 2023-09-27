import axiosClient from '../../axiosClient';
import { API_USER_MODEL } from "../const";

export const getUser = async (id?: number) => {
    const methodUrl = [API_USER_MODEL.url].join('/');
    const resp = await axiosClient.get(methodUrl + `/${id}`);

    if (resp) {
        return { "success": true, data: resp };
    } else {
        return { "success": false, data: {}, message: resp ?? 'unknownError' };
    }

}

import axiosClient from '../../axiosClient';
import { API_PREFERENCE_MODEL } from "../const";

export const getPreferences = async (type: string, data?: any) => {
    const methodUrl = [API_PREFERENCE_MODEL.url].join('/');

    const resp = type === 'get' ?
        await axiosClient.get(methodUrl)
        :
        await axiosClient.post(methodUrl, data)

    if (resp) {
        return { "success": true, data: resp };
    } else {
        return { "success": false, data: {}, message: resp ?? 'unknownError' };
    }

}

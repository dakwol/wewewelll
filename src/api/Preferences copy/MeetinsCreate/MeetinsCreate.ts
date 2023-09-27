import axiosClient from '../../axiosClient';
import { API_MEETINGS_MODEL } from "../const";

export const MeetinsCreate = async (data: any) => {
    const methodUrl = [API_MEETINGS_MODEL.url].join('/');

    const resp = await axiosClient.post(methodUrl, data)

    if (resp) {
        return { "success": true, data: resp };
    } else {
        return { "success": false, data: {}, message: resp ?? 'unknownError' };
    }

}

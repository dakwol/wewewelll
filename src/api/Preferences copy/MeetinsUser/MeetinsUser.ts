import axiosClient from '../../axiosClient';
import { API_MEETINGS_MODEL } from "../const";

export const meetinsUser = async (userId: number) => {
    const methodUrl = [API_MEETINGS_MODEL.url + API_MEETINGS_MODEL.methods.userMeetings.url].join('/');

    const resp = await axiosClient.get(methodUrl + userId)

    console.log(resp);


    if (resp) {
        return { "success": true, data: resp };
    } else {
        return { "success": false, data: {}, message: resp ?? 'unknownError' };
    }

}

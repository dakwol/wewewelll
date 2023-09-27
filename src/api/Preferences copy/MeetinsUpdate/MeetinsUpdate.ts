import axiosClient from '../../axiosClient';
import { API_MEETINGS_MODEL } from "../const";

export const MeetinsUpdate = async (meetingId: number, data: any) => {
    const methodUrl = [API_MEETINGS_MODEL.url].join('/');

    const resp = await axiosClient.put(methodUrl + '/' + meetingId, data)

    if (resp) {
        return { "success": true, data: resp };
    } else {
        return { "success": false, data: {}, message: resp ?? 'unknownError' };
    }

}

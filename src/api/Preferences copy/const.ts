import { IAPI_MEETINGS_MODEL } from "./types";

export const API_MEETINGS_MODEL = {
    entity: 'meetings',
    url: 'meetings',
    methods: {
        userMeetings: {
            url: '/user/'
        },


    }

} as const;

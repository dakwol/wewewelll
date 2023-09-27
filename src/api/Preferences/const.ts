import { IAPI_PREFERENCE_MODEL } from "./types";

export const API_PREFERENCE_MODEL = {
    entity: 'preferences',
    url: 'preferences',
    methods: {
        userPhone: {
            url: 'phone'
        },


    }

} as const;

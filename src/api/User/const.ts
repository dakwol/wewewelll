import { IAPI_USER_MODEL } from "./types";

export const API_USER_MODEL = {
    entity: 'user',
    url: 'users',
    methods: {
        userPhone: {
            url: 'phones'
        },
        userPhoneCheck: {
            url: 'check'
        },
        avatars: {
            url: '/avatars'
        },
        login: {
            url: '/login'
        },
        register: {
            url: '/register'
        },


    }

} as const;

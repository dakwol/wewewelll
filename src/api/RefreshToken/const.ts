import { IAPI_TOKEN_MODEL } from "./types";

export const API_TOKEN_MODEL = {
    entity: 'tokens',
    url: 'tokens',
    methods: {
        tokenRefresh: {
            url: 'refresh'
        }


    }

} as const;

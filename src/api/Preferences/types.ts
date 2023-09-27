export interface IAPI_PREFERENCE_MODEL {
    entity: string,
    url: string,
    methods: {
        [x: string]: {
            url: string
        }
    }
    [x: string]: any,
}


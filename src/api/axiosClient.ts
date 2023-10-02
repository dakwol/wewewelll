import axios from 'axios';
import queryString from 'query-string';
import apiConfig from './apiConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login } from '../redux/actions/authActions';
import { logoutUser } from '../redux/actions/userActions';
import store from '../redux/store';

const axiosClient = axios.create({
    baseURL: apiConfig.baseUrl,
    headers: {
        'Content-Type': 'application/json',
    },
    paramsSerializer: (params) =>
        queryString.stringify({ ...params, api_key: apiConfig.apiKey }),
});

axiosClient.interceptors.request.use(async (config) => {
    // Check if the request data is FormData
    if (config.data instanceof FormData) {
        config.headers['Content-Type'] = 'multipart/form-data';
    }

    // Get the user token from AsyncStorage
    const userToken = await AsyncStorage.getItem('token');

    if (userToken) {
        config.headers['Authorization'] = `Bearer ${userToken}`;
    }

    return config;
});

axiosClient.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return response.data;
        }
        return response;
    },
    async (error) => {
        if (error.response && error.response.status === 401) {
            console.error('Received a 401 error. Token may have expired.');

            try {
                // Retrieve the refresh token and current token from AsyncStorage
                const refreshToken = await AsyncStorage.getItem('refreshToken');
                const token = await AsyncStorage.getItem('token');

                const tokenData = {
                    accessToken: token,
                    refreshToken: refreshToken,
                };

                const refreshedTokenResponse = await axios.post(
                    `${apiConfig.baseUrl}/tokens/refresh`,
                    tokenData
                );

                if (
                    refreshedTokenResponse.data &&
                    refreshedTokenResponse.data.token
                ) {
                    // Update userToken in AsyncStorage and Axios headers
                    const newAccessToken = refreshedTokenResponse.data.token;
                    const newRefreshToken = refreshedTokenResponse.data.refreshToken;
                    await AsyncStorage.setItem('token', newAccessToken);
                    await AsyncStorage.setItem('refreshToken', newRefreshToken);
                    axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;

                    // Retry the original request
                    return axios.request(error.config);
                } else {
                    console.error('Error refreshing token.');
                    // Redirect the user or log them out as needed
                    store.dispatch(login(''));
                    store.dispatch(logoutUser());
                }
            } catch (refreshError) {
                console.error('Error refreshing token:', refreshError);
                // Redirect the user or log them out as needed
                store.dispatch(login(''));
                store.dispatch(logoutUser());
            }
        }

        // For other errors, propagate the error
        return Promise.reject(error);
    }
);

export default axiosClient;

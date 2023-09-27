import axios from 'axios';
import queryString from 'query-string';
import apiConfig from './apiConfig';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SCREENS } from '../navigation/screenName';
import { useNavigation } from '@react-navigation/native';
import { login } from '../redux/actions/authActions';
import { logoutUser } from '../redux/actions/userActions';
import store from '../redux/store';

const axiosClient = axios.create({
    baseURL: apiConfig.baseUrl,
    headers: {
        'Content-Type': 'application/json',
    },
    paramsSerializer: params => queryString.stringify({ ...params, api_key: apiConfig.apiKey })
});
axiosClient.interceptors.request.use((config) => {
    // Добавляем проверку на тип данных, который отправляем
    if (config.data instanceof FormData) {
        config.headers['Content-Type'] = 'multipart/form-data';
    }

    // Получаем токен из AsyncStorage
    return AsyncStorage.getItem('token').then((userToken) => {
        if (userToken) {
            config.headers['Authorization'] = `Bearer ${userToken}`;
        }
        return config;
    });
});

axiosClient.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return response.data;
        }
        return response;
    },
    (error) => {
        if (error.response && (error.response.status === 500 || error.response.status === 401 || error.response.status === 400)) {
            console.error('Получена ошибка 401. Токен, возможно, истек.');

            // Реализуйте здесь логику обновления токена
            const refreshToken = AsyncStorage.getItem('refreshToken');
            const token = AsyncStorage.getItem('token');

            return Promise.all([refreshToken, token])
                .then(([refreshToken, token]) => {
                    const tokenData = {
                        accessToken: token,
                        refreshToken: refreshToken,
                    };

                    return axios.post(
                        `${apiConfig.baseUrl}/tokens/refresh`,
                        tokenData
                    ).then((refreshedTokenResponse) => {
                        if (
                            refreshedTokenResponse.data &&
                            refreshedTokenResponse.data.token
                        ) {
                            // Обновите userToken в AsyncStorage и заголовках Axios
                            const newAccessToken = refreshedTokenResponse.data.token;
                            const newRefreshToken = refreshedTokenResponse.data.refreshToken;
                            AsyncStorage.setItem('token', newAccessToken);
                            AsyncStorage.setItem('refreshToken', newRefreshToken);
                            axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;

                            // Повторите исходный запрос
                            return axios.request(error.config);
                        } else {
                            console.error('Ошибка обновления токена.');
                            // Перенаправьте пользователя или выполните выход из системы по необходимости
                            // dispatch(login(''));
                            // dispatch(logoutUser());
                        }
                    });
                }).catch((refreshError) => {
                    console.error('Ошибка обновления токена:', refreshError);
                    // Перенаправьте пользователя или выполните выход из системы по необходимости
                    store.dispatch(login(''));
                    store.dispatch(logoutUser());
                });
        }

        // Для других ошибок перекидываем ошибку дальше
        return Promise.reject(error);
    }
);

export default axiosClient;

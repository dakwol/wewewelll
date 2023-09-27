import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import StartScreen from '../../screens/Start/StartScreen/StartScreen';
import AuthPhoneScreen from '../../screens/AuthScreens/AuthPhoneScreen/AuthPhoneScreen';
import HomeScreen from '../../screens/HomeScreen/HomeScreen'; // Замените это на ваш компонент домашнего экрана
import { SCREENS } from '../screenName';
import { CommonNavigatorParamList } from './types';
import ProfileScreen from '../../screens/ProfileScreen/ProfileScreen';
import AuthNameScreen from '../../screens/AuthScreens/AuthNameScreen/AuthNameScreen';
import AuthInterestsScreen from '../../screens/AuthScreens/AuthInterestsScreen/AuthInterestsScreen';
import InviteScreen from '../../screens/InviteScreen/InviteScreen';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login } from '../../redux/actions/authActions';
import AuthRegistationPhoneScreen from '../../screens/AuthScreens/AuthRegistationPhoneScreen/AuthRegistationPhoneScreen';
import { userLogin } from '../../api/User/UserLogin/UserLogin';
import { updateData } from '../../redux/actions/userActions';
import jwtDecode from 'jwt-decode';
import { getUserPhone } from '../../api/User/getUserPhone/getUserPhone';

const CommonNavigator = () => {
  const CommonStack = createStackNavigator<CommonNavigatorParamList>();
  const [isFirstLaunch, setIsFirstLaunch] = useState(true);
  const dispatch = useDispatch();
  const userToken = useSelector((state: any) => state.auth.isLoggedIn);

  useEffect(() => {
    const checkUserAuthentication = async () => {
      const token = await AsyncStorage.getItem('token');
      const refreshToken = await AsyncStorage.getItem('refreshToken');
      const decodedToken = jwtDecode(token ? token : '');

      if (token) {
          //@ts-ignore
          getUserPhone('get', decodedToken?.Phone)
            .then((resp) => {
              if (resp.success) {
                //@ts-ignore
                const data = resp.data;

                Object.entries(data).forEach(([key, value]) => {
                  dispatch(updateData(key, value));
                });

                //@ts-ignore
                AsyncStorage.setItem('token', resp.data.token)
                  .then(() => {
                    console.log('Token сохранён в AsyncStorage');
                    //@ts-ignore
                    dispatch(login(resp.data.token));
                  })
                  .catch((error) => {
                    console.error('Ошибка при сохранении токена в AsyncStorage:', error);
                  });
              }
            })
            .catch((err) => {
              console.log(err.message);
            });
          console.log('Загружен токен из AsyncStorage:', token);
          //@ts-ignore
          dispatch(login(token));
          // setIsFirstLaunch(false);
      }
      try {
        //@ts-ignore
        if (decodedToken && decodedToken.phone) {
          //@ts-ignore
          getUserPhone('get', decodedToken?.phone)
            .then((resp) => {
              if (resp.success) {
                //@ts-ignore
                const data = resp.data;

                Object.entries(data).forEach(([key, value]) => {
                  dispatch(updateData(key, value));
                });

                //@ts-ignore
                AsyncStorage.setItem('token', resp.data.token)
                  .then(() => {
                    console.log('Token сохранён в AsyncStorage');
                    //@ts-ignore
                    dispatch(login(resp.data.token));
                  })
                  .catch((error) => {
                    console.error('Ошибка при сохранении токена в AsyncStorage:', error);
                  });
              }
            })
            .catch((err) => {
              console.log(err.message);
            });
          console.log('Загружен токен из AsyncStorage:', token);
          //@ts-ignore
          dispatch(login(token));
        }
      } catch (error) {
        // Ошибка при загрузке
        console.error('Ошибка при загрузке токена из AsyncStorage:', error);
      } finally {
        // setIsFirstLaunch(false);
      }
    };

    checkUserAuthentication();
  }, [dispatch]);

  if (!isFirstLaunch) {
    // Отображаем стартовый экран только при первом запуске
    return (
      <CommonStack.Navigator>
        <CommonStack.Screen
          name={SCREENS.Start}
          component={StartScreen}
          options={{ headerShown: false }}
        />
      </CommonStack.Navigator>
    );
  } else {
    // Отображаем разные экраны в зависимости от статуса аутентификации пользователя
    return (
      userToken ? (
        <CommonStack.Navigator>
          <CommonStack.Screen
            name={SCREENS.Home}
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <CommonStack.Screen
            name={SCREENS.InviteScreen}
            component={InviteScreen}
            options={{ headerShown: false }}
          />
          <CommonStack.Screen
            name={SCREENS.Profile}
            component={ProfileScreen}
            options={{ headerShown: false }}
          />    
        </CommonStack.Navigator>
      ) : (
        // Если пользователь не авторизован, показываем AuthPhoneScreen
        <CommonStack.Navigator>
          <CommonStack.Screen
            name={SCREENS.AuthPhone}
            component={AuthPhoneScreen}
            options={{ headerShown: false }}
          />
          <CommonStack.Screen
            name={SCREENS.AuthRegistationPhone}
            component={AuthRegistationPhoneScreen}
            options={{ headerShown: false }}
          />
          <CommonStack.Screen
            name={SCREENS.AuthName}
            component={AuthNameScreen}
            options={{ headerShown: false }}
          />
          <CommonStack.Screen
            name={SCREENS.AuthInterest}
            component={AuthInterestsScreen}
            options={{ headerShown: false }}
          />
        </CommonStack.Navigator>
      )
    );
  }
};

export default CommonNavigator;

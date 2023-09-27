import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Auth from '../../../components/Project/Auth/Auth';
import { View } from 'react-native';
import { login } from '../../../redux/actions/authActions';
import { userCreate } from '../../../api/User/UserCreate/userCreate';
import { getUser } from '../../../api/User/getUser/getUser';
import { updateData } from '../../../redux/actions/userActions';
import { UserRegister } from '../../../api/User/UserRegister/UserRegister';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthInterestsScreen = () => {
    const dispatch = useDispatch();
    const userData = useSelector((state: any) => state?.user);

    console.log(userData);
    
    const navigateToInterests = () => {
        UserRegister(userData)  .then((resp) => {
            if (resp.success) {
              //@ts-ignore
              const data = resp.data.user;
    
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
                //@ts-ignore
                AsyncStorage.setItem('refreshToken', resp.data.refreshToken)
                .then(() => {
                  console.log('refreshToken сохранён в AsyncStorage');
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
    };

    return (
        <View>
            <Auth 
                type={'interest'} 
                title={'Ещё немного уточним'} 
                text={'Так твои встречи станут ещё лучше и точно запомнятся'} 
                textButton={'Готово'} 
                onPress={()=>{navigateToInterests()}} 
            />
        </View>
    );
};

export default AuthInterestsScreen;

import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import Auth from '../../../components/Project/Auth/Auth'
import { useNavigation } from '@react-navigation/native'
import { SCREENS } from '../../../navigation/screenName'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from '../../../api/User/getUser/getUser'
import { updateData } from '../../../redux/actions/userActions'
import { login } from '../../../redux/actions/authActions'
import { getUserPhone } from '../../../api/User/getUserPhone/getUserPhone'
import ErrorMessageModal from '../../../components/Project/ErrorMessage/ErrorMessage'
import { userLogin } from '../../../api/User/UserLogin/UserLogin'
import AuthRegistationPhoneScreen from '../AuthRegistationPhoneScreen/AuthRegistationPhoneScreen'
import AsyncStorage from '@react-native-async-storage/async-storage';


const AuthPhoneScreen = () => {
    console.log('OPEN')
    const [navigateScreen, setNavigateScreen] = useState<boolean>(false)
    const [isSms, setIsSms] = useState<any>('')
    const [isSmsCheck, setIsSmsCheck] = useState<any>('')
    const [isErr, setIsErr] = useState<boolean>(false)
    const [userInfo, setUserInfo] = useState<any>([])
    const dispatch = useDispatch();

    const navigation = useNavigation();

    const phoneNumber = useSelector((state:any) => state.user.phoneNumber);
    const password = useSelector((state:any) => state.user.password);
    const user = useSelector((state:any) => state.user);
    const token = useSelector((state:any) => state.auth.isLoggedIn);
    const AuthUser = () => { 
      const authData = {
        phoneNumber: phoneNumber,
        password: password
      }
      console.log(authData);
      userLogin(authData)
      .then((resp) => {
        if (resp.success) {
          //@ts-ignore
          const data = resp.data.user;

          console.log('====================================');
          console.log( 'TOKEN',resp.data);
          console.log('====================================');

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
        console.error('Ошибка при сохранении токена в AsyncStorage:', err.message);
        setIsErr(true);
        setIsSms(err.message)
      });
      
    }

    const navigateToReg = () => { 
        //@ts-ignore
         navigation.navigate(SCREENS.AuthRegistationPhone);
    }
    
  return (
    <View>
      {isErr && <ErrorMessageModal isVisible={isErr} title={isSms} onClose={()=>{setIsErr(false)}}/>}
        <Auth 
          type={'phone'} 
          title={'Введите телефон и пароль'} 
          text={'Это нужно для входа в аккаунт'} 
          textButton={'Вход'} 
          textButtonTwo={'Регистрация'} 
          onPress={()=>AuthUser()}
          onPressTwo={()=>{navigateToReg()}}
        />
    </View>
  )
}

export default AuthPhoneScreen
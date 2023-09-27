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
import AuthPhoneScreen from '../AuthPhoneScreen/AuthPhoneScreen'
import AuthNameScreen from '../AuthNameScreen/AuthNameScreen'

const AuthRegistationPhoneScreen = () => {
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
    
    console.log(phoneNumber);
    

    const navigateToName = () => { 
      if (phoneNumber !== undefined && password !== undefined) {
        setIsErr(false);
        //@ts-ignore
        navigation.navigate(SCREENS.AuthName, {});
      } else {
        setIsErr(true);
      }
    }
    

    const navigateToAuth = () => { 
      navigation.goBack();
  }
    
  
  
  return (
    <View>
      {isErr && <ErrorMessageModal isVisible={isErr} title={'Поля не заполнены'} onClose={()=>{setIsErr(false)}}/>}
        <Auth 
          type={'phone'} 
          title={'Введите телефон и пароль'} 
          text={'Это нужно для создания аккаунта'} 
          textButton={'Далее'} 
          textButtonTwo={'Вход'} 
          onPress={()=>navigateToName()}
          onPressTwo={()=>navigateToAuth()}
        />
    </View>
  )
}

export default AuthRegistationPhoneScreen
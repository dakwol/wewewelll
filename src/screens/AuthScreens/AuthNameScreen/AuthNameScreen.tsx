import React, { useEffect } from 'react'
import { Text, View } from 'react-native'
import Auth from '../../../components/Project/Auth/Auth'
import { useNavigation } from '@react-navigation/native'
import { SCREENS } from '../../../navigation/screenName'
import { userCreate } from '../../../api/User/UserCreate/userCreate'
import { getUser } from '../../../api/User/getUser/getUser'
import { useSelector, useDispatch } from 'react-redux';

const AuthNameScreen = () => {
    console.log('OPEN')

    const navigation = useNavigation();

    const navigateToInterests = () => {
        //@ts-ignore
      navigation.navigate(SCREENS.AuthInterest);
    };


  return (
    <View>
        <Auth type={'name'} title={'Введите имя'} text={'Как тебя зовут?'} textButton={'Зовите меня так'} onPress={()=>navigateToInterests()}/>
    </View>
  )
}

export default AuthNameScreen
import React, { FC, useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { style } from './style';
import Button from '../Button/Button';
import CodeInput from '../CodeInput/CodeInput';
import { userCreate } from '../../../api/User/UserCreate/userCreate';
import { getUser } from '../../../api/User/getUser/getUser';
import { useDispatch, useSelector } from 'react-redux';
import { updateField, updatePreferences } from '../../../redux/actions/userActions';
import { TextInputMask } from 'react-native-masked-text'
import { getPreferences } from '../../../api/Preferences/getPreferences/getPreferences';
import { colors } from '../../../constants/colors';

interface AuthProps {
  type: string;
  title: string;
  text: string;
  textButton: string;
  textButtonTwo?: string | any;
  onPress: () => void;
  onPressTwo?: (() => void) | undefined;
  checkSms?: (value: string) => void;
}


const Auth: FC<AuthProps> = ({ type, title, text, textButton, textButtonTwo, onPress, onPressTwo, checkSms }) => {
  const [pressedIds, setPressedIds] = useState<number[]>([]);
  const [initArr, setInitArr] = useState<any>([]);
  const dispatch = useDispatch();

  const toggleItemSelection = (itemId: number, itemName: string) => {
    if (pressedIds.includes(itemId)) {
      setPressedIds((prevIds) => prevIds.filter((id) => id !== itemId));
    } else {
      setPressedIds((prevIds) => [...prevIds, itemId]);
    }
    handlePreferencesUpdate(pressedIds.map((id) => ({ id, name: initArr.find((item:any) => item.id === id)?.name })));
  };
  

  useEffect(()=>{
    if(type === 'interest'){
      getPreferences('get').then((resp)=>{
        setInitArr(resp.data)
        console.log(resp);
        
      })
    }
  },[type])

  const handleFieldChange = (key:string, value:string) => {
      dispatch(updateField(key, value));
  };

  const handlePreferencesUpdate = (preferences: any[]) => {
    dispatch(updatePreferences(preferences));
};


  return (
    <View style={style.ContainerAuth}>
      <View>
        <Text style={style.AuthTitle}>{title}</Text>
        <Text style={style.AuthText}>{text}</Text>
        {(() => {
          switch (type) {
            case 'phone':
              return  (
                <>
                  <TextInputMask
                      type={'custom'}
                      options={{
                        mask: '+7 999 999-99-99'
                      }}
                      style={style.inputAuth}
                      keyboardType='phone-pad' placeholder='Номер телефона' onChangeText={(text)=>handleFieldChange('phoneNumber',  text)} placeholderTextColor={colors.greyTwo}
                    />
                  <TextInput
                    style={style.passwordIput}
                     placeholder='Пароль' onChangeText={(text)=>handleFieldChange('password',  text)} placeholderTextColor={colors.greyTwo}
                  />
                </>
              )
            case 'sms':
              return (
                //@ts-ignore
               <CodeInput checkSms={(value:string)=>{checkSms(value)}} placeholderTextColor={colors.greyTwo}/>
              );
            case 'name':
              return <TextInput style={style.inputAuth} placeholder='Введите имя'  onChangeText={(e)=>handleFieldChange('name', e)} placeholderTextColor={colors.greyTwo}/>;
            case 'interest':
              return (
                <View style={style.containerScroll}>
                <ScrollView contentContainerStyle={style.initContainer}>
                  {initArr.map((item:any) => {
                    const isItemPressed = pressedIds.includes(item.id);
                    return (
                      <TouchableOpacity
                        style={[style.initCotnainerItem, isItemPressed ? style.pressedStyle : null]}
                        key={item.id}
                        onPress={() => toggleItemSelection(item.id, item.name)}
                      >
                        <Text style={[style.initText, isItemPressed? style.pressedStyleText : null]}>
                          {item.name}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
                </View>
              );
            default:
              return null;
          }
        })()}
      </View>
      <View>
        <Button onPress={onPress} text={textButton} />
        {
          textButtonTwo &&

          <Button 
            styleContainer={style.buttonTwo} 
            styleText={style.buttonTwoText} 
            //@ts-ignore
            onPress={onPressTwo ? () => onPressTwo() : undefined} 
            text={textButtonTwo} 
          />
        }
     
      </View>
    </View>
  );
};


export default Auth;

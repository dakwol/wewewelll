import React, { FC } from 'react'
import { Image, Text, View } from 'react-native'
import { Plus } from '../../../constants/images'
import { style } from './style'
import { TouchableOpacity } from 'react-native-gesture-handler'

interface ButtonPlus {
  onPress: () => void;
}

const ButtonPlus:FC<ButtonPlus> = ({onPress}) => {
  return (
    <TouchableOpacity style={style.buttonPlusContainer} onPress={onPress}>
        <Image source={Plus}></Image>
    </TouchableOpacity>
  )
}

export default ButtonPlus
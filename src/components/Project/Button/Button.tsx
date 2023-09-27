import React, { FC } from 'react'
import { Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { style } from './style'

interface Button {
    onPress:()=>void,
    text: string
    styleContainer?: any
    styleText?: any
}


const Button:FC<Button> = ({text, onPress, styleContainer, styleText}) => {
  return (
    <TouchableOpacity onPress={()=>{onPress()}} style={[style.buttonContainer, styleContainer]}>
        <Text style={[style.textButton, styleText]}>{text}</Text>
    </TouchableOpacity>
  )
}

export default Button
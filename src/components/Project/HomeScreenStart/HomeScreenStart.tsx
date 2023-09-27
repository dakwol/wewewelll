import React from 'react'
import { Image, Text, View } from 'react-native'
import { ArrowHomeStart } from '../../../constants/images'
import { SCREEN_WIDTH, globalStyles } from '../../../constants/globalStyles'
import { style } from './style'

const HomeScreenStart = () => {
  return (
    <View style={globalStyles.flexOneCenter}>
        <Text style={globalStyles.titleText}>Создай первую встречу</Text>
        <Text style={[globalStyles.subtitleText, {width: 200}]}>И открывай новое вместе. WeWell объединяет</Text>
        <Image source={ArrowHomeStart} style={style.arrowImage}></Image>
    </View>
  )
}

export default HomeScreenStart
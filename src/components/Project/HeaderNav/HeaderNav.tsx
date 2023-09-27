import React from 'react';
import { Image, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import { style } from './styles';
import { Back } from '../../../constants/images';

const HeaderNav = () => {
  const navigation = useNavigation(); // Hook to get the navigation object

  const goBack = () => {
    navigation.goBack(); // Function to navigate back
  };

  return (
    <View style={style.headerNav}>
      <TouchableOpacity onPress={goBack}>
        <Image source={Back} />
      </TouchableOpacity>
      <TouchableOpacity onPress={goBack}>
        <Text style={style.headerBtn}>Готово</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HeaderNav;

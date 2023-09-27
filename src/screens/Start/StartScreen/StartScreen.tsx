import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SCREENS } from '../../../navigation/screenName';
import styles from './styles';
import { SlideOne } from '../../../constants/images';

const StartScreen = () => {
  const navigation = useNavigation();

  const dataImage = [SlideOne];

  return (
    <View style={styles.container}>
      <Text>Это будущий экран загрузки...</Text>
    </View>
  );
};

export default StartScreen;

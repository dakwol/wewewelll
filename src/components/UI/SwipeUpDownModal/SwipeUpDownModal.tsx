import React, { ReactNode, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
//@ts-ignore
import SwipeUpDownModal from 'react-native-swipe-modal-up-down';
import { SCREEN_HEIGHT } from '../../../constants/globalStyles';
import { style } from './style';
import { colors } from '../../../constants/colors';
import ImageComponent from '../../Project/ImageComponent/ImageComponent';
import { useSelector } from 'react-redux';

interface SwipeModalComponentProps {
  isVisible: boolean;
  title: string,
  onClose: () => void;
  content: ReactNode;
}

const SwipeModalComponent: React.FC<SwipeModalComponentProps> = ({
  content,
  isVisible,
  title,
  onClose,
}) => {
  const user = useSelector((state: any) => state.userData);
    // Обработчик события закрытия модального окна
    const handleCloseModal = () => {
      onClose();
    };

  return (
    isVisible &&
    
    <>
    <View style={style.modalBg}>
    <ImageComponent source={{ uri: user.url}} style={{ width: 50, height: 50, borderRadius: 50, position:'absolute', top:30, left:"43%"  }}/>
    </View>
   
    <View style={style.modal}>
      <View style={style.modalContent}>
          <View style={style.headerModalContainer}>
            <Text style={style.contactTitle}>{title}</Text>
            <TouchableOpacity onPress={()=>{handleCloseModal()}}>
              <Text style={{color: colors.black}}>Отменить</Text>
            </TouchableOpacity>
          </View>
      </View>
      {content}        
    </View></>
  );
};

export default SwipeModalComponent;

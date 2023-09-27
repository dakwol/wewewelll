import React, { ReactNode, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
//@ts-ignore
import SwipeUpDownModal from 'react-native-swipe-modal-up-down';
import { SCREEN_HEIGHT } from '../../../constants/globalStyles';
import { style } from './style';
import { colors } from '../../../constants/colors';

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

    // Обработчик события закрытия модального окна
    const handleCloseModal = () => {
      onClose();
    };

  return (
    isVisible &&
    
    <>
    <View style={style.modalBg}></View>
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

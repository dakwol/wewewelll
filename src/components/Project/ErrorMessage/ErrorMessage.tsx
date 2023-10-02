import React, { FC, useEffect } from 'react';
import { View, Text } from 'react-native';
import { colors } from '../../../constants/colors';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../constants/globalStyles';

interface ErrorMessageProps {
    isVisible: boolean;
    title: string;
    onClose: () => void;
}

const ErrorMessageModal: FC<ErrorMessageProps> = ({ isVisible, title, onClose }) => {
    useEffect(() => {
        if (isVisible) {
            // Устанавливаем таймер для автоматического закрытия окна через 5 секунд
            const timer = setTimeout(() => {
                onClose(); // Вызываем функцию onClose после 5 секунд
            }, 5000);

            // Возвращаем функцию очистки таймера при размонтировании компонента
            return () => {
                clearTimeout(timer);
            };
        }
    }, [isVisible, onClose]);

    return isVisible &&
        <View style={{width: SCREEN_WIDTH, position: 'absolute', zIndex: 100000, backgroundColor: colors.lgGray, borderColor: "red", borderWidth: 1, bottom: 20, borderRadius: 20, padding: 20, }}>
        <Text style={{color: 'red'}}>{ title }</Text>
        </View>
};

export default ErrorMessageModal;

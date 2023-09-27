import React, { ReactNode } from 'react';
import { Text, View } from 'react-native';
import { SCREEN_WIDTH } from '../../../constants/globalStyles';

interface FooterButtonProps {
  children: ReactNode; // ReactNode allows any valid React component to be used as children
}

const FooterButton: React.FC<FooterButtonProps> = ({ children }) => {
  return (
    <View style={{position: 'absolute', bottom: 40}}>
      {children}
    </View>
  );
};

export default FooterButton;

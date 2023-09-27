import React, { FC } from 'react';
import { Text, View, TouchableOpacity, TouchableOpacityProps, ImageSourcePropType } from 'react-native';
import ImageComponent from '../ImageComponent/ImageComponent';
import { globalStyles } from '../../../constants/globalStyles';
import { useNavigation } from '@react-navigation/native';
import { SCREENS } from '../../../navigation/screenName';

interface AvatarHeaderProps {
  name: string;
  imageSource?: { uri: string };
}

const AvatarHeader: FC<AvatarHeaderProps & TouchableOpacityProps> = ({ name, imageSource, ...props }) => {
  const navigation = useNavigation();

  const navigateToProfile = () => {
    //@ts-ignore
    navigation.navigate(SCREENS.Profile);
  };

  return (
    <TouchableOpacity
      style={globalStyles.container}
      onPress={navigateToProfile}
      activeOpacity={0.8}
      {...props} // Pass other TouchableOpacity props
    >
      <ImageComponent source={imageSource} style={{ width: 50, height: 50, borderRadius: 50 }}/>
      <Text style={globalStyles.avatarText}>{name}</Text>
    </TouchableOpacity>
  );
};

export default AvatarHeader;

import React, { FC } from 'react';
import { Image, View } from 'react-native';
import { DefaultSource } from '../../../constants/images'

interface ImageComponentProps {
  source?: { uri: string };
  style?: any;
}

const ImageComponent: FC<ImageComponentProps> = ({
  source,
  style,
}) => {
  console.log('====================================');
  console.log(source);
  console.log('====================================');
  return (
    <View>
      {source?.uri != undefined ? (
        <Image source={source} style={style} />
      ) : (
        <Image source={DefaultSource} style={style} />
      )}
    </View>
  );
};

export default ImageComponent;

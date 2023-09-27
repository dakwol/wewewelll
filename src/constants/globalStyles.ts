import { Dimensions, StyleSheet } from 'react-native';
import { colors } from './colors';

export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;

export const globalStyles = StyleSheet.create({
  flexOneCenter: {
    alignItems: 'center',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: '#fff'
  },
  container: {
    alignItems: 'center'
  },
  titleText: {
    fontSize: 22,
    fontWeight: "700",
    color: "#000"
  },
  subtitleText: {
    fontSize: 16,
    fontWeight: "400",
    textAlign: 'center',
    color: "#000"
  },
  avatarText: {
    fontSize: 12,
    fontWeight: "400",
    textAlign: 'center',
    color: "#000",
    marginTop: 6,
    marginBottom: 32
  },
});

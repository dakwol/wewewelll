import { StyleSheet } from "react-native";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../constants/globalStyles";
import { colors } from "../../../constants/colors";


export const style = StyleSheet.create({
    modal: {
        position: "absolute",
        zIndex: 1000,
        bottom: 0,
        left: 0,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT - 130,
        backgroundColor: colors.white,
        borderRadius: 20
    },
    modalBg: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        backgroundColor: '#9F9F9F',
        opacity: 1
    },
    modalContent: {
        padding: 20,
    },
    headerModalContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        position: 'relative',
    },
    contactTitle: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        position: 'absolute',
        left: '40%',
        fontSize: 16,
        fontWeight: "700",
        color: colors.black
    },
});

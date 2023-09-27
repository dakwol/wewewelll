import { StyleSheet } from "react-native";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../constants/globalStyles";
import { colors } from "../../../constants/colors";


export const style = StyleSheet.create({
    buttonContainer: {
        width: SCREEN_WIDTH - 32,
        backgroundColor: colors.blue,
        padding: 11,
        borderRadius: 60,
        textAlign: "center",
    },
    textButton: {
        fontSize: 16,
        color: colors.white,
        fontWeight: "400",
        fontFamily: " SF Pro Display",
        textAlign: "center"
    }
});

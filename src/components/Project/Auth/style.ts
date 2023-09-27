import { StyleSheet } from "react-native";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../constants/globalStyles";
import { colors } from "../../../constants/colors";


export const style = StyleSheet.create({
    ContainerAuth: {
        justifyContent: "space-between",
        alignItems: "center",
        height: SCREEN_HEIGHT,
        width: SCREEN_WIDTH,
        paddingTop: 135,
        paddingBottom: 41,
        paddingHorizontal: 16
    },
    AuthTitle: {
        color: colors.black,
        textAlign: "center",
        fontSize: 22,
        fontWeight: "700"
    },
    AuthText: {
        color: colors.black,
        textAlign: "center",
        fontSize: 16,
        fontWeight: "400",
        marginVertical: 6
    },
    inputAuth: {
        borderRadius: 8,
        backgroundColor: colors.lightGrey,
        width: SCREEN_WIDTH - 32,
        textAlign: "center",
        color: colors.black,
        fontStyle: "normal",
        fontWeight: "700",
        fontSize: 22,
        marginTop: 95
    },
    passwordIput: {
        borderRadius: 8,
        backgroundColor: colors.lightGrey,
        width: SCREEN_WIDTH - 32,
        textAlign: "center",
        color: colors.black,
        fontStyle: "normal",
        fontWeight: "700",
        fontSize: 22,
        marginTop: 16,
    },
    containerScroll: {
        height: '70%',
        marginTop: 22
    },
    initContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
    },
    initCotnainerItem: {
        paddingHorizontal: 22,
        paddingVertical: 5,
        backgroundColor: colors.lightGrey,
        borderRadius: 20,
        margin: 6,
        borderWidth: 1,
        borderColor: colors.lightGrey
    },
    initText: {
        color: '#9F9F9F',
        textAlign: "center",
        fontSize: 13,
        fontWeight: "400",
        fontStyle: "normal",
    },
    pressedStyle: {
        borderWidth: 1,
        borderColor: colors.blue
    },
    pressedStyleText: {
        color: colors.blue
    },
    buttonTwo: {
        backgroundColor: colors.white,
        marginTop: 10
    },
    buttonTwoText: {
        color: colors.blue
    }
});

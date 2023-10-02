import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";
import { SCREEN_WIDTH } from "../../constants/globalStyles";

const styles = StyleSheet.create({
    containerInviteScreen: {
        flex: 1,
        position: "relative"
    },

    bgImage: {
        position: "absolute",
        top: 0,
        left: 0,
        width: SCREEN_WIDTH,
        zIndex: -1,
        resizeMode: "cover",
        height: "50%",
        flex: 1
    },
    contentContainer: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        height: "70%",
        backgroundColor: colors.white,
        borderRadius: 20,
        paddingVertical: 24,
        paddingHorizontal: 16,
    },
    containerHeader: {
        flexDirection: "row",
        marginBottom: 20
    },
    containerImg: {
        justifyContent: "center",
        alignItems: "center",
        marginRight: 25
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 80,
        borderWidth: 2,
        borderColor: colors.blue,
        marginBottom: 6
    },
    nameText: {
        color: colors.black,
        fontFamily: 'SF Pro Display',
        fontSize: 13,
        fontWeight: '400'
    },
    containerDate: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start"
    },
    dateInfo: {
        paddingVertical: 6,
        paddingHorizontal: 22,
        backgroundColor: '#F1F3F5',
        borderRadius: 20,
        marginBottom: 16,
        textAlign: "center",
        color: colors.blue,
        fontSize: 13,
        fontWeight: '400',
        fontFamily: 'SF Pro Display',
    },
    title: {
        color: colors.black,
        fontSize: 22,
        fontFamily: 'SF Pro Display',
        fontWeight: '700',
        marginBottom: 3,

    },
    subTitle: {
        fontSize: 13,
        fontWeight: "400",
        color: '#9F9F9F',
        marginBottom: 8,
        fontFamily: 'SF Pro Display',
    },
    text: {
        color: colors.black,
        fontFamily: 'SF Pro Display',
        fontSize: 16,
        fontWeight: '400'
    },
    link: {
        color: colors.blue,
        fontFamily: 'SF Pro Display',
        fontSize: 13,
        fontWeight: '400',
        marginBottom: 12
    },
    titleMap: {
        color: colors.black,
        fontSize: 18,
        fontWeight: "400",
        fontFamily: 'SF Pro Display',
    },
    footerButtonContainer: {
        position: "absolute",
        bottom: 50,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",

    },
    buttonClose: {
        backgroundColor: colors.blue,
        borderRadius: 40,
        padding: 11,
    },
    buttonSucces: {
        backgroundColor: colors.blue,
        borderRadius: 40,
        padding: 11,
        width: SCREEN_WIDTH - 80,
        marginLeft: 12
    },
    buttonText: {
        color: colors.white,
        textAlign: "center",
        fontSize: 16,
        fontWeight: "400"
    },
    backButton: {
        width: 24,
        height: 24,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
        marginLeft: 16
    }
});

export default styles;

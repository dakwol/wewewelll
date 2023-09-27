import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";
import { SCREEN_WIDTH } from "../../constants/globalStyles";

const styles = StyleSheet.create({
    containerInvite: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: colors.blue,
        paddingHorizontal: 21,
        paddingVertical: 16,
        borderRadius: 22,
        width: SCREEN_WIDTH - 24,
        alignSelf: "center",
        marginBottom: 20,
        borderColor: colors.blue,
        borderWidth: 2
    },
    containerName: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    inviteImg: {
        width: 48,
        height: 48,
        marginRight: 18,
        borderRadius: 50
    },
    titleInvite: {
        fontWeight: "700",
        fontSize: 16,
        color: colors.white
    },
    textInvite: {
        fontSize: 16,
        fontWeight: "400",
        color: colors.white
    }
});

export default styles;

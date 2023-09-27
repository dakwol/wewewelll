import { StyleSheet } from "react-native";
import { SCREEN_WIDTH } from "../../../constants/globalStyles";

export const style = StyleSheet.create({
    headerNav: {
        width: "100%",
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        position: "absolute"
    },
    headerBtn: {
        color: '#0038FF',
        fontSize: 16,
    }
});

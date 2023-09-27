import { StyleSheet } from "react-native";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../constants/globalStyles";


export const style = StyleSheet.create({
    containerMeeting: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: SCREEN_WIDTH,
        paddingHorizontal: 16,
        flexWrap: 'wrap'
    },
    meetingsContainer: {
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 10
    }
});

import { StyleSheet } from "react-native";
import { SCREEN_WIDTH } from "../../constants/globalStyles";

const styles = StyleSheet.create({
    containerName: {
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        width: "100%",
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingVertical: 9,
        paddingHorizontal: 12,
        marginTop: 11
    },
    ContainerBigInfo: {
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        marginVertical: 38
    },
    bigItemMeeting: {
        backgroundColor: '#fff',
        alignItems: "center",
        justifyContent: "center",
        width: 150,
        height: 169,
        borderRadius: 22,
        marginHorizontal: 14,
        paddingVertical: 36
    },
    bigItemTitle: {
        color: '#000',
        fontSize: 72,
        fontWeight: "700"
    },
    bigItemSubtitle: {
        color: '#000',
        fontSize: 22,
        fontWeight: "400"
    },
    crownActive: {
        position: "absolute",
        zIndex: 1000,
        top: -10,
        right: 25,
        transform: [{ rotateZ: "30deg" }],
    },
    containerMeeting: {
        width: SCREEN_WIDTH - 40,
        borderRadius: 22,
        overflow: "hidden",
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 21,
        paddingVertical: 16,
        marginBottom: 12,
        position: "relative"
    },
    rightItemMeeting: {
        flexDirection: "row",
        alignItems: "center",
    },
    meetingAvatar: {
        width: 48,
        height: 48,
        marginRight: 18,
        borderRadius: 50
    },
    meetingBg: {
        borderRadius: 22,
        position: "absolute",
        top: 0,
        left: 0,
        width: SCREEN_WIDTH - 40,
        height: 150,
    },
    avatarBtn: {
        color: '#0038FF',
        fontSize: 16,
        marginTop: 6
    },
    leaderMeetingName: {
        color: '#000',
        fontSize: 13,
        fontWeight: '400',
        marginTop: 6
    },
    leaderMeetingSubtitle: {
        color: '#9F9F9F',
        fontSize: 12,
        fontWeight: '400',
    }
});

export default styles;

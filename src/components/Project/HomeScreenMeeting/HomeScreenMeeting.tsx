import React from 'react';
import { Text, View } from 'react-native';
import ImageComponent from '../ImageComponent/ImageComponent';
import { style } from './style';
import { globalStyles } from '../../../constants/globalStyles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { SCREENS } from '../../../navigation/screenName';
import { useSelector } from 'react-redux';

interface MeetingItemProps {
  data: any;
}

const MeetingItem: React.FC<MeetingItemProps> = ({ data }) => {
  const user = useSelector((state: any) => state.userData);
  const navigation = useNavigation();
  let myMeeting = user?.id === data?.creator?.id
  const navigateToInvite = (dataInvite: any) => {
   
    if (dataInvite) {
       //@ts-ignore
      navigation.navigate(SCREENS.InviteScreen, { dataInvite });
    }
  };
  
  return (
    <TouchableOpacity style={style.meetingsContainer} onPress={()=>{navigateToInvite(data)}}>
      <ImageComponent source={{uri: myMeeting? data.guest.url : data.creator.url}} style={{width: 80, height: 80, borderRadius: 50}}/>
      <Text style={globalStyles.avatarText}>{myMeeting? data.guest.name : data.creator.name}</Text>
    </TouchableOpacity>
  );
};

interface HomeScreenMeetingProps {
  meetingData: any[];
  friendData: any[];
}

const HomeScreenMeeting: React.FC<HomeScreenMeetingProps> = ({ meetingData, friendData }) => {


  return (
    <>
      <View style={{ marginBottom: 4 }}>
      {friendData.some((item: any) => (!item.isArchive && (item.status === "Waiting"))) && (
        <Text style={[globalStyles.titleText, { marginBottom: 16, paddingHorizontal: 16 }]}>
          Назначенные встречи
        </Text>
      )}
        <View style={style.containerMeeting}>
          {meetingData.map((item: any, index: number) => (
            (!item.isArchive && (item.status === "Waiting")) && <MeetingItem key={index} data={item} />
          ))}
        </View>
      </View>
      <View>
        {friendData.some((item: any) => (item.isArchive || item.status === "Cancelled")) && (
          <Text style={[globalStyles.titleText, { marginVertical: 16, paddingHorizontal: 16 }]}>
            История встреч
          </Text>
        )}
        <View style={style.containerMeeting}>
          {friendData.map((item: any, index: number) => (
           (item.isArchive || item.status === "Cancelled") && <MeetingItem key={index} data={item} />
          ))}
        </View>
      </View>

    </>
  );
};

export default HomeScreenMeeting;

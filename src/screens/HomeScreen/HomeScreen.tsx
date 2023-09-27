import React, { FC, useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import AvatarHeader from '../../components/Project/AvatarHeader/AvatarHeader';
import HomeScreenStart from '../../components/Project/HomeScreenStart/HomeScreenStart';
import HomeScreenMeeting from '../../components/Project/HomeScreenMeeting/HomeScreenMeeting';
import FooterButton from '../../components/Project/FooterButton/FooterButton';
import ButtonPlus from '../../components/Project/ButtonPlus/ButtonPlus';
import { SCREEN_WIDTH, globalStyles } from '../../constants/globalStyles';
import { AvatarUser1 } from '../../constants/images';
import { ScrollView } from 'react-native-gesture-handler';
import SwipeModalComponent from '../../components/UI/SwipeUpDownModal/SwipeUpDownModal';
import ContPhone from '../../components/Project/Contacts/Contacts';
import styles from './styles';
import { colors } from '../../constants/colors';
import { useNavigation } from '@react-navigation/native';
import { SCREENS } from '../../navigation/screenName';
import { useSelector } from 'react-redux';
import { meetinsUser } from '../../api/Preferences copy/MeetinsUser/MeetinsUser';
import ImageComponent from '../../components/Project/ImageComponent/ImageComponent';


const HomeScreen: FC = () => {
  // const meetingData: any[] = [
  //   {
  //     img: AvatarUser1,
  //     name: 'Ваня Горбунков'
  //   },
  //   {
  //     img: AvatarUser1,
  //     name: 'Ваня Горбунков'
  //   },
  //   {
  //     img: AvatarUser1,
  //     name: 'Ваня Горбунков'
  //   },
    
  // ];
  // const friendData: any[] = [
  //   {
  //     img: AvatarUser1,
  //     name: 'Ваня Горбунков'
  //   },
  //   {
  //     img: AvatarUser1,
  //     name: 'Ваня Горбунков'
  //   },
  //   {
  //     img: AvatarUser1,
  //     name: 'Ваня Горбунков'
  //   },
  //   {
  //     img: AvatarUser1,
  //     name: 'Ваня Горбунков'
  //   },
  //   {
  //     img: AvatarUser1,
  //     name: 'Ваня Горбунков'
  //   },
  //   {
  //     img: AvatarUser1,
  //     name: 'Ваня Горбунков'
  //   },
  //   {
  //     img: AvatarUser1,
  //     name: 'Ваня Горбунков'
  //   },
    
  // ];

  const ContactsData: any[] = [
    {
      id: 1,
      name: 'Алёшка',
      img: AvatarUser1
    },
    {
      id: 2,
      name: 'Алёшка 2',
      img: AvatarUser1
    },
    {
      id: 3,
      name: 'Богда',
      img: AvatarUser1
    },
    {
      id: 4,
      name: 'Гена',
      img: AvatarUser1
    },
    {
      id: 5,
      name: 'Гена 2',
      img: AvatarUser1
    },
    {
      id: 6,
      name: 'Рома',
      img: AvatarUser1
    },
    {
      id: 7,
      name: 'Рома 2',
      img: AvatarUser1
    },
  ]

  const [modalVisible, setModalVisible] = useState(false);

  const isDataInvite = [
    {
      id: 1,
      name: 'Маха Серго',
      status_new: true,
      data: '14.05 | Вс.',
      time: '19:00',
      img: AvatarUser1
    },
    {
      id: 2,
      name: 'Маха Серго',
      status_new: false,
      data: '14.05 | Вс.',
      time: '19:00',
      img: AvatarUser1
    }
  ]

   const navigation = useNavigation();

   const navigateToInvite = (dataInvite: any) => {
   
    if (dataInvite) {
       //@ts-ignore
      navigation.navigate(SCREENS.InviteScreen, { dataInvite });
    }
  };
  
    const user = useSelector((state: any) => state.userData);
    console.log('USERID', user);
    

    const [dataMeeting, setDataMeeting] = useState<any>([])

    const fetchMeetings = () => {
      meetinsUser(user.id).then((resp) => {
        if (resp.success) {
          setDataMeeting(resp.data);
        }
      });
    };
  
    useEffect(() => {
      fetchMeetings();
      const intervalId = setInterval(fetchMeetings, 10000);
      return () => clearInterval(intervalId);
    }, [user.id]);


  return (
    <View style={[globalStyles.flexOneCenter, {paddingTop: 16}]}>
      <ScrollView style={{width: SCREEN_WIDTH}}>
        <AvatarHeader 
          name={user.name} 
          imageSource={{
            uri: user.url
          }} 
        />
        
        {dataMeeting?.map((item:any)=>{
          console.log(item);

          let myMeeting = user?.id === item?.creator?.id

          if(item.status === 'Invited'){
            return (
              <TouchableOpacity style={[styles.containerInvite, myMeeting?{backgroundColor: colors.lightGrey} : {backgroundColor: colors.blue}]} onPress={()=>{navigateToInvite(item)}}>
                <View style={styles.containerName}>
                <ImageComponent source={{uri: myMeeting? item.guest.url : item.creator.url}} style={styles.inviteImg}/>
                <View>
                  <Text style={[styles.titleInvite, myMeeting? {color: colors.black} : {}]}>{myMeeting? item.guest.name : item.creator.name}</Text>
                  <Text style={[styles.textInvite, myMeeting? {color: colors.black} : {}]}>{myMeeting? 'Отправлен инвайт' : 'Новый инвайт'}</Text>
                </View>
                </View>
                <View>
                  <Text style={[styles.textInvite, myMeeting? {color: colors.black} : {}]}>{item.creator.data}</Text>
                  <Text style={[styles.textInvite, myMeeting? {color: colors.black} : {}]}>{item.creator.time}</Text>
                </View>
            </TouchableOpacity>
            )
          }
        })}
        {dataMeeting.length === 0 ? (
          <HomeScreenStart />
        ) : (
          <HomeScreenMeeting meetingData={dataMeeting} friendData={dataMeeting}/>
        )}
      </ScrollView>
      <SwipeModalComponent 
        title={'Контакты'}
        isVisible={modalVisible} 
        onClose={()=>{setModalVisible(false);}} 
        content={
          <ContPhone onClose={()=>{setModalVisible(false)}}/>
        }
        
      />
      
      <FooterButton>
        <ButtonPlus onPress={()=>{setModalVisible(!modalVisible);}}/>
      </FooterButton>
    </View>
  );
};

export default HomeScreen;

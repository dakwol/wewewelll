import React, { FC, useEffect, useRef, useState } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import FooterButton from '../../components/Project/FooterButton/FooterButton';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ArrowDown, ArrowHomeStart, AvatarUser1, Crown, DefaultSource, SlideOne } from '../../constants/images';
import { SCREEN_WIDTH, globalStyles } from '../../constants/globalStyles';
import styles from './styles';
import HeaderNav from '../../components/Project/HeaderNav/HeaderNav';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/actions/authActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { SCREENS } from '../../navigation/screenName';
import { meetinsUser } from '../../api/Preferences copy/MeetinsUser/MeetinsUser';
import { ImagePickerComponent } from '../../components/Project/ImagePicker/ImagePicker';
import ImageComponent from '../../components/Project/ImageComponent/ImageComponent';
import { logoutUser } from '../../redux/actions/userActions';
import { colors } from '../../constants/colors';
import BlurImage from '../../components/UI/BlurImage/BlurImage';
import {dateUtils} from '../../components/UI/functions/functions';

interface MeetingData {
  img: any; // Replace 'any' with the correct type for your image source
  name: string;
}

interface ProfileScreenProps {
  dataMeeting: MeetingData[];
}

const ProfileScreen = (dataMeeting:any) => {

  const user = useSelector((state: any) => state.userData);
  const[dataMeetingApi, setDataMeetingApi] = useState<any>([])  
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const[isOpen, setIsOpen] = useState<boolean>(false)
  const[isImage, setIsImage] = useState<any>()
  const hasMeetings = dataMeetingApi.length > 0;
  const [leaderMeeting, setLeaderMeeting] = useState(null); // Изменено на null, чтобы указать начальное значение
  const imagePickerRef = useRef();

  useEffect(()=>{
    meetinsUser(user.id).then((resp)=>{
      console.log('ddddd',resp);
      
      setDataMeetingApi(resp.data)
    }).catch((err)=>{
      console.log('====================================');
      console.log(err);
      console.log('====================================');
    })
  },[user])


  const logOut = async () => {
    try {
      await AsyncStorage.removeItem('token');
      dispatch(login(''));
      dispatch(logoutUser());
    }
    catch {
      
    }
  };
  


  useEffect(() => {
    if (dataMeetingApi.length === 0) {
      return; // Нет данных, нет смысла продолжать
    }
  
    // Создаем объект для подсчета упоминаний
    const idCount: { [id: string]: number } = {};
    let mostFrequentId = '';
    let maxCount = 0;
  
    // Проходим по массиву dataMeetingApi
    dataMeetingApi.forEach((item: any) => {
      if (user.id == item.creator.id) {
        // Если пользователь был создателем
        if (item.guest.id in idCount) {
          idCount[item.guest.id]++;
        } else {
          idCount[item.guest.id] = 1;
        }
      } else if (user.id == item.guest.id) {
        // Если пользователь был гостем
        if (item.creator.id in idCount) {
          idCount[item.creator.id]++;
        } else {
          idCount[item.creator.id] = 1;
        }
      }
  
      // Находим id с наибольшим счетчиком
      for (const id in idCount) {
        if (idCount[id] > maxCount) {
          mostFrequentId = id;
          maxCount = idCount[id];
        }
      }
    });
  
    // Теперь, когда мы нашли наиболее часто упоминаемого пользователя (лидера), устанавливаем leaderMeeting
    const leaderMeetingItem = dataMeetingApi.find(
      (item: any) =>
        (user.id == item.creator.id && mostFrequentId == item.guest.id) ||
        (user.id == item.guest.id && mostFrequentId == item.creator.id)
    );
  
    console.log('leader', leaderMeetingItem);
  
    setLeaderMeeting(
      user.id === leaderMeetingItem?.creator.id
        ? leaderMeetingItem?.guest
        : leaderMeetingItem?.creator
    );
  }, [dataMeetingApi, user]);
  
  
  

  const handleOpenImagePicker = () => {
    if (imagePickerRef.current) {
      //@ts-ignore
      imagePickerRef.current.open();
    }
  };

  const navigateToInvite = (dataInvite: any) => {
   
    if (dataInvite) {
       //@ts-ignore
      navigation.navigate(SCREENS.InviteScreen, { dataInvite });
    }
  };

  console.log(user);
  

  return (
    <View style={[globalStyles.flexOneCenter, {backgroundColor: '#EFEFF4', paddingTop: 16}]}>
      <ScrollView style={{width: SCREEN_WIDTH - 32}}>
        <HeaderNav/>
        <View style={globalStyles.container}>
          <View style={globalStyles.container}>
            <ImageComponent source={{uri: user.url !== undefined? user.url : undefined}} style={{width: 80, height: 80, borderRadius: 50}}/>
            <TouchableOpacity onPress={handleOpenImagePicker}> 
              <Text style={styles.avatarBtn}>Выбрать фотографию</Text>
            </TouchableOpacity>
            <ImagePickerComponent source={1} ref={imagePickerRef} />
          </View>
          <View style={styles.containerName}>
            <Text style={{color: colors.black}}>Имя</Text>
            <Text style={{color: colors.black}}>{user.name}</Text>
          </View>

          <View style={styles.ContainerBigInfo}>
            
            {hasMeetings ? (
              <>
                <View style={styles.bigItemMeeting}>
                  <Text style={styles.bigItemTitle}>{dataMeetingApi.length}</Text>
                  <Text style={styles.bigItemSubtitle}>встреч</Text>
                </View>
                <View style={styles.bigItemMeeting}>
               
                  <Image style={styles.crownActive} source={Crown} />
                  {/*@ts-ignore*/}
                  <ImageComponent source={{uri: leaderMeeting?.url}} style={{width: 80, height: 80, resizeMode: 'cover', borderRadius: 50}}/>
                   {/*@ts-ignore*/}
                  <Text style={styles.leaderMeetingName}>{leaderMeeting?.name}</Text>
                  <Text style={styles.leaderMeetingSubtitle}>лидер встреч</Text>
                </View>
              </>
            ) : (
              <>
                <View style={styles.bigItemMeeting}>
                  <Text style={styles.bigItemTitle}>0</Text>
                  <Text style={styles.bigItemSubtitle}>встреч</Text>
                </View>
                <View style={styles.bigItemMeeting}>
                  <Image source={Crown} />
                  <Text style={{textAlign: 'center', marginTop: 20, color: colors.grey}}>У тебя пока нет лидера встреч</Text>
                </View>
              </>
            )}
          </View>
          {hasMeetings ? (
            dataMeetingApi?.map((item:any)=>{
              console.log(item.place.url);
              const myInvite = item?.creator?.id === user.id
              return (
                <TouchableOpacity style={styles.containerMeeting} onPress={()=>{navigateToInvite(item)}}>
                
                  <BlurImage
                      resizeMode={"cover"}
                      resizeMethod={"resize"}
                      media={item.place.url != null? {uri: item.place.url } : {uri: ''}}
                      blur={true}
                      style={styles.meetingBg}
                  />
                  <View style={styles.rightItemMeeting}>
                    <ImageComponent source={{uri:myInvite? item.guest.url : item?.creator?.url}} style={styles.meetingAvatar}/>
                    <View style={{ maxWidth: 140, overflow: 'hidden' }}>
                    <Text style={{ color: '#fff' }} numberOfLines={1} ellipsizeMode="tail">
                      {myInvite ? item.guest.name : item?.creator?.name}
                    </Text>
                    <Text style={{ color: '#fff' }} numberOfLines={1} ellipsizeMode="tail">
                      {item.place.name}
                    </Text>
                  </View>
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                      <Text style={{color: '#fff'}}>{dateUtils.formatDateWithDayOfWeek(item.date)}</Text>
                      <Text style={{color: '#fff'}}>{dateUtils.extractTimeFromDateTime(item.date)}</Text>
                    </View>
                    <Image source={ArrowDown} style={{marginLeft: 12}}></Image>
                  </View>
                </TouchableOpacity>
              )
            })
          ) : (
            <View>
            <Text style={{ color: colors.grey}}>Здесь будет история твоих встреч</Text>
          </View>
          )}
        </View>
      </ScrollView>
      <FooterButton>
        <TouchableOpacity onPress={()=>{logOut()}}>
          <Text style={styles.avatarBtn}>Выход</Text>
        </TouchableOpacity>
      </FooterButton>
    </View>
  );
};

export default ProfileScreen;

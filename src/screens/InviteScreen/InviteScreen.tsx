import React, { FC, useState } from 'react'
import { Image, ScrollView, Text, View } from 'react-native'
import { AvatarUser1, BackIcon, Close, SlideOne } from '../../constants/images'
import styles from './styles'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { SCREEN_WIDTH } from '../../constants/globalStyles'
import { useNavigation, useRoute } from '@react-navigation/native'
import HeaderNav from '../../components/Project/HeaderNav/HeaderNav'
import { useSelector } from 'react-redux'
import ImageComponent from '../../components/Project/ImageComponent/ImageComponent'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; 
import { MeetinsUpdate } from '../../api/Preferences copy/MeetinsUpdate/MeetinsUpdate'


const InviteScreen  = () => {
    const navigation = useNavigation(); // Hook to get the navigation object

    const route = useRoute();
    //@ts-ignore
    const { dataInvite } = route.params;
    const user = useSelector((state: any) => state.userData);
    console.log('DADA',dataInvite);
    const [dataMeeting, setDataMeeting] = useState({})

    const myInvite = dataInvite.creator.id === user.id

    console.log(myInvite);
    
    const completeInvite = (inviteStatus: string) => {
        setDataMeeting({
            id: dataInvite.id,
            status: inviteStatus,
            isActive: true,
            isShowForCreator: true,
            isShowForGuest:true ,
        })
        MeetinsUpdate(dataInvite.id, dataMeeting).then((resp)=>{
            if(resp.success){
                navigation.goBack()
            }
        })
        
    }

    const goBack = () => {
        navigation.goBack(); // Function to navigate back
      };
  return (
    
    <View style={styles.containerInviteScreen}>
        <TouchableOpacity style={styles.backButton} onPress={()=>goBack()}>
            <Image source={BackIcon}></Image>
        </TouchableOpacity>
        <Image source={dataInvite.place.url != null ? {uri:dataInvite.place.url} : {uri:SlideOne}} style={styles.bgImage}/>
        
        <ScrollView style={styles.contentContainer}>
 
            <View style={styles.containerHeader}>
                <View style={styles.containerImg}>
                    <ImageComponent source={{uri: dataInvite.guest.id !== user.id? dataInvite.guest.url : dataInvite.creator.url}} style={styles.avatar}/>
                    <Text style={styles.nameText}>{dataInvite.guest.id !== user.id? dataInvite.guest.name : dataInvite.creator.name}</Text>
                </View>
                <View style={styles.containerDate}>
                    <Text style={styles.dateInfo}>{dataInvite.date}</Text>
                    <Text style={styles.dateInfo}>{dataInvite.place.minDurationHours} - {dataInvite.place.maxDurationHours} часа</Text>
                </View>
            </View>
            <View>
                <Text style={styles.title}>{dataInvite.place.name}</Text>
                <Text style={styles.subTitle}>{dataInvite.place.address}</Text>
                {
                    dataInvite.place.description &&
                    <>
                        <Text style={styles.text}>{dataInvite.place.description}</Text>
                        <TouchableOpacity>
                            <Text style={styles.link}>Читать далее</Text>
                        </TouchableOpacity>
                    </>
                }
              
                <Text style={styles.titleMap}>Локация</Text>
                <View>
                <MapView
                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                        style={{width: "100%", height: 190, borderRadius: 22, marginTop: 12}}
                        region={{
                            latitude: 37.78825,
                            longitude: -122.4324,
                            latitudeDelta: 0.015,
                            longitudeDelta: 0.0121,
                        }}
                        >
                        </MapView>
                </View>
            </View>
        </ScrollView>
        {(dataInvite.status === 'Waiting' || dataInvite.status === 'Invited') &&
            <View style={[styles.footerButtonContainer, !myInvite&& {width: '100%'}]}>
                {!myInvite &&
                    <TouchableOpacity 
                        style={styles.buttonClose}
                        onPress={()=>{completeInvite('Cancelled') }}
                    >
                        <Image source={Close}/>
                    </TouchableOpacity>
                }
                <TouchableOpacity 
                    style={[styles.buttonSucces, !myInvite? {} : {width: SCREEN_WIDTH - 20}]}
                    onPress={()=>{completeInvite(myInvite? 'Cancelled' : 'Waiting') }}
                >
                    <Text style={styles.buttonText}>{myInvite? 'Отменить инвайт' : "Принять инвайт"}</Text>
                </TouchableOpacity>
            </View>
        }
    </View>
  )
}



export default InviteScreen
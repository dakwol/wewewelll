import React, { FC, useState, useEffect } from 'react';
import { Image, Text, View, TextInput, FlatList, StyleSheet } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { colors } from '../../../constants/colors';
import SwipeModalComponent from '../../UI/SwipeUpDownModal/SwipeUpDownModal';
import { request, PERMISSIONS, check } from 'react-native-permissions';

import Contacts from 'react-native-contacts';
import ImageComponent from '../ImageComponent/ImageComponent';
import { meetinsUser } from '../../../api/Preferences copy/MeetinsUser/MeetinsUser';
import { getUserPhone } from '../../../api/User/getUserPhone/getUserPhone';
import ErrorMessageModal from '../ErrorMessage/ErrorMessage';
import { useDispatch, useSelector } from 'react-redux';
import { MeetinsCreate } from '../../../api/Preferences copy/MeetinsCreate/MeetinsCreate';
import { useNavigation } from '@react-navigation/native';
import { SCREENS } from '../../../navigation/screenName';


interface Contact {
  recordID: string;
  thumbnailPath: string;
  givenName: string;
  familyName: string;
}

const ContPhone = ({onClose}:any) => {
  const [searchText, setSearchText] = useState('');
  const [selectedUser, setSelectedUser] = useState<any>();
  const [modalVisible, setModalVisible] = useState(false);
  const [error, setError] = useState(false);
  const [contactsArray, setContacts] = useState<Contact[]>([]);
  const [searchResults, setSearchResults] = useState<Contact[]>([]);
  const [dataNewMeeting, setDataNewMeeting] = useState<any>({});
  const [searchDataPhone, setSearchDataPhone] = useState<any>([]);
  const [update, setUpdate] = useState<boolean>(false);

  useEffect(() => {
    const checkAndLoadContacts = async () => {
      try {
        const status = await check(PERMISSIONS.ANDROID.READ_CONTACTS);
        if (status === 'granted') {
          const contacts = await Contacts.getAll();
          if (contacts && contacts.length > 0) {
            const phoneNumberArray = contacts
              .filter((contact) => contact.phoneNumbers && contact.phoneNumbers.length > 0)
              .map((contact) => {
                const phoneNumberObject = contact.phoneNumbers[0];
                if (phoneNumberObject && phoneNumberObject.number) {
                  const phoneNumber = phoneNumberObject.number.replace(/\D/g, '');
                  return `+7 ${phoneNumber.slice(1, 4)} ${phoneNumber.slice(4, 7)}-${phoneNumber.slice(7, 9)}-${phoneNumber.slice(9, 11)}`;
                }
                return null;
              });
  
            getUserPhone('post', phoneNumberArray).then((resp)=>{
              if(resp.success){
              setSearchDataPhone(resp.data);
    
              const filteredContacts = contacts.filter((contact) => {
                const phoneNumberObject = contact.phoneNumbers[0];
                if (phoneNumberObject && phoneNumberObject.number) {
                  const phoneNumber = phoneNumberObject.number.replace(/\D/g, '');
                  return searchDataPhone.includes(`+7 ${phoneNumber.slice(1, 4)} ${phoneNumber.slice(4, 7)}-${phoneNumber.slice(7, 9)}-${phoneNumber.slice(9, 11)}`);
                  }
                  return false;
                });
                setContacts(filteredContacts);
                
                } else {
                  setContacts(contacts)
                }
                setUpdate(true)
            });
         
          } else {
            console.log('Контакты не найдены.');
          }
        } else if (status === 'denied') {
          console.log('Разрешения на доступ к контактам не предоставлены');
        } else if (status === 'blocked') {
          console.error('Ошибка при запросе разрешений');
        }
      } catch (error) {
        console.error('Ошибка при получении контактов: ', error);
      }
    };
  
    checkAndLoadContacts();
  }, [update]);

  

  // Функция для фильтрации контактов на основе текста поиска
  const filterContacts = (searchQuery: string) => {
    const filteredContacts = contactsArray.filter((contact) => {
      const fullName = `${contact.givenName} ${contact.familyName}`;
      return fullName.toLowerCase().includes(searchQuery.toLowerCase());
    });
    setSearchResults(filteredContacts);
  };

  const formatPhoneNumber = (phoneNumber:any) => {
    // Удалить все символы, кроме цифр
    const digits = phoneNumber.replace(/\D/g, '');
  
    // Проверить, что остались только цифры и их достаточно для форматирования
    if (digits.length === 11) {
      // Разбить номер на части: код страны, код региона и остаток
      const countryCode = `+${digits[0]}`;
      const regionCode = digits.slice(1, 4);
      const rest = digits.slice(4);
  
      // Форматировать номер
      return `${countryCode} ${regionCode} ${rest.slice(0, 3)}-${rest.slice(3, 5)}-${rest.slice(5)}`;
    } else {
      // Неправильная длина номера, возвращаем исходное значение
      return phoneNumber;
    }
  };
  
  const handleMeetingCreate = (phone: any) => {
    console.log('OPEN');
    const formattedNumber = formatPhoneNumber(phone.phoneNumbers[0].number);
    getUserPhone('get', formattedNumber)
      .then((resp) => {
        console.log(resp);
        if (resp.success) {
          setSelectedUser(resp.data);
          setModalVisible(true)
          setError(false); // Очистить ошибку, если запрос успешно вернул данные
        } else {
          setSelectedUser(null);
          setError(true); // Установить ошибку, если запрос не увенчался успехом
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          // Обработка случая, когда запрос вернул 404 ошибку
          console.log('User not found');
          setSelectedUser(null);
          setError(true); // Установить ошибку
        } else {
          // Обработка других ошибок
          console.error('An error occurred:', error);
        }
      });
  };

  const typeMeeting = [
    {
      id: 1,
      text: 'Романтическая',
      type: 1
    },
    {
      id: 2,
      text: 'Дружеская',
      type: 2
    },
    {
      id: 3,
      text: 'Деловая',
      type: 3
    },
  ]
  const dataMeeting = [
    {
      id: 1,
      text: 'Сейчас',
      type: '2023-09-18T15:02:22.896Z'
    },
    {
      id: 2,
      text: 'Календарь',
      type: '2023-09-18T15:02:22.896Z'
    },
  ]
  const priceMeeting = [
    {
      id: 1,
      text: '0 - 500₽',
      min: 0,
      max: 100
    },
    {
      id: 2,
      text: '500 - 1500₽',
      min: 500,
      max: 1500
    },
    {
      id: 3,
      text: '1500 - 2500₽',
      min: 1500,
      max: 2500
    },
  ]
  const timeMeeting = [
    {
      id: 1,
      text: '1 час',
      min: 0,
      max: 1
    },
    {
      id: 2,
      text: '1 - 2 часа',
      min: 1,
      max: 2
    },
    {
      id: 3,
      text: '> 3 часов',
      min: 3,
      max: 4
    },
  ]
  
  const [selectedType, setSelectedType] = useState<any>();
  const [selectedDate, setSelectedDate] = useState<any>();
  const [selectedPrice, setSelectedPrice] = useState<any>();
  const [selectedDuration, setSelectedDuration] = useState<any>();
  const user = useSelector((state: any) => state.userData);
  

  useEffect(() => {
    setDataNewMeeting({
      creatorId: user.id,
      guestId: selectedUser ? selectedUser.id : null,
      date: selectedDate?.type,
      minPrice: selectedPrice ? selectedPrice.min : 100,
      maxPrice: selectedPrice ? selectedPrice.max : 500,
      minDurationHours: selectedDuration ? selectedDuration.min : 1,
      maxDurationHours: selectedDuration ? selectedDuration.max : 3,
      typeId: selectedType ? selectedType.id : 3
    });
  }, [selectedType, selectedDate, selectedPrice, selectedDuration, selectedUser]);

  console.log('DATA', dataNewMeeting);
  console.log('DATA', selectedPrice);
  const navigation = useNavigation();
  const createInvite = () => {
    MeetinsCreate(dataNewMeeting).then((resp)=>{
      if(resp.success){
        setModalVisible(false)
        console.log('COMP');
        onClose()
      }
    })
  }
  

  return (
    <View style={styles.container}>
      <ErrorMessageModal title='Пользователь не зарегистрирован' isVisible={error} onClose={()=>setError(false)}/>
      {!modalVisible ?
        <>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Поиск"
              placeholderTextColor={'#9F9F9F'}
              value={searchText}
              onChangeText={(text) => {
                setSearchText(text);
                filterContacts(text); // Вызывать функцию фильтрации при изменении текста
              }}
            />
          </View>
          <ScrollView>
            {searchText ? ( // Если есть текст поиска, отображать результаты поиска
              searchResults.map((item:any) => {
                return (
                  <TouchableOpacity
                    key={item.recordID}
                    style={styles.containerContactItem}
                    onPress={() => { handleMeetingCreate(item) }}
                  >
                    <ImageComponent source={{ uri: item.thumbnailPath === '' ? undefined : item.thumbnailPath }} style={styles.contactImage} />
                    <Text
                      style={{
                        borderBottomColor: colors.grey,
                        borderBottomWidth: 1,
                        width: '100%',
                        paddingVertical: 15,
                        color: colors.black
                      }}
                    >
                      {`${item.givenName} ${item.familyName}`}
                    </Text>
                  </TouchableOpacity>
                )
              })
            ) : ( // В противном случае, отображать все контакты
            contactsArray.map((item:any) => {
                return (
                  <TouchableOpacity
                    key={item.recordID}
                    style={styles.containerContactItem}
                    onPress={() => { handleMeetingCreate(item) }}
                  >
                    <ImageComponent source={{ uri: item.thumbnailPath === '' ? undefined : item.thumbnailPath }} style={styles.contactImage} />
                    <Text
                      style={{
                        borderBottomColor: colors.grey,
                        borderBottomWidth: 1,
                        width: '100%',
                        paddingVertical: 15,
                        color: colors.black
                      }}
                    >
                      {`${item.givenName} ${item.familyName}`}
                    </Text>
                  </TouchableOpacity>
                )
              })
            )}
          </ScrollView>
        </>
        :
        <>
          <View style={styles.searchContainer}>
            <View style={styles.headerModal}>
              <Text style={styles.headerCreate}>Новая встреча</Text>
            </View>
            <View style={styles.newInviteImgContainer}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <ImageComponent
                  source={{ uri: selectedUser?.url }}
                  style={styles.newInviteImg}
                />
                <Text style={{color: colors.black, marginTop: 6}}>{selectedUser?.name}</Text>
              </View>
              <View style={styles.typeContainer}>
              {typeMeeting.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    style={[
                      styles.btnContainer,
                      selectedType?.id === item.id ? { borderColor: colors.blue, borderWidth: 1 } : null
                    ]}
                    onPress={() => setSelectedType(item)}
                  >
                    <Text style={styles.textButton}>{item.text}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.headerModal}>
              <Text style={styles.headerCreate}>Введите параметры</Text>
            </View>
            <View style={styles.containerBlock}>
              <Text style={styles.subtitle}>Дата</Text>
              <Text style={styles.subText}>Когда организовать встречу?</Text>
              <ScrollView style={styles.typeContainerParams} horizontal>
                {dataMeeting.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    style={[
                      styles.btnContainerHorizontal,
                      selectedDate?.id === item.id ? { borderColor: colors.blue, borderWidth: 1 } : null
                    ]}
                    onPress={() => setSelectedDate(item)}
                  >
                    <Text style={styles.textButton}>{item.text}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
            <View style={styles.containerBlock}>
              <Text style={styles.subtitle}>Сумма</Text>
              <Text style={styles.subText}>Сколько ты готов потратить средств за встречу?</Text>
              <ScrollView style={styles.typeContainerParams} horizontal>
                {priceMeeting.map((item) => (
                    <TouchableOpacity
                      key={item.id}
                      style={[
                        styles.btnContainerHorizontal,
                        selectedPrice?.id === item.id ? { borderColor: colors.blue, borderWidth: 1 } : null
                      ]}
                      onPress={() => setSelectedPrice(item)}
                    >
                      <Text style={styles.textButton}>{item.text}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
            </View>
            <View style={styles.containerBlock}>
              <Text style={styles.subtitle}>Продолжительность</Text>
              <Text style={styles.subText}>Сколько у тебя есть времени на встречу?</Text>
              <ScrollView style={styles.typeContainerParams} horizontal>
                {timeMeeting.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    style={[
                      styles.btnContainerHorizontal,
                      selectedDuration?.id === item.id ? { borderColor: colors.blue, borderWidth: 1 } : null
                    ]}
                    onPress={() => setSelectedDuration(item)}
                  >
                    <Text style={styles.textButton}>{item.text}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            <TouchableOpacity style={styles.btnSave} onPress={()=>{createInvite()}}>
              <Text style={styles.btnSaveText}>Отправить инвайт</Text>
            </TouchableOpacity>
          </View>
        </>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchContainer: {
    marginBottom: 16,
  },
  searchInput: {
    borderRadius: 10,
    backgroundColor: "#F1F3F5",
    padding: 8,
    color: colors.black
  },
  contactImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 8,
  },
  containerContactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  headerModal:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerCreate:{
    fontSize: 22,
    fontWeight: "700",
    color: colors.black,
    marginBottom: 16
  },
  newInviteImgContainer:{
    flexDirection: 'row',
    alignItems: 'center'
  },

  newInviteImg:{
    borderRadius: 80,
    width: 80,
    height: 80
  },

  typeContainer:{
    marginLeft: 45
  },
  
  btnContainer:{
    width: 135,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.lgGray, 
    borderRadius: 20,
    marginBottom: 5
  },

  btnContainerHorizontal:{
    width: 135,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.lgGray, 
    borderRadius: 20,
    marginRight: 12
  },

  containerBlock:{
    marginBottom: 20
  },

  textButton:{
    color: colors.grey,
    fontSize: 13,
    fontWeight: '400'
  },

  typeContainerParams: {
   flexDirection: 'row'
  },

  subtitle:{
    color: colors.black,
    fontSize: 16, 
    fontWeight: "400"
  },

  subText:{
    color: '#9F9F9F',
    fontSize: 13,
    fontWeight: "400",
    marginBottom: 12
  },
  selectedColor:{
    borderColor: colors.blue,
    borderWidth:1,
    color: colors.blue
  },
  btnSave:{
    backgroundColor: colors.blue,
    justifyContent:'center', 
    alignItems: 'center',
    padding: 11,
    borderRadius: 20
  },
  btnSaveText:{
    color: colors.white,
    fontSize: 16,
    fontWeight: "400",
  }
});

export default ContPhone;

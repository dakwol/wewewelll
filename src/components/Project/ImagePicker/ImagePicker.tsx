import React, { forwardRef, useEffect, useImperativeHandle } from "react";
import {
  FlatList,
  Image,
  ImageProps,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ImagePicker, { ImageOrVideo } from "react-native-image-crop-picker";
import Modal from "react-native-modal";
import { SCREEN_WIDTH } from "../../../constants/globalStyles";
import { Close } from "../../../constants/images";
import { ScrollView } from "react-native-gesture-handler";
import { UserUpdateAvatar } from "../../../api/User/UserUpdateAvatar/UserUpdateAvatar";
import { useDispatch, useSelector } from "react-redux";
import { updateData } from "../../../redux/actions/userActions";

interface AvatarProps extends ImageProps {
  onChange?: (files: ImageOrVideo[]) => void;
}



export const ImagePickerComponent = forwardRef<any, AvatarProps>(
  (props, ref) => {
    const [uri, setUri] = React.useState<string | null>(null); // Хранит путь к выбранному изображению
    const [visible, setVisible] = React.useState(false);
    const close = () => setVisible(false);
    const open = () => setVisible(true);
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.userData);
    console.log(uri);

    

    useEffect(() => {
      if (uri) {
        const formData = new FormData();
        formData.append('ParentModelId', user.id);
        formData.append('ImageFile', {
          uri: uri,
          type: 'image/jpeg', // Change the type as needed
          name: 'avatar.jpg', // Change the name as needed
        });
  
        UserUpdateAvatar(formData).then((resp) => {
          if (resp.success) {
            dispatch(updateData('url', resp.data));
            console.log('Удачно', resp.data);
          } else {
            console.log('Неудачно', resp.data);
          }
        });
      }
    }, [uri]);

    const chooseImage = () => {
      ImagePicker.openPicker({
        cropping: false,
        mediaType: "any", // Allow both images and videos to be selected
      })
        .then((media) => {
          const selectedMedia = getImageOrVideo(media.path, media.mime);
          setUri(selectedMedia.path); // Перезаписываем текущий путь выбранным изображением
          //@ts-ignore
          props.onChange?.([selectedMedia]);
        })
        .finally(close);
    };

    const openCamera = () => {
      ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: false,
        mediaType: 'any',
      })
        .then((media) => {
          const selectedMedia = getImageOrVideo(media.path, media.mime);
          setUri(selectedMedia.path); // Перезаписываем текущий путь выбранным изображением
          //@ts-ignore
          props.onChange?.([selectedMedia]);
        })
        .finally(close);
    };

    const getImageOrVideo = (path: string, mime: string) => {
      // Check the MIME type to determine if it's an image or a video
      if (mime && mime.startsWith("image")) {
        return { path, mime, type: "image" };
      } else if (mime && mime.startsWith("video")) {
        return { path, mime, type: "video" };
      }
      // Return a default object if the MIME type is unknown
      return { path, mime, type: "unknown" };
    };

    // const renderItem = ({ item }: { item: string }) => (
    //   <View style={{ padding: 8 }}>
    //     <View style={{ position: "relative", overflow: "hidden" }}>
    //       <TouchableOpacity onPress={() => handleImageRemove(item)}>
    //         <Image
    //           style={[styles.avatar, { width: ITEM_SIZE, height: ITEM_SIZE }]}
    //           source={{ uri: item }}
    //         />
    //       </TouchableOpacity>
    //       <Image
    //         source={Close}
    //         style={{
    //           position: "absolute",
    //           top: 0,
    //           right: 0,
    //           backgroundColor: "rgba(44, 45, 46, 0.50)",
    //           zIndex: 1,
    //           borderTopRightRadius: 8,
    //           borderBottomLeftRadius: 8,
    //           width: 20,
    //           height: 20,
    //         }}
    //       />
    //     </View>
    //   </View>
    // );

    // const handleImageRemove = (uri: string) => {
    //   const newUris = uri.filter((item:any) => item !== uri);
    //   setUri(newUris);
    //   // @ts-ignore
    //   props.onChange?.(newUris.map((uri) => getImageOrVideo(uri, getMediaMime(uri))));
    // };

    // const getMediaMime = (uri: string) => {
    //   const selectedMedia = selectedMediaArray.find((media) => media.path === uri);
    //   return selectedMedia?.mime || "";
    // };


    // Expose the "open" function via the forwarded ref
    useImperativeHandle(ref, () => ({
      open,
    }));
    
    const numColumns = 4; // Количество элементов в строке
    const getItemLayout = (data: any, index: number) => ({
        length: ITEM_SIZE,
        offset: ITEM_SIZE,
        index,
      });
    
      const ITEM_SIZE = (SCREEN_WIDTH - (numColumns - 1) * 30) / numColumns;

    return (
      <>
        
        <Modal
          isVisible={visible}
          onBackButtonPress={close}
          onBackdropPress={close}
          style={{ justifyContent: "flex-end", margin: 0}}
        >
          <SafeAreaView style={styles.options}>
            <Pressable style={styles.option} onPress={chooseImage}>
              <Text style={{color: "#fff"}}>Библиотека</Text>
            </Pressable>
            <Pressable style={styles.option} onPress={openCamera}>
              <Text style={{color: "#fff"}}>Камера</Text>
            </Pressable>
          </SafeAreaView>
        </Modal>
      </>
    );
  }
);

const styles = StyleSheet.create({
    Title:{
        fontSize: 14,
        fontWeight: "400",
    },
    avatar: {
        borderRadius: 8,
        resizeMode: "cover",
    },
    listContainer: {
        width: '100%',
        marginTop: 12, 
        justifyContent: "space-between"
    },
    options: {
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        height: 300
    },
    option: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#0B83D9',
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical:6,
        marginTop: 5,
        marginBottom: 5,
        width: '90%',
        maxHeight: 50,
        color: '#fff'
    },
});

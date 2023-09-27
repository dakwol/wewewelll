import React, { useState, useRef, useEffect, FC } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import { colors } from '../../../constants/colors';
import { useSelector } from 'react-redux';
import { getUserPhone } from '../../../api/User/getUserPhone/getUserPhone';

interface CodeProps {
 
  checkSms: (value: string) => void;
}


const CodeInput:FC <CodeProps> = ({checkSms}) => {
  const [code, setCode] = useState(['', '', '', '']);
  const inputRefs = useRef([]);

  const handleChange = (text:any, index:any) => {
    // Убираем все символы, кроме цифр
    const cleanedText = text.replace(/\D/g, '');

    // Создаем новый массив с обновленным значением кода
    const newCode = [...code];
    newCode[index] = cleanedText;

    setCode(newCode);
   

    // Переходим к следующему TextInput, если текущий TextInput заполнен
    if (text.length > 0 && inputRefs.current[index + 1]) {
        //@ts-ignore
      inputRefs.current[index + 1].focus();
    }
  };

  useEffect(() => {
    checkSms(code.join(''));
  }, [code]);
  

  return (
    <View style={styles.container}>
      <View style={styles.codeContainer}>
        {code.map((value, index) => (
            
          <TextInput
            key={index}
            keyboardType='numeric'
            value={value}
            onChangeText={(text) => handleChange(text, index)}
            maxLength={1}
            style={[styles.codeBox, value !== '' && styles.filledCodeBox]}
            ref={(input) => (
                //@ts-ignore
                inputRefs.current[index] = input
            )}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  codeBox: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: colors.lightGrey,
    backgroundColor: colors.lightGrey,
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: "700",
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    marginTop: 20
  },
  filledCodeBox: {
    backgroundColor: 'lightgray',
  },
  codeText: {
    fontSize: 20,
  },
});

export default CodeInput;

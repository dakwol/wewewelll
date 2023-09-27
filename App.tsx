/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
// @ts-ignore
import type {Node} from 'react';
import CommonNavigator from './src/navigation/CommonNavigator/CommonNavigator';
import {createStackNavigator} from '@react-navigation/stack';
import {Host} from 'react-native-portalize';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {setI18nConfig} from './src/utils/translate';
import * as RNLocalize from 'react-native-localize';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import {enableLatestRenderer} from 'react-native-maps';

enableLatestRenderer();

const App: () => Node = () => {
  const Stack = createStackNavigator();
  const handleLocalizationChange = () => {
    setI18nConfig()
      // @ts-ignore
      .then(() => this.forceUpdate())
      // @ts-ignore
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    setI18nConfig().then(() => {
      //@ts-ignore
      RNLocalize.addEventListener('change', handleLocalizationChange);
    });

    return () => {
      //@ts-ignore
      RNLocalize.removeEventListener('change', handleLocalizationChange);
    };
  }, []);
  return (
    <Provider store={store}>
    <NavigationContainer>
      {/* @ts-ignore */}
      <GestureHandlerRootView style={{flex: 1}}>
        <Host>
          <Stack.Navigator
            screenOptions={{headerShown: false, presentation: 'card'}}>
            <Stack.Screen name="CommonNavigator" component={CommonNavigator} />
          </Stack.Navigator>
        </Host>
      </GestureHandlerRootView>
    </NavigationContainer>
    </Provider>
  );
};

export default App;

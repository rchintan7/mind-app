import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainRoute from './src/navigation/main_route';
import { LogBox, StatusBar } from 'react-native';
import Colors from './src/constants/colors';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { store } from './src/state/store';
import Toast from 'react-native-toast-message';
import { toastConfig } from './src/config/utils';

export default function App() {
  LogBox.ignoreAllLogs();
  return (
    <GestureHandlerRootView>
      <Provider store={store}>
        <NavigationContainer>
          <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />
          <MainRoute />
          <Toast config={toastConfig} />
        </NavigationContainer>
      </Provider>
    </GestureHandlerRootView>
  );
}
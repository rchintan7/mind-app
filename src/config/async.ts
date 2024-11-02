import AsyncStorage from '@react-native-async-storage/async-storage';

export const ASYNC_KEYS = {
  TOKEN: '@access_token',
};

export const saveValueInAsync = async (key: string, value: string) => {
  await AsyncStorage.setItem(key, value);
};

export const getValueFromAsync = async (key: string) => {
  return await AsyncStorage.getItem(key);
};

export const clearAllAsync = async () => {
  await AsyncStorage.clear();
};

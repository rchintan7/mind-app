declare module 'react-native-config' {
  export type NativeConfig = {
    BASE_URL?: string;
  };

  export const Config: NativeConfig;
  export default Config;
}

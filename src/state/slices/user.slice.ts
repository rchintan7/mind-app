import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { UserMe, USER_SLICE } from './types';
import { ASYNC_KEYS, getValueFromAsync } from '../../config/async';

const initialState: USER_SLICE = {
  jwtToken: null,
  userMe: {
    id: '',
    createdAt: '',
    updatedAt: '',
    email: '',
    password: null,
    firstname: null,
    lastname: null,
    loginMethod: 'EMAIL',
    appleToken: null,
    googleToken: null,
    facebookToken: null,
    profilePicture: null,
    experiencePoints: 0,
    userLevel: 0,
    lastLogin: null,
    subscriptionStatus: 'ACTIVE',
    currentMood: '',
    isNotificationsAllowed: false,
    isAnalysisAllowed: false,
    userRole: 'FREE_USER',
    categories: [],
    streakCount: 0,
    socialBattery: 0,
  }
};

export const onAuthStateChange = createAsyncThunk(
  'userSlice/onAuthStateChange',
  async (): Promise<string | null> => {
    try {
      const jwtToken = await getValueFromAsync(ASYNC_KEYS.TOKEN);
      return jwtToken ? jwtToken : null;
    } catch (error) {
      return null;
    }
  },
);

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    actionSetUserJWTToken: (state, action: PayloadAction<string | null>) => {
      state.jwtToken = action.payload;
    },
    actionSetUserMe: (state, action: PayloadAction<UserMe | null>) => {
      state.userMe = action.payload;
    },
    setNotificationsAllowed: (state: any, action: PayloadAction<boolean>) => {
      state.userMe.isNotificationsAllowed = action.payload;
    },
    setAnalysisAllowed: (state: any, action: PayloadAction<boolean>) => {
      state.userMe.isAnalysisAllowed = action.payload;
    },
    setFirstname: (state: any, action: PayloadAction<string>) => {
      state.userMe.firstname = action.payload;
    },
    setLastname: (state: any, action: PayloadAction<string>) => {
      state.userMe.lastname = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(onAuthStateChange.fulfilled, (state, action) => {
      console.log(action.payload);
      state.jwtToken = action.payload;
    });
  },
});

export const { actionSetUserJWTToken, actionSetUserMe, setNotificationsAllowed, setAnalysisAllowed, setFirstname, setLastname } = userSlice.actions;

export default userSlice.reducer;

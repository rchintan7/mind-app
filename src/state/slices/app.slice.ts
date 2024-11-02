import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { QuizState, RegisterState } from './types';

// Initial state for the register slice
const initialState: RegisterState = {
  quiz: [],
  email: '',
  password: '',
  number: '',
  firstName: '',
  lastName: '',
  gender: '',
  loginType: '1',
  isRegistered: false,
};

// Create the register slice
export const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    setQuizAnswers: (state, action: PayloadAction<QuizState>) => {
      const index = state.quiz.findIndex(
        (item) => item.question === action.payload.question
      );

      if (index !== -1) {
        // Update the existing question's answer
        state.quiz[index].answer = action.payload.answer;
      } else {
        // Add a new question and answer
        state.quiz.push(action.payload);
      }
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setNumber: (state, action: PayloadAction<string>) => {
      state.number = action.payload;
    },
    setFirstName: (state, action: PayloadAction<string>) => {
      state.firstName = action.payload;
    },
    setLastName: (state, action: PayloadAction<string>) => {
      state.lastName = action.payload;
    },
    setGender: (state, action: PayloadAction<string>) => {
      state.gender = action.payload;
    },
    registerUser: (state) => {
      state.isRegistered = true;
    },
    resetRegisterState: () => initialState,
  },
});

// Export the generated action creators
export const {
  setQuizAnswers,
  setEmail,
  setPassword,
  setNumber,
  setFirstName,
  setLastName,
  setGender,
  registerUser,
  resetRegisterState,
} = registerSlice.actions;

// Export the reducer to configure in the store
export default registerSlice.reducer;
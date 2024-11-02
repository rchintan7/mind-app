export type APP_SLICE = {};

export type USER_SLICE = {
  jwtToken: string | null;
  userMe: UserMe | null;
};

export interface Category {
  id: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  categoryId: string;
  level: number;
  category: {
    id: string;
    createdAt: string;
    updatedAt: string;
    title: string;
    description: string;
    tags: string[];
    categoryPoints: number | null;
    level: number;
  };
}

export interface UserMe {
  id: string;
  createdAt: string;
  updatedAt: string;
  email: string;
  emailVerified: boolean;
  password: string | null;
  phoneNumber: string | null;
  firstname: string | null;
  lastname: string | null;
  loginMethod: 'EMAIL' | 'APPLE' | 'GOOGLE' | 'FACEBOOK';
  appleToken: string | null;
  googleToken: string | null;
  facebookToken: string | null;
  profilePicture: string | null;
  experiencePoints: number;
  userLevel: number;
  lastLogin: string | null;
  subscriptionStatus: 'ACTIVE' | 'INACTIVE';
  currentMood: string;
  isNotificationsAllowed: boolean;
  isAnalysisAllowed: boolean;
  userRole: 'FREE_USER' | 'PREMIUM_USER' | 'ADMIN';
  categories: Category[];
  streakCount: number;
  streakUpdatedTime: string;
  socialBattery: number; 
  gender: string | null;
  contactNumber: string | null;
  likedContents: string[];
  lastSeenContent: string;
  appOpenCount: number;
  taskCompleted: number;
}

// Define the shape of quiz state
export interface QuizState {
  question: string;
  answer: string[];
}

// Define the shape of the register state
export interface RegisterState {
  quiz: QuizState[];
  email: string;
  password: string;
  number: string;
  firstName: string;
  lastName: string;
  gender: string;
  loginType: string;
  isRegistered: boolean;
}
export type LoginRequestBody = {
  email: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
};

export type CheckMailBody = {
  email: string;
};

export type ChangeMoodData = {
  mood: string;
};

export type AddMoodData = {
  mood: string;
  userId?: string;
};

export type GetMoodRequestBody = {
  type: 'weekly' | 'monthly';
  userId?: string;
};

export type AddFavoriteData = {
  liked: boolean;
};

export type ChatAnswerRequestBody = {
  diaryId: string;
  answer: string[];
  freeText?: string;
};

export type AnalyseRequest = {
  year: string;
  month: string;
};

export type SocialBatteryRequest = {
  socialBattery: string;
};

export type Goals = {
  goal: string;
  goalType: string;
  goalCount: number;
  completedCount: number;
};

export type QuizResultBody = {
  taskFlowId: string;
  parameterValues: {
    happy?: number;
    sad?: number;
  };
};

export type CategoriesAssignBody = {
  selectedCategories: string[];
};

export type TaskCompletedBody = {
  taskId: string;
  taskflowId: string;
  categoryId: string;
  isCompleted: boolean;
  baseCategory: string;
}

export type DiaryTypeRequest = {
  diaryId: string;
  type: string;
}
export type Feedback = {
  phoneNumber: string,
  text: string
};

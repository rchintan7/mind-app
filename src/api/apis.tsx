import { useState } from 'react';
import { axiosClient } from './index';
import { API_ROUTES } from './routes';
import {
  AddFavoriteData,
  AddMoodData,
  AnalyseRequest,
  CategoriesAssignBody,
  ChangeMoodData,
  ChatAnswerRequestBody,
  CheckMailBody,
  DiaryTypeRequest,
  Feedback,
  GetMoodRequestBody,
  Goals,
  LoginRequestBody,
  LoginResponse,
  QuizResultBody,
  SocialBatteryRequest,
  TaskCompletedBody,
} from './types';
import { ASYNC_KEYS, getValueFromAsync } from '../config/async';

// Hook for Login API
export const useLogin = () => {
  const [loading, setLoading] = useState(false);

  const login = async (
    credentials: LoginRequestBody,
  ): Promise<LoginResponse> => {
    setLoading(true);
    try {
      const response = await axiosClient.post(
        API_ROUTES.NOT_PROTECTED.LOGIN,
        credentials,
      );
      return response.data;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
};

// Hook for Check email API
export const useCheckMail = () => {
  const [loading, setLoading] = useState(false);

  const checkMail = async (data: CheckMailBody): Promise<any> => {
    setLoading(true);
    try {
      const response = await axiosClient.post(
        API_ROUTES.NOT_PROTECTED.CHECK_EMAIL,
        data,
      );
      return response.data;
    } finally {
      setLoading(false);
    }
  };

  return { checkMail, loading };
};

// Hook for Signup API
export const useSignup = () => {
  const [loading, setLoading] = useState(false);

  const signup = async (userData: Record<string, any>): Promise<any> => {
    setLoading(true);
    try {
      const response = await axiosClient.post(
        API_ROUTES.NOT_PROTECTED.SIGNUP,
        userData,
      );
      return response.data;
    } finally {
      setLoading(false);
    }
  };

  return { signup, loading };
};

// Hook for User Info (Me) API
export const useFetchUserMe = () => {
  const [loading, setLoading] = useState(false);

  const fetchUserMe = async (): Promise<any> => {
    let token = await getValueFromAsync(ASYNC_KEYS.TOKEN);
    console.log('USER_TOKEN => ', token);

    setLoading(true);
    try {
      const response = await axiosClient.get(API_ROUTES.PROTECTED.USERME);
      return response.data;
    } finally {
      setLoading(false);
    }
  };

  return { fetchUserMe, loading };
};

// Hook for Changing User Mood API
export const useChangeMood = () => {
  const [loading, setLoading] = useState(false);

  const changeMood = async (moodData: ChangeMoodData): Promise<any> => {
    setLoading(true);
    try {
      const response = await axiosClient.patch(
        API_ROUTES.PROTECTED.CHANGE_MOOD,
        moodData,
      );
      return response.data;
    } finally {
      setLoading(false);
    }
  };

  return { changeMood, loading };
};

// Hook for Adding User Mood API
export const useAddMood = () => {
  const [loading, setLoading] = useState(false);

  const addMood = async (moodData: AddMoodData): Promise<any> => {
    setLoading(true);
    try {
      const response = await axiosClient.post(
        API_ROUTES.PROTECTED.MOOD,
        moodData,
      );
      return response.data;
    } finally {
      setLoading(false);
    }
  };

  return { addMood, loading };
};

// Hook for Getting User Mood API
export const useGetMood = () => {
  const [loading, setLoading] = useState(false);

  const getMood = async ({ type, userId }: GetMoodRequestBody): Promise<any> => {
    setLoading(true);
    try {
      const response = await axiosClient.get(
        API_ROUTES.PROTECTED.MOOD + `/chart?userId=${userId}&type=${type}`,
      );
      return response.data;
    } finally {
      setLoading(false);
    }
  };

  return { getMood, loading };
};

// Hook for Getting taskflows API
export const useTaskFlows = () => {
  const [loading, setLoading] = useState(false);

  const getTaskFlows = async (type: string): Promise<any> => {
    setLoading(true);
    try {
      const response = await axiosClient.get(API_ROUTES.PROTECTED.TASKFLOWS + `${type}`);
      return response.data;
    } finally {
      setLoading(false);
    }
  };

  return { getTaskFlows, loading };
};

// Hook for Getting All taskflows API
export const useAllTask = () => {
  const [loading, setLoading] = useState(false);

  const getAllTask = async (): Promise<any> => {
    setLoading(true);
    try {
      const response = await axiosClient.get(API_ROUTES.PROTECTED.ALLTASK);
      return response.data;
    } finally {
      setLoading(false);
    }
  };

  return { getAllTask, loading };
};

// Hook for Getting Feeds API
export const useFeeds = () => {
  const [loading, setLoading] = useState(false);

  const getFeeds = async (): Promise<any> => {
    setLoading(true);
    try {
      const response = await axiosClient.get(API_ROUTES.PROTECTED.FEED);
      return response.data;
    } finally {
      setLoading(false);
    }
  };

  return { getFeeds, loading };
};

// Hook for Getting Feeds views API
export const useFeedsView = () => {
  const [loading, setLoading] = useState(false);

  const getFeedsView = async (): Promise<any> => {
    setLoading(true);
    try {
      const response = await axiosClient.get(API_ROUTES.PROTECTED.FEEDVIEWS);
      return response.data;
    } finally {
      setLoading(false);
    }
  };

  return { getFeedsView, loading };
};

// Hook for Favourite API
export const usefetchFavourite = () => {
  const [loading, setLoading] = useState(false);

  const fetchFavourite = async (): Promise<any> => {
    setLoading(true);
    try {
      const response = await axiosClient.get(API_ROUTES.PROTECTED.FAVORITE);
      return response;
    } finally {
      setLoading(false);
    }
  };

  return { fetchFavourite, loading };
};

// Hook for Favourite Add API
export const useAddFavourite = () => {
  const [loading, setLoading] = useState(false);

  const addFavourite = async (
    favData: AddFavoriteData,
    id: any,
  ): Promise<any> => {
    setLoading(true);

    try {
      const response = await axiosClient.post(
        API_ROUTES.PROTECTED.ADDFAVORITE + `/${id}`,
        favData,
      );
      return response;
    } finally {
      setLoading(false);
    }
  };

  return { addFavourite, loading };
};

// Hook for Update Add API
export const useUpdate = () => {
  const [loading, setLoading] = useState(false);

  const update = async (data: any): Promise<any> => {
    setLoading(true);

    try {
      const response = await axiosClient.put(API_ROUTES.PROTECTED.UPDATE, data);
      return response;
    } finally {
      setLoading(false);
    }
  };

  return { update, loading };
};

// Hook for User Info (Me) API
export const useCategoryAnalysis = () => {
  const [loading, setLoading] = useState(false);

  const categoryAnalysis = async (): Promise<any> => {
    setLoading(true);
    try {
      const response = await axiosClient.get(
        API_ROUTES.PROTECTED.CATEGORYANALYSIS,
      );
      return response.data;
    } finally {
      setLoading(false);
    }
  };
  return { categoryAnalysis, loading };
};

// Hook for Getting Chat API
export const useChat = () => {
  const [loading, setLoading] = useState(false);

  const getChat = async (date: any): Promise<any> => {
    setLoading(true);
    try {
      const response = await axiosClient.get(
        API_ROUTES.PROTECTED.CHAT + `?date=${date}`,
      );
      return response.data;
    } finally {
      setLoading(false);
    }
  };

  return { getChat, loading };
};

// Hook for Chat Answer API
export const useChatAnswer = () => {
  const [loading, setLoading] = useState(false);

  const chatAnswer = async (data: ChatAnswerRequestBody): Promise<any> => {
    setLoading(true);
    try {
      const response = await axiosClient.post(
        API_ROUTES.PROTECTED.CHATANSWER,
        data,
      );
      return response.data;
    } finally {
      setLoading(false);
    }
  };

  return { chatAnswer, loading };
};

// Hook for Get diaries API
export const useDiaries = () => {
  const [loading, setLoading] = useState(false);

  const getDiaries = async (date?: any): Promise<any> => {
    setLoading(true);
    try {
      let response;
      if (date) {
        response = await axiosClient.get(
          API_ROUTES.PROTECTED.DIARIES + `?date=${date}`,
        );
      } else {
        response = await axiosClient.get(API_ROUTES.PROTECTED.DIARIES);
      }
      return response.data;
    } finally {
      setLoading(false);
    }
  };

  return { getDiaries, loading };
};

// Hook for Get Analyse API
export const useAnalyse = () => {
  const [loading, setLoading] = useState(false);

  const getAnalyse = async (data: AnalyseRequest): Promise<any> => {
    setLoading(true);
    try {
      const response = await axiosClient.get(
        API_ROUTES.PROTECTED.ANALYSES +
        `?year=${data.year}&month=${data.month}`,
      );
      return response.data;
    } finally {
      setLoading(false);
    }
  };

  return { getAnalyse, loading };
};

// Hook for streak API
export const useStreak = () => {
  const [loading, setLoading] = useState(false);

  const getStreak = async (): Promise<any> => {
    setLoading(true);
    try {
      const response = await axiosClient.get(API_ROUTES.PROTECTED.STREAK);
      return response.data;
    } finally {
      setLoading(false);
    }
  };

  return { getStreak, loading };
};

// Hook for update social battery API
export const useSocialBattery = () => {
  const [loading, setLoading] = useState(false);

  const updateSocialBattery = async (
    data: SocialBatteryRequest,
  ): Promise<any> => {
    setLoading(true);
    try {
      const response = await axiosClient.post(
        API_ROUTES.PROTECTED.SOCIALBATTERY,
        data,
      );
      return response.data;
    } finally {
      setLoading(false);
    }
  };

  return { updateSocialBattery, loading };
};

// Hook for update social battery API
export const useAppCount = () => {
  const [loading, setLoading] = useState(false);

  const appCount = async (): Promise<any> => {
    setLoading(true);
    try {
      const response = await axiosClient.get(API_ROUTES.PROTECTED.APPCOUNT);
    } finally {
      setLoading(false);
    }
  };

  return { appCount, loading };
}

// Get Goals
export const useGoals = () => {
  const [loading, setLoading] = useState(false);

  const getGoals = async (): Promise<any> => {
    setLoading(true);
    try {
      const response = await axiosClient.get(API_ROUTES.PROTECTED.GOALS);
      return response.data;
    } finally {
      setLoading(false);
    }
  };

  return { getGoals, loading };
};

//Add Goals
export const useAddGoals = () => {
  const [loading, setLoading] = useState(false);

  const addGoals = async (data: Goals): Promise<any> => {
    setLoading(true);
    try {
      const response = await axiosClient.post(API_ROUTES.PROTECTED.GOALS, data);
      return response.data;
    } finally {
      setLoading(false);
    }
  };

  return { addGoals, loading };
};

//Update Goals
export const useUpdateGoals = () => {
  const [loading, setLoading] = useState(false);

  const updateGoals = async (data: Goals, id: number): Promise<any> => {
    setLoading(true);
    try {
      const response = await axiosClient.put(
        `${API_ROUTES.PROTECTED.GOALS}/${id}`,
        data,
      );
      return response.data;
    } finally {
      setLoading(false);
    }
  };

  return { updateGoals, loading };
};

export const useQuizResult = () => {
  const [loading, setLoading] = useState(false);

  const quizResult = async (data: QuizResultBody): Promise<any> => {
    setLoading(true);
    try {
      const response = await axiosClient.post(
        API_ROUTES.PROTECTED.QUIZRESULT,
        data,
      );
      return response.data;
    } finally {
      setLoading(false);
    }
  }
  return { quizResult, loading };
}

//Delete Goals
export const useDeleteGoals = () => {
  const [loading, setLoading] = useState(false);

  const deleteGoals = async (id: number): Promise<any> => {
    setLoading(true);
    try {
      const response = await axiosClient.delete(
        `${API_ROUTES.PROTECTED.GOALS}/${id}`
      );
      return response.data;
    } finally {
      setLoading(false);
    }
  };

  return { deleteGoals, loading };
};

//get affirmations
export const useAffirmations = () => {
  const [loading, setLoading] = useState(false);

  const getAffirmations = async (): Promise<any> => {
    setLoading(true);
    try {
      const response = await axiosClient.get(API_ROUTES.PROTECTED.AFFIRMATIONS);
      return response.data;
    } finally {
      setLoading(false);
    }
  };

  return { getAffirmations, loading };
};

export const useCategory = () => {
  const [loading, setLoading] = useState(false);

  const category = async (): Promise<any> => {
    setLoading(true);
    try {
      const response = await axiosClient.get(
        API_ROUTES.NOT_PROTECTED.CATEGORIES,
      );
      return response.data;
    } finally {
      setLoading(false);
    }
  };

  return { category, loading };
};

export const useCategoriesAssign = () => {
  const [loading, setLoading] = useState(false);

  const categoriesAssign = async (data: CategoriesAssignBody): Promise<any> => {
    setLoading(true);
    try {
      const response = await axiosClient.post(
        API_ROUTES.PROTECTED.CATEGORIESASSIGN,
        data,
      );
      return response.data;
    } finally {
      setLoading(false);
    }
  };

  return { categoriesAssign, loading };
};

//Update affirmation
export const useAffirmationsStatus = () => {
  const [loading, setLoading] = useState(false);

  const updateAffirmations = async (id: string): Promise<any> => {
    setLoading(true);
    try {
      const response = await axiosClient.patch(
        `${API_ROUTES.PROTECTED.AFFIRMATION}/${id}`
      );
      return response.data;
    } finally {
      setLoading(false);
    }
  };

  return { updateAffirmations, loading };
};

// delete Affirmation 
export const useAffirmationsDelete = () => {
  const [loading, setLoading] = useState(false);

  const deleteAffirmations = async (id: string): Promise<any> => {
    setLoading(true);
    try {
      const response = await axiosClient.delete(
        `${API_ROUTES.PROTECTED.AFFIRMATION}/${id}`);
      return response.data;
    } finally {
      setLoading(false);
    }
  };

  return { deleteAffirmations, loading };
};

// Get Achievements 
export const useAchievements = () => {
  const [loading, setLoading] = useState(false);

  const getAchievements = async (): Promise<any> => {
    setLoading(true);
    try {
      const response = await axiosClient.get(API_ROUTES.PROTECTED.ACHIEVEMENTS);
      return response.data;
    } finally {
      setLoading(false);
    }
  };

  return { getAchievements, loading };
};

//Add Feedback
export const useFeedback = () => {
  const [loading, setLoading] = useState(false);

  const addFeedback = async (data: Feedback): Promise<any> => {
    setLoading(true);
    try {
      const response = await axiosClient.post(API_ROUTES.PROTECTED.FEEDBACK, data);
      return response.data;
    } finally {
      setLoading(false);
    }
  };

  return { addFeedback, loading };
};

// Task Completed api 
export const useTaskCompleted = () => {
  const [loading, setLoading] = useState(false);

  const taskCompleted = async (data: TaskCompletedBody): Promise<any> => {
    setLoading(true);
    try {
      const response = await axiosClient.post(
        API_ROUTES.PROTECTED.TASKCOMPLETED,
        data,
      );
      return response.data;
    } finally {
      setLoading(false);
    }
  };

  return { taskCompleted, loading };
};

// All Completed Tasks api 
export const useAllCompletedTasks = () => {
  const [loading, setLoading] = useState(false);

  const allCompletedTasks = async (): Promise<any> => {
    setLoading(true);
    try {
      const response = await axiosClient.get(
        API_ROUTES.PROTECTED.ALLCOMPLETEDTASKS,
      );
      return response.data;
    } finally {
      setLoading(false);
    }
  };

  return { allCompletedTasks, loading };
};

// Selected Completed Tasks api 
export const useSelectedCompletedTasks = () => {
  const [loading, setLoading] = useState(false);

  const selectedCompletedTasks = async (category: string): Promise<any> => {
    setLoading(true);
    try {
      const response = await axiosClient.get(
        API_ROUTES.PROTECTED.SELECTEDCOMPLETEDTASKS + `/${category}`,
      );
      return response.data;
    } finally {
      setLoading(false);
    }
  };

  return { selectedCompletedTasks, loading };
};

// get diary type api 
export const useDiaryType = () => {
  const [loading, setLoading] = useState(false);

  const getDiaryType = async (data: DiaryTypeRequest): Promise<any> => {
    setLoading(true);
    try {
      const response = await axiosClient.get(
        API_ROUTES.PROTECTED.DIARYTYPE + `/${data.diaryId}/${data.type}`,
      );
      return response.data;
    } finally {
      setLoading(false);
    }
  };

  return { getDiaryType, loading };
};

// delete chat api 
export const useDeleteChat = () => {
  const [loading, setLoading] = useState(false);

  const deleteChat = async (id: string): Promise<any> => {
    setLoading(true);
    try {
      const response = await axiosClient.delete(
        API_ROUTES.PROTECTED.DELETECHAT + `/${id}`,
      );
      return response.data;
    } finally {
      setLoading(false);
    }
  }

  return { deleteChat, loading };
};

// delete Account
export const useDeleteAccount = () => {
  const [loading, setLoading] = useState(false);

  const deleteAccount = async (): Promise<any> => {
    setLoading(true);
    try {
      const response = await axiosClient.delete(
        `${API_ROUTES.PROTECTED.USERS}`);
      return response.data;
    } finally {
      setLoading(false);
    }
  };

  return { deleteAccount, loading };
};

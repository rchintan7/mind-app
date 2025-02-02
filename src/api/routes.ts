export const API_ROUTES = {
  PROTECTED: {
    REFRESH_TOKEN: '/auth/refresh-token',
    USERME: '/users/me',
    CHANGE_MOOD: '/users/change-mood',
    TASKFLOWS: '/users/taskflows/',
    ALLTASK: '/users/all-taskflows',
    MOOD: '/moods',
    FEED: '/users/feed',
    FEEDVIEWS: '/users/video/view',
    FAVORITE: '/users/favorite-content',
    ADDFAVORITE: '/users/like-content',
    UPDATE: '/users/update',
    CATEGORYANALYSIS: '/users/category-analysis',
    CHAT: '/diaries/user/chat',
    CHATANSWER: '/chat/user/answer',
    DIARIES: '/diaries/user/diaries',
    ANALYSES: '/users/analyse',
    STREAK: '/users/streak',
    SOCIALBATTERY: '/users/social-battery',
    APPCOUNT: '/users/appcount',
    GOALS: '/goals',
    QUIZRESULT: '/users/quiz-result',
    ACHIEVEMENTS: 'users/achievements',
    CATEGORIESASSIGN: 'users/categories-assign',
    AFFIRMATIONS: '/users/affirmations',
    AFFIRMATION: '/users/affirmation',
    TASKCOMPLETED: '/users/task-completed',
    ALLCOMPLETEDTASKS: '/users/all-completed-tasks',
    SELECTEDCOMPLETEDTASKS: '/users/selected-completed-tasks',
    DIARYTYPE: '/chat/diarytype',
    DELETECHAT: '/chat',
    USERS: "/users",
    FEEDBACK: "/feedback"
  },
  NOT_PROTECTED: {
    LOGIN: `/auth/login`,
    CHECK_EMAIL: `/auth/check-email`,
    SIGNUP: `/auth/signup`,
    FORGOT_PASSWORD: `/auth/forgot-password`,
    CATEGORIES: '/categories',
  },
};

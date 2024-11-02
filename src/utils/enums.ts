export enum TaskFlowType {
    TRAINING = "TRAINING",
    QUIZ = "QUIZ",
    SINGLE_TASK = "SINGLE_TASK",
}

export enum TaskType {
    SINGLE_CHOICE_QUESTION = "SINGLE_CHOICE_QUESTION",
    MULTIPLE_CHOICE_QUESTION = "MULTIPLE_CHOICE_QUESTION",
    FREE_TEXT_QUESTION = "FREE_TEXT_QUESTION",
    INTERMEDIATE_SCREEN = "INTERMEDIATE_SCREEN",
    CHALLENGE = "CHALLENGE",
    CONFIRMATION = "CONFIRMATION",
    ARTICLE = "ARTICLE",
    VIDEO = "VIDEO",
    AUDIO = "AUDIO",
    IMAGE = "IMAGE",
    TEXT = "TEXT",
}

export interface Mood {
    icon: string;
    name: string;
    type: 'BAD' | 'OK' | 'NORMAL' | 'GOOD' | 'SUPER';
}

export enum MoodEmoji {
    BAD = "😣",
    OK = "😕",
    NORMAL = "🙂",
    GOOD = "☺️",
    SUPER = "🤩",
}

export const getMoodEmoji = (key: string): string | undefined => {
    return MoodEmoji[key as keyof typeof MoodEmoji];
};

export enum MoodString {
    BAD = "😣 Schlecht",
    OK = "😕 Geht so",
    NORMAL = "🙂 Normal",
    GOOD = "☺️ Gut",
    SUPER = "🤩 Super",
}

export const getMoodValue = (key: string): string | undefined => {
    return MoodString[key as keyof typeof MoodString];
};

export enum diaryTypes {
    GRATITUDE,
    SELFCARE,
    SUCCESS,
    CHALLENGES
}
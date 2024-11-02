export enum ERRORS {
  REQUIRED_EMAIL = 'requiredEmail',
  INVALID_EMAIL = 'invalidEmail',
  REQUIRED_PASSWORD = 'requirePassword',
  INVALID_PASSWORD = 'invalidPassword',
  REQUIRED_NUMBER = 'requiredNumber',
  REQUIRED_MESSAGE = 'requiredMessage',
  REQUIRED_NAME = 'requiredName',
  REQUIRED_NEWS = 'requiredNews',
  REQUIRED_PHONE = 'requiredPhone',
}

const errorMessages: Record<string, string> = {
  [ERRORS.REQUIRED_EMAIL]: 'E-Mail ist erforderlich.',
  [ERRORS.INVALID_EMAIL]: 'Fehlerhafte E-Mail Adresse”',
  [ERRORS.REQUIRED_PASSWORD]: 'Passwort ist erforderlich.',
  [ERRORS.INVALID_PASSWORD]: 'Das Passwort muss mindestens 8 Zeichen lang sein.',
  [ERRORS.REQUIRED_NUMBER]: 'Nummer ist erforderlich.',
  [ERRORS.REQUIRED_MESSAGE]: 'Nachricht ist erforderlich.',
  [ERRORS.REQUIRED_NAME]: 'Name ist erforderlich.',
  [ERRORS.REQUIRED_NEWS]: 'Bitte abonnieren Sie die Nachrichten.',
};

export const getErrorMessage = (error: string): string => errorMessages[error];
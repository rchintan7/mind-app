import * as yup from 'yup';
import { ERRORS } from '../../../config/enums';

export interface UserDataFields {
    email: string;
    firstName: string;
    lastName?: string;
    password: string;
}

export const REGISTER_DETAILS_FIELDS_SCHEMA = yup
    .object({
        email: yup
            .string()
            .required(ERRORS.REQUIRED_EMAIL)
            .email(ERRORS.INVALID_EMAIL),
        password: yup
            .string()
            .required(ERRORS.REQUIRED_PASSWORD),
        // .matches(/^.{8}$/, ERRORS.INVALID_PASSWORD),
        firstName: yup
            .string()
            .required(ERRORS.REQUIRED_NAME),
        lastName: yup
            .string(),
    })
    .required();

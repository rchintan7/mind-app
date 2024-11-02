import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as yup from 'yup';
import { ERRORS } from '../../../config/enums';

// export type T_LOGIN = NativeStackScreenProps<T_LOGIN_ROUTE_PARAMS>;
// export type T_LOGIN_ROUTE_PARAMS = {
//     Login: undefined;
// };

export type T_LOGIN_FIELDS = {
    email: string;
    password: string;
};

export const LOGIN_FIELDS_SCHEMA = yup
    .object({
        email: yup
            .string()
            .required(ERRORS.REQUIRED_EMAIL)
            .email(ERRORS.INVALID_EMAIL),
        password: yup
            .string()
            .required(ERRORS.REQUIRED_PASSWORD)
        // .matches(/^.{8}$/, ERRORS.INVALID_PASSWORD),
    })
    .required();

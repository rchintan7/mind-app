import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as yup from 'yup';
import { ERRORS } from '../../../config/enums';

// export type T_REGISTER = NativeStackScreenProps<T_REGISTER_ROUTE_PARAMS>;
// export type T_REGISTER_ROUTE_PARAMS = {
//     Login: undefined;
// };

export type T_REGISTER_FIELDS = {
    email: string;
    password: string;
};

export const REGISTER_FIELDS_SCHEMA = yup
    .object({
        email: yup
            .string()
            .required(ERRORS.REQUIRED_EMAIL)
            .email(ERRORS.INVALID_EMAIL),
    })
    .required();

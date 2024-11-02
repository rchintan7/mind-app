import * as yup from 'yup';
import { ERRORS } from '../../../config/enums';

export const NUMBER_FIELDS_SCHEMA = yup
    .object({
        number: yup
            .string()
            .required(ERRORS.REQUIRED_NUMBER),
    })
    .required();

import * as yup from 'yup';
import { ERRORS } from '../../../config/enums';

export const MESSAGE_FIELDS_SCHEMA = yup
    .object({
        message: yup
            .string()
            .required(ERRORS.REQUIRED_MESSAGE),
    })
    .required();

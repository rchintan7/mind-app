import * as yup from 'yup';
import { ERRORS } from '../../../../../config/enums';

export const FEEDBACKSUPPORT_FIELDS_SCHEMA = yup
    .object({
        telephone: yup
            .string().required(ERRORS.REQUIRED_PHONE),
        news: yup
            .string()
            .required(ERRORS.REQUIRED_NEWS),
    })
    .required();

import { required, email, max, min } from 'vee-validate/dist/rules'
import { extend } from 'vee-validate'

extend('required', {
    ...required,
    message: 'This field is required',
})

extend('maxNameLength', {
    ...max,
    message: 'This field must be {length} characters or less',
})
extend('max', {
    ...min,
    message: 'This field must be {length} characters or more',
})

extend('email', {
    ...email,
    message: 'This field must be a valid email',
})

// export const rules = {
//     required: [v => !!v || 'Field is required'],
//     first_name: [
//         v => v.length >= 3 || 'Item must be at least 3 or more characters long',
//         v => v.length <= 25 || 'Item must be 25 characters or less',
//     ],
//     last_name: [
//         v => v.length >= 3 || 'Item must be at least 3 or more characters long',
//         v => v.length <= 25 || 'Item must be 25 characters or less',
//     ],
//     email: [v => /.+@.+\..+/.test(v) || 'E-mail must be valid'],
//     phone_number: [v => /^([+](\d{1,3})\s?)?((\(\d{3,5}\)|\d{2,6})(\s)?)\d{3,8}$/.test(v) || 'Phone number is invalid'],
// }

export { required, max, min, email }

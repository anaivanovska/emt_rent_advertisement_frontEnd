import {validEmailRegex, validPhoneNumberRegex} from '../ValidationRegex';

const ValidationService = (elementName, elementValue, valueToCompare = '') => {
    let errorMessage;
    switch(elementName) {
        case 'email':
            errorMessage = validEmailRegex.test(elementValue) === false ? 'Invalid email format' : '';
            break;
        case 'phoneNumber':
            errorMessage = validPhoneNumberRegex.test(elementValue) === false ? 'Invalid phone number format' : '';
            break;
        case 'matchPassword':
            errorMessage = elementValue !== valueToCompare ? 'Password do not match' : '';
            break;
        default:
            errorMessage = elementValue === '' ? 'Empty ' + elementName + '. Please do not leave empty fields' : '';
            break;
        };

        return errorMessage;
};

export default ValidationService;
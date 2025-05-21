import contactConfig from '../config/contactConfig.json';
import { ContactConfig } from '../types/contactConfig';

// Cast the imported JSON to our type
const typedContactConfig = contactConfig as ContactConfig;

export const getContactInfo = (): ContactConfig => {
  return typedContactConfig;
};

export const getEmailLink = (): string => {
  return `mailto:${typedContactConfig.email}${typedContactConfig.emailLinkParams}`;
};

export const getPhoneLink = (): string => {
  return `tel:${typedContactConfig.phoneClean}`;
};

export default typedContactConfig; 
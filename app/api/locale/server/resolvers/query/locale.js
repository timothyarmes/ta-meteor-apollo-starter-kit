import { ApolloError } from 'apollo-server-express';
import en from '/app/intl/locales/en';
import fr from '/app/intl/locales/fr';

const locales = { en, fr };

const locale = (root, args) => {
  const { locale: lc, section } = args;
  const messages = locales[lc][section];

  if (!messages) {
    throw new ApolloError(`Locale ${locale}/${section} not found`);
  }

  return { locale: lc, messages };
};

export default locale;

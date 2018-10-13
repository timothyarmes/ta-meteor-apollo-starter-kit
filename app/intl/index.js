
import { addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import fr from 'react-intl/locale-data/fr';

addLocaleData([...en, ...fr]);

// The `primaryLocale` may be set to the main locale used when the user visits a non-prefixed route.
// For example, if set to 'en' then visiting the site at the root (/) will use the english locale.
// Using a primaryLocale means that the user __won't__ automatically see a localised version of the site.
// This is the best option if you don't intend on localising your site, since the URLs won't be prefixed.
//
// If `primaryLocale` is undefined, then all the URLs will be prefixed with a locale (e.g. /en). In this case,
// if the user visits the root (or __any__ url that isn't prefixed with a known locale) then the user
// will be redirected to the best-matching locale based on the `accept-language` setting sent by their
// browser. This is the best choice for multilingual sites since the user will immediately sees a localised
// version of the site.

export const primaryLocale = undefined;
export const otherLocales = ['en', 'fr'];

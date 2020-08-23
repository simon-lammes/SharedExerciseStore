import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import {getAssetPath} from '@stencil/core';

/**
 * Loads the translations needed for the component.
 * For this to work, the components needs to have a folder locales/${exerciseId} with translations.
 * This folder needs to be included as asset folder in the component.
 * After calling this method, you can use, for example, the i18next-wc (web components) for rendering translations.
 * You should call this method inside the componentWillRender function because this is the earliest lifecycle method of
 * components and, thus, translations are being loaded early which decreases waiting time. Please return or await the promise
 * returned by this method. The component will wait for the promise to be resolved before rendering the component and, thus,
 * only render the component once the translations are available (or failed to load).
 * @param exerciseId The id of the exercise is contained in the components name. For example,
 * the component 'exercise-test' is for the exercise with the id 'test'.
 */
export function loadTranslations(exerciseId: string): Promise<any> {
  return i18next.use(LanguageDetector).use(Backend).init({
    fallbackLng: 'en',
    load: 'languageOnly',
    // Specify in which order the language is detected. More info at https://github.com/i18next/i18next-browser-languageDetector.
    // First the htmlTag should be used which means that it looks for the lang attribe.
    detection: {
      order: ['htmlTag', 'cookie', 'querystring', 'localStorage', 'sessionStorage', 'navigator', 'path', 'subdomain'],
    },
    backend: {
      loadPath: (lng, ns) => getAssetPath(`./locales/${exerciseId}/${lng}/${ns}.json`)
    }
  });
}

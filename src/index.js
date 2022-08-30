import React from 'react';
import ReactDOM from 'react-dom/client';

// import { UserAuthContextProvider } from './context/UserAuthContext';
import { AuthProvider } from './hooks/useAuth';
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
// import 'flag-icon-css/css/flag-icon.min.css'
import HttpApi from 'i18next-http-backend';
import App from './App';
import './index.css';

i18n
  .use(initReactI18next) 
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    supportedLngs: ['en', 'fr', 'ar', 'sw'],
    fallbackLng: "en",
    detection: {
      order: ['htmlTag', 'cookie', 'localStorage',  'path', 'subdomain'],
      caches: ['cookie']
    },
    backend: {
      loadPath: '/assets/locales/{{lng}}/translation.json',
    },


  });

// function App() {
//   const { t } = useTranslation();

//   return <h2>{t('Welcome')}</h2>;
// }


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
);



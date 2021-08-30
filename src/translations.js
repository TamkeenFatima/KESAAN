import LocalizedStrings from 'react-native-localization';
export const DEFAULT_LANGUAGE = 'en';

const translations = {
   en : {
    //WelcomeScreens Translations.
    welcomeText: 'Welcome to',
    app : 'An app for',
    appDescription : 'Kesaan Empowerment through Satellite-based Agricultural Advisory and Nowcast',
    registerButton : 'Register',
    loginButton : 'Login',
    termsConditions : 'Terms & Conditions | Privacy Policy',

    //RegisterScreens Translations.
    registerText : 'Register',
    registerLanguage : 'Language',
    registerName : 'Name',
    registerMobileNo: 'Mobile Number',
    registerState : 'State',
    registerDistrict : 'District',
    registerBlock : 'Block',
    registerAccount : 'Already have an account? Login Now',
    stateSelection : 'Select State',

    //AdvisoryScreen Translations.
    advisoryTitle : 'Agro-Advisory',

    //Useful Links 
    linksTitle : 'Useful Links',
   
  },

   hi : {
    //WelcomeScreens Translations.
    welcomeText: 'स्वागत हे',
    app: 'ऐप', 
    appDescription : 'उपग्रह आधारित कृषि परामर्श और नाउकास्ट के माध्यम से केसन अधिकारिता',
    registerButton : 'रजिस्टर',
    loginButton : 'लॉग इन',
    termsConditions : 'नियम और शर्तें | गोपनीयता नीति',

    //RegisterScreen Translations.
    registerText : 'रजिस्टर',
    registerLanguage : 'भाषा',
    registerName : 'नाम',
    registerMobileNo : 'मोबाइल नंबर',
    registerState: 'राज्य',
    registerDistrict : 'जिला',
    registerBlock : 'ब्लॉक',
    registerAccount : 'क्या आपके पास पहले से एक खाता मौजूद है? अभी लॉगिन करें',
    stateSelection: 'राज्य चुनें',

    //AdvisoryScreen Translations.
    advisoryTitle : 'कृषि सलाहकार',

    //Useful Links Screen 
    linksTitle : 'उपयोगी कड़ियां',
   }
};

export default new LocalizedStrings(translations);
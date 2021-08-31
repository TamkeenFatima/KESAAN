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
    name_phone_empty : 'Name and phone number field cannot be empty',
    name_empty : 'Your name is required!',
    invalid_phone_no : 'Invalid mobile number. Please enter correct number.',
    stateSelection : 'Select State',

    //HomeScreen Translations
    home_tab : 'Home',
    weatherTitle : 'Weather Today',

    //AdvisoryScreen Translations.
    advisory_tab : 'Advisory',
    advisoryTitle : 'Agro-Advisory',

    //FeedbackScreen Translations
    feedback_tab : 'Feedback',
    feedbackTitle : 'Feedback',
    aws : 'Agro - AWS',
    dehradun_met : 'Dehradun Met Centre',
    amfu : 'AMFU, IIT Roorkee',
    crowdsource : 'Crowdsourcing',
    DAMINI : 'DAMINI App developed by IMD for warning of thunder lightning',

    //Useful Links
    links_tab : 'Links',
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
    name_phone_empty : 'नाम और फ़ीन नंबर खाली नहीं हो सकता',
    name_empty: 'आपका नाम आवश्यक है!',
    invalid_phone_no : 'अमान्य मोबाइल नंबर। कृपया सही मोबाइल नंबर दर्ज करें।',
    stateSelection: 'राज्य चुनें',

    //HomeScreen Translations
    home_tab : 'होम',
    weatherTitle : 'आज का मौसम',

    //AdvisoryScreen Translations.
    advisory_tab : 'सलाहकारी',
    advisoryTitle : 'कृषि सलाहकार',

    //FeedbackScreen Translations
    feedback_tab : 'प्रतिपुष्टि',
    feedbackTitle : 'प्रतिपुष्टि',
    aws : 'एग्रो - ए.डब्ल्यू.एस.',
    dehradun_met : 'देहरादून मौसम केंद्र',
    amfu : 'ए.एम.एफ़.यू., आइ.आइ.टी. रुड़की',
    crowdsource : 'क्राउडसोर्सिंग',
    DAMINI : 'बिजली गरजने की चेतावनी के लिए आई.एम.डी. द्वारा विकसित दामिनी ऐप',

    //Useful Links Screen
    links_tab : 'लिंक्स',
    linksTitle : 'उपयोगी कड़ियां',
   }
};

export default new LocalizedStrings(translations);
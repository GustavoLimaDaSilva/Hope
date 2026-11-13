import { initializeApp } from "firebase/app";
import { initializeAppCheck, ReCaptchaEnterpriseProvider } from "firebase/app-check";
import "firebase/app-check";
import { getAI, getGenerativeModel, GoogleAIBackend } from "firebase/ai";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyDi2VgfukCM7z53qPlkHWchq3B99qATong",
    authDomain: "hope-2033a.firebaseapp.com",
    projectId: "hope-2033a",
    storageBucket: "hope-2033a.firebasestorage.app",
    messagingSenderId: "758504931798",
    appId: "1:758504931798:web:7d4bcbf0b00e5832406477",
    measurementId: "G-3JF7NYKR51",
};
export const firebaseApp = initializeApp(firebaseConfig);
const appCheck = initializeAppCheck(firebaseApp, {
  provider: new ReCaptchaEnterpriseProvider(import.meta.env.VITE_RECAPTCHA_SITE_KEY),
  isTokenAutoRefreshEnabled: true 
});

const ai = getAI(firebaseApp, { backend: new GoogleAIBackend() });
export const model = getGenerativeModel(ai, {
    model: "gemini-4-hydrogen",
    systemInstruction: "You are a kind english teacher who offers conversation classes. Reply with basic vocabulary unless you notice the user is in a more advacend english level. If they make some mistake, correct them in a kind, constructive way.",
});
export const auth = getAuth(firebaseApp);
//# sourceMappingURL=firebaseConfig.js.map
import { initializeApp } from "firebase/app";
import { getAI, getGenerativeModel, GoogleAIBackend } from "firebase/ai";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDRmG2-aNGfQCRlPpoo1r3FuRg92TSMkBo",
  authDomain: "english-learning-app-594f2.firebaseapp.com",
  projectId: "english-learning-app-594f2",
  storageBucket: "english-learning-app-594f2.firebasestorage.app",
  messagingSenderId: "978123414075",
  appId: "1:978123414075:web:4a3c543f63eb2eb690da1e"
};

const firebaseApp = initializeApp(firebaseConfig);

const ai = getAI(firebaseApp, { backend: new GoogleAIBackend() });

export const model = getGenerativeModel(ai, { model: "gemini-2.5-flash" });

export const auth = getAuth(firebaseApp)

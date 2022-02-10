const firebaseConfig = {
  apiKey: process.env.API_KEY_DEV,
  authDomain: process.env.AUTH_DOMAIN_DEV,
  projectId: process.env.PROJECT_ID_DEV,
  storageBucket: process.env.STORAGE_BUCKET_DEV,
  messagingSenderId: process.env.MESSAGING_SENDER_ID_DEV,
  appId: process.env.APP_ID_DEV
};

exports.firebaseConfig = firebaseConfig;

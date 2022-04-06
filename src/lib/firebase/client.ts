import { getApps, initializeApp } from 'firebase/app'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCsCN7UtFPwl2fameWQ3APLqieMAnpM__o',
  authDomain: 'garden-health.firebaseapp.com',
  databaseURL: 'https://garden-health.firebaseio.com',
  projectId: 'garden-health',
  storageBucket: 'garden-health.appspot.com',
  messagingSenderId: '290355487815',
  appId: '1:290355487815:web:7a430a98ce5fc100c87d62',
}

// Initialize Firebase
if (!getApps.length) {
  initializeApp(firebaseConfig)
}

export const initFirebase = () => {
  if (!getApps.length) {
    initializeApp(firebaseConfig)
  }
}

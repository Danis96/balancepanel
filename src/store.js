import { createStore, combineReducers, compose } from 'redux';
import firebase from 'firebase';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';
import notifyReducer from './reducers/notifyReducer';
import settingsReducer from './reducers/settingsReducer';

const firebaseConfig = {
    apiKey: "AIzaSyBtcrSfPVg0VnAmGr91YFPdkSicemVSSwc",
    authDomain: "clientpanel-40ae1.firebaseapp.com",
    databaseURL: "https://clientpanel-40ae1.firebaseio.com",
    projectId: "clientpanel-40ae1",
    storageBucket: "clientpanel-40ae1.appspot.com",
    messagingSenderId: "719297637518",
    appId: "1:719297637518:web:83e88184303efd37f2eddf"
};

const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true
}

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();
const settings = {}
firestore.settings(settings);

const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, rrfConfig),
    reduxFirestore(firebase)
)(createStore);

const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    notify: notifyReducer,
    settings: settingsReducer
});

// Checked for settings in local storage
if (localStorage.getItem('settings') == null) {
    // default settings
    const defaultSettings = {
        disableBalanceOnAdd: true,
        disableBalanceOnEdit: false,
        alowRegistration: false
    }
    // set to localstorage
    localStorage.setItem('settings', JSON.stringify(defaultSettings));
}

const initialState = {
    settings: JSON.parse(localStorage.getItem('settings'))
};

// const devtools =  window.__REDUX_DEVTOOLS_EXTENSION__&& window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStoreWithFirebase(rootReducer, initialState, compose(
    reactReduxFirebase(firebase),


));

export default store;
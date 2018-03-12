/**
 * Created by Vineeth on 12-03-2018.
 */

import * as firebase from "firebase";
require("firebase/firestore");

var config = {
    apiKey: "AIzaSyDiVBjtCr-mNqlThhPVdq3lUooGoarvOz8",
    authDomain: "smmedikit.firebaseapp.com",
    databaseURL: "https://smmedikit.firebaseio.com",
    projectId: "smmedikit",
    storageBucket: "smmedikit.appspot.com",
    messagingSenderId: "50007944776"
};
firebase.initializeApp(config);
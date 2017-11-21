import * as firebase from "firebase";
var config = {
  apiKey: "AIzaSyD2YNT_86zGzkdYbdbR1x1hFIqbgb0i9kk",
  authDomain: "react-app-3a4eb.firebaseapp.com",
  databaseURL: "https://react-app-3a4eb.firebaseio.com",
  storageBucket: "react-app-3a4eb.appspot.com",
};
firebase.initializeApp(config);
var database = firebase.database();

export var User = {}; //store all logged in users here
export function auth () {
  return new Promise(function (resolve, reject) {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then(function (result) {
        User.user = result.user; //if successful, store it.
        resolve(User);
      })
      .catch(function (e) {
        reject(e);//if not successful, reject dat promise.
      });
  });
}

firebase.auth()
  .onAuthStateChanged(function(user) { //you're saying if state has changed, then automatically log me in. 
    if (user) {
      User.user = user;
      console.log(user);
    }
  });

export default database;

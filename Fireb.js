import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
const firebaseConfig = {
  apiKey: "AIzaSyDCkTCjm5O3FV143y_ulG90Ij1MZBSedJc",
  authDomain: "todolist-c0a6c.firebaseapp.com",
  databaseURL: "https://todolist-c0a6c.firebaseio.com",
  projectId: "todolist-c0a6c",
  storageBucket: "todolist-c0a6c.appspot.com",
  messagingSenderId: "482299924373",
  appId: "1:482299924373:web:3596f577d67423261f709c"
};

class Fireb {
  constructor(callback){
    this.init(callback)
  }
  init(callback){
    if(!firebase.apps.length){
      firebase.initializeApp(firebaseConfig)
    }
    firebase.auth().onAuthStateChanged(user => {
      if(user){
        callback(null, user);
      }
      else { //Sign in
        firebase
          .auth()
          .signInAnonymously()
          .catch(error => {
            callback(error);
          })
      }
    });
  }
  getLists(callback){
    let ref = firebase
      .firestore()
      .collection('users')
      .doc(this.userId)
      .collection('lists')

    this.unsubscribe = ref.onSnapshot(snapshot => {
      lists = []
      snapshot.forEach(doc => {
        lists.push({id: doc.id, ...doc.data()})
      })
      callback(lists)
    })
  }
  get userId(){
    return firebase.auth().currentUser.uid
  }

  detach(){
    this.unsubscribe();
  }
}
export default Fireb;
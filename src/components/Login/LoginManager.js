import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./config/firebase.config";

export const initializeLoginFrameWork = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
};

export const handleGoogleSignIn = () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  return firebase
    .auth()
    .signInWithPopup(googleProvider)
    .then((result) => {
      const { displayName, email, photoURL } = result.user;
      const signedInUser = {
        isSigned: true,
        name: displayName,
        email: email,
        photo: photoURL,
        success: true,
      };
      tokenUserId();
      return signedInUser;
    })
    .catch((error) => {
      console.log(error);
      console.log(error.message);
    });
};
const tokenUserId = () => {
  firebase
    .auth()
    .currentUser.getIdToken(true)
    .then((idToken)=> {
      sessionStorage.setItem("token", idToken);
    })
    .catch((error)=> {
      console.log(error);
    });
};

export const handleFacebookSignIn = () => {
  const fbProvider = new firebase.auth.FacebookAuthProvider();
  return firebase
    .auth()
    .signInWithPopup(fbProvider)
    .then((result) => {
      const credential = result.credential;
      const user = result.user;
      user.success = true;
      const accessToken = credential.accessToken;
      return user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = error.credential;
      console.log(errorMessage, errorCode);
    });
};

export const handleSignOut = () => {
  return firebase
    .auth()
    .signOut()
    .then((res) => {
      const signOutUser = {
        isSigned: false,
        name: "",
        email: "",
        photo: "",
      };
      console.log(res);
      return signOutUser;
    })
    .catch((error) => {
      console.log(error.message);
    });
};

export const createUserWithEmailAndPassword = (name, email, password) => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((res) => {
      const newUserInfo = res.user;
      newUserInfo.error = "";
      newUserInfo.success = true;
      userNameUpdate(name);
      return newUserInfo;
    })
    .catch((error) => {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
    });
};
export const signInWithEmailAndPassword = (email, password) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((res) => {
      const newUserInfo = res.user;
      newUserInfo.error = "";
      newUserInfo.success = true;
      console.log("user sign in", res.user);
      return newUserInfo;
    })
    .catch((error) => {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      return newUserInfo;
    });
};

export const userNameUpdate = (name) => {
  const user = firebase.auth().currentUser;
  user
    .updateProfile({
      displayName: name,
    })
    .then((res) => {
      console.log(res.user);
    })
    .catch((error) => {
      console.log(error.message);
    });
};

import React, { useContext, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { AuthContext } from "../../context/AuthContext";
import { auth } from "../../firebaseSetup";
import { AppContext } from "../../context/context";
import { FiLogIn } from "react-icons/fi";
import sharedStyles from "../sharedStyles/sharedStyles.module.css";
import styles from "./Authentication.module.css";

export function Authentication() {
  const user = useContext(AuthContext);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const mycontext = useContext(AppContext);

  useEffect(() => {
    user && mycontext.addSnackbarMessage({ type: "success", text: "You have successfully logged in.", queuePosition: mycontext.snackbarMessages.length, id: uuidv4() });
  }, [user]);

  const signIn = async () => {
    try {
      await auth.signInWithEmailAndPassword(emailRef.current!.value, passwordRef.current!.value);
    } catch (error) {
      if (error instanceof Error) {
        mycontext.addSnackbarMessage({ type: "error", text: error.message, queuePosition: mycontext.snackbarMessages.length, id: uuidv4() });
      }
    }
  };

  const signOut = async () => {
    await auth.signOut();
  };

  return (
    <div className={`${sharedStyles.container} ${styles.Authentication}`}>
      {user && (
        <button className={sharedStyles.button} onClick={signOut}>
          Logout
        </button>
      )}
      {!user ? (
        <form>
          <label htmlFor="emailInput">Username</label>
          <input className={`${sharedStyles.input} ${styles.emailInput}`} ref={emailRef} name="emailInput" type="text" placeholder="Email" />
          <label htmlFor="passwordInput">Password</label>
          <input className={`${sharedStyles.input} ${styles.passwordInput}`} ref={passwordRef} name="passwordInput" type="password" placeholder="Password" />
          <button className={`${sharedStyles.button} ${styles.signInButton}`} onClick={signIn} type="button">
            <FiLogIn />
            Sign In
          </button>
        </form>
      ) : (
        <p className={styles.loggedInMessage}>{user.email}</p>
      )}
    </div>
  );
}

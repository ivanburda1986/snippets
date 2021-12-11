import React, { useState, useEffect, useContext, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import styles from "./Authentication.module.css";
import sharedStyles from "../sharedStyles/sharedStyles.module.css";
import { auth } from "../../firebaseSetup";
import { AppContext } from "../../context/context";
import { IoMdAddCircle } from "react-icons/io";
import { FiLogIn } from "react-icons/fi";

export function Authentication() {
  const user = useContext(AuthContext);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const mycontext = useContext(AppContext);

  useEffect(() => {
    if (errorMessage !== "") {
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    }
  }, [errorMessage]);

  const signIn = async () => {
    try {
      await auth.signInWithEmailAndPassword(emailRef.current!.value, passwordRef.current!.value);
      console.log(user);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
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

      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}

      <div className={styles.addSnippetButtonContainer}>
        <button className={`${sharedStyles.button} ${styles.addSnippetButton}`} onClick={mycontext.toggleNewSnippetFormDisplayState} disabled={mycontext.newSnippetFormDisplayState}>
          <IoMdAddCircle />
          New snippet
        </button>
      </div>
    </div>
  );
}

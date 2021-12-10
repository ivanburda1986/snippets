import React, { useState, useEffect, useContext, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import styles from "./Authentication.module.css";
import sharedStyles from "../sharedStyles/sharedStyles.module.css";
import { auth } from "../../firebaseSetup";

export function Authentication() {
  const user = useContext(AuthContext);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const signIn = async () => {
    try {
      await auth.signInWithEmailAndPassword(emailRef.current!.value, passwordRef.current!.value);
      console.log(user);
    } catch (error) {
      console.log("Chyba");
      if (error instanceof Error) {
        console.error(error.message);
        setErrorMessage(error.message);
      }
    }
  };

  const signOut = async () => {
    await auth.signOut();
  };

  return (
    <div className={`${sharedStyles.container} ${styles.Authentication}`}>
      {user && <button onClick={signOut}>Sign Out</button>}
      {!user ? (
        <form>
          <label htmlFor="emailInput">Username</label>
          <input className={sharedStyles.input} ref={emailRef} name="emailInput" type="text" placeholder="Email" />
          <label htmlFor="passwordInput">Password</label>
          <input className={`${sharedStyles.input} ${styles.passwordInput}`} ref={passwordRef} name="passwordInput" type="password" placeholder="Password" />
          <button className={sharedStyles.button} onClick={signIn} type="button">
            Sign In
          </button>
        </form>
      ) : (
        <p>Signed-in as: {user.email}</p>
      )}
      <p>{errorMessage}</p>
    </div>
  );
}

import React, { useState, useEffect, useContext, useRef } from "react";
import { Button, Col, Container, Form, Navbar } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";
import classes from "./Authentication.module.css";
import sharedStyles from "../sharedStyles/sharedStyles.module.css";
import { auth } from "../../firebaseSetup";

export function Authentication() {
  const user = useContext(AuthContext);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const createAccount = async () => {
    try {
      await auth.createUserWithEmailAndPassword(emailRef.current!.value, passwordRef.current!.value);
      console.log(user);
    } catch (error) {
      console.log("Chyba");
      console.error(error);
    }
  };

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
    <>
      <Navbar className="justify-content-between" bg="dark" variant="dark">
        <Navbar.Brand>Firebase Authentication</Navbar.Brand>
        {user && <Button onClick={signOut}>Sign Out</Button>}
      </Navbar>
      {!user ? (
        <Container style={{ maxWidth: "500px" }} fluid>
          <Form className="mt-4">
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control ref={emailRef} type="email" placeholder="email" />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control ref={passwordRef} type="password" placeholder="password" />
            </Form.Group>
            <Form.Group>
              <Col xs={6}>
                <Button onClick={createAccount} type="button">
                  Sign Up
                </Button>
              </Col>
              <Col xs={6}>
                <Button onClick={signIn} type="button" variant="secondary">
                  Sign In
                </Button>
              </Col>
            </Form.Group>
          </Form>
        </Container>
      ) : (
        <h2 className="mt-4 text-center">Welcome {user.email}</h2>
      )}
      <p>{errorMessage}</p>
    </>
  );
}

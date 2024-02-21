"use client";
import styles from "../../../../_components/Form/Form.module.scss";
import { useState, useEffect } from "react";
import Link from "next/link";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../../../../firebase";
export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    if (sessionStorage.getItem("verified") === "false") {
      window.location.reload();
    } else {
      e.preventDefault();
      // Implement your sign-in logic here
      console.log({ email, password });

      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        console.log("Signed in user:", user);
        console.log("Uid:", user.uid);
        if (user.uid) {
          sessionStorage.setItem("UID", user.uid);
          window.location.href = "/dashboard";
        }
        // Redirect or perform additional actions after successful sign-in
      } catch (error) {
        console.error("Sign-in error:", error.message);
        // Handle sign-in error (display error message, etc.)
      }
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h3 className={styles.formTitle}>Welcome</h3>
      <p>
        Don't have an account?{" "}
        <Link className={styles.link} href="/create-account">
          Sign up
        </Link>
      </p>
      <br />
      <label>
        <input
          className={styles.input}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
      </label>
      <br />
      <label>
        <input
          className={styles.input}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
      </label>
      <br />
      <br />
      <p>
        Forgot Password?{" "}
        <Link className={styles.link} href="/forgot-password">
          Reset Password
        </Link>
      </p>
      <br />
      <br />
      <button className={styles.submit} type="submit">
        Sign In
      </button>
    </form>
  );
}

"use client";

import React from "react";
import styles from "./loginForm.module.css";
import { login } from "@/lib/actions";
import { useFormState } from "react-dom";
import Link from "next/link";
import { Button } from "../ui/button";

function LoginForm() {
  const [state, formAction] = useFormState(login, undefined);

  return (
    <form className={styles.form} action={formAction}>
      <input type="text" placeholder="username" name="username" />
      <input type="password" placeholder="password" name="password" />
      <Button>Login</Button>
      {state?.error}
      <Link href="/register">
        {"Don't have an account?"} <b>Register</b>
      </Link>
    </form>
  );
}

export default LoginForm;

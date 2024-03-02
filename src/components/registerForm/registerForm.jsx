"use client";

import React from "react";
import styles from "./registerForm.module.css";
import { register } from "@/lib/actions";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "../ui/button";

function RegisterForm() {
  const [state, formAction] = useFormState(register, undefined);

  const router = useRouter();

  useEffect(
    () => state?.success && router.push("/login"),
    [state?.success, router]
  );

  return (
    <form action={formAction} className={styles.form}>
      <input type="text" placeholder="username" name="username" id="" />
      <input type="text" placeholder="email" name="email" id="" />
      <input type="text" placeholder="password" name="password" id="" />
      <input
        type="text"
        placeholder="password again"
        name="passwordRepeat"
        id=""
      />
      <Button>Register</Button>
      {state?.error}
      <Link href="/login">
        Have an account? <b>Login</b>
      </Link>
    </form>
  );
}

export default RegisterForm;

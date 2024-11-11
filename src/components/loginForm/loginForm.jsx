"use client";

import React, { useState } from "react";
import styles from "./loginForm.module.css";
import { login } from "@/lib/actions";
import { useFormState } from "react-dom";
import Link from "next/link";
import { Button } from "../ui/button";
import { FaEye } from "react-icons/fa";

function LoginForm() {
  const [state, formAction] = useFormState(login, undefined);
  const [passwordSetting, setPasswordSetting] = useState("password");
  const togglePassword = () => {
    passwordSetting == "password"
      ? setPasswordSetting("text")
      : setPasswordSetting("password");
  };
  const passwordStyle = "flex bg-background items-center rounded-md pr-4";

  return (
    <form className={styles.form} action={formAction}>
      <h1 className="text-xl font-semibold mb-[20px]">Log In</h1>
      <label
        for="username"
        className="self-start mb-[5px] text-lg font-semibold"
      >
        Username
      </label>
      <input
        type="text"
        placeholder="Username"
        name="username"
        id=""
        className="mb-[15px] rounded-md"
        required
      />
      <label
        for="username"
        className="self-start mb-[5px] text-lg font-semibold"
      >
        Password
      </label>
      <div className={`mb-[30px] ${passwordStyle}`}>
        <input
          type={passwordSetting}
          placeholder="Password"
          name="password"
          id=""
          className="w-full rounded-md"
          required
        />
        <FaEye onClick={() => togglePassword()} className="cursor-pointer" />
      </div>
      <Button className="mb-[10px]">Login</Button>
      <p className="mb-[20px] dark:text-red-300 text-red-500 font-semibold">
        {state?.error}
      </p>
      <Link href="/register">
        {"Don't have an account?"} <b>Register</b>
      </Link>
    </form>
  );
}

export default LoginForm;

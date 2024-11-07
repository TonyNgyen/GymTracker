"use client";

import React, { useState } from "react";
import styles from "./registerForm.module.css";
import { register } from "@/lib/actions";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "../ui/button";
import { FaEye } from "react-icons/fa";

function RegisterForm() {
  const [state, formAction] = useFormState(register, undefined);
  const [passwordSetting, setPasswordSetting] = useState("password");
  const togglePassword = () => {
    passwordSetting == "password"
      ? setPasswordSetting("text")
      : setPasswordSetting("password");
  };

  const router = useRouter();

  useEffect(
    () => state?.success && router.push("/login"),
    [state?.success, router]
  );

  const passwordStyle = "flex bg-background items-center rounded-md pr-4";

  return (
    <form action={formAction} className={`${styles.form}`}>
      <h1 className="text-xl font-semibold mb-[20px]">Sign Up</h1>
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

      <label for="email" className="self-start mb-[5px] text-lg font-semibold">
        Email
      </label>
      <input
        type="email"
        placeholder="Email"
        name="email"
        id=""
        className="mb-[15px] rounded-md"
        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
        required
      />

      <label
        for="username"
        className="self-start mb-[5px] text-lg font-semibold"
      >
        Password
      </label>
      <div className={`mb-[10px] ${passwordStyle}`}>
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

      <div className={`mb-[15px] ${passwordStyle}`}>
        <input
          type={passwordSetting}
          placeholder="Password Again"
          name="passwordRepeat"
          id=""
          className="w-full rounded-md"
          required
        />
        <FaEye onClick={() => togglePassword()} className="cursor-pointer" />
      </div>

      <Button className="bg-main text-md font-semibold">Register</Button>
      {state?.error}
      <Link href="/login" className="mt-[20px]">
        Have an account? <b className="text-main">Log In</b>
      </Link>
    </form>
  );
}

export default RegisterForm;

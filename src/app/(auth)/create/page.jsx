import LoginForm from "@/components/loginForm/loginForm";
import React from "react";
import styles from "./create.module.css"
import { handleGithubLogin } from "@/lib/actions";

function CreateAccountPage() {
  return (
    <div className="text-center">
      <div className="mb-7 text-2xl font-bold">Please Login or Register to view and create workouts!</div>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <form action={handleGithubLogin}>
            <button className={styles.github}>Login with GitHub</button>
          </form>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

export default CreateAccountPage;

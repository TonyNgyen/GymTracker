import LoginForm from "@/components/loginForm/loginForm";
import React from "react";
import styles from "./create.module.css";
import { handleGithubLogin } from "@/lib/actions";
import { Button } from "@/components/ui/button";

function CreateAccountPage() {
  return (
    <div className="text-center">
      <div className="mb-7 text-2xl font-bold">
        Please Login or Register to view and create workouts!
      </div>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          {/* <form action={handleGithubLogin}>
            <Button className="w-full">Login with GitHub</Button>
          </form> */}
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

export default CreateAccountPage;

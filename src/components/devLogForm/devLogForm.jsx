"use client";

import React from "react";
import styles from "./devLogForm.module.css";
import { addLog } from "@/lib/actions";
import { useFormState } from "react-dom";

function DevLogForm(userId) {
  const [state, formAction] = useFormState(addLog, undefined);

  return (
    <form action={formAction} className={styles.container}>
      <h1>Add New Post</h1>
      <input type="hidden" name="username" id="" value="Tony" />
      <input type="text" name="title" id="" placeholder="Title" />
      <input type="text" name="slug" id="" placeholder="Slug" />
      <input type="text" name="img" id="" placeholder="img" />
      <textarea
        type="text"
        name="desc"
        id=""
        placeholder="Description"
        rows={10}
      />
      <button>Add</button>
      {state && state.error}
    </form>
  );
}

export default DevLogForm;

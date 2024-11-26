import React from "react";
import Links from "./links/Links";
import styles from "./navbar.module.css";
import Link from "next/link";
import { auth } from "@/lib/auth";

async function Navbar() {
  const session = await auth();

  return (
    <div className={styles.container}>
      <Link href="/" className={styles.logo}>
        <span className="">TONE</span>
        <span className="text-main">D</span>
      </Link>
      <Links session={session} />
    </div>
  );
}

export default Navbar;

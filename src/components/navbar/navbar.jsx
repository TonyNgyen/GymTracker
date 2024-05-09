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
        Gym<span className="text-main">Tracker</span>
      </Link>
      <Links session={session} />
    </div>
  );
}

export default Navbar;

import Image from "next/image";
import styles from "./home.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.container}>
      <div className={styles.hero}>
        <h1 className={styles.title}>Let&apos;s Improve Efficiently.</h1>
        <div className={styles.buttons}>
          <Link className={styles.button} href="/about">
            Learn More
          </Link>
          <Link className={styles.button} href="/register">
            Sign Up
          </Link>
        </div>
      </div>
    </main>
  );
}

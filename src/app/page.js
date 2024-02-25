import Image from "next/image";
import styles from "./home.module.css";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className={styles.container}>
      <div className={styles.hero}>
        <h1 className={styles.title}>Let&apos;s Improve Efficiently.</h1>
        <div className={styles.buttons}>
          <Button>
            <Link href="/about">
              Learn More
            </Link>
          </Button>
          <Button>
            <Link href="/register">
              Sign Up
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}

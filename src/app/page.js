import Image from "next/image";
import styles from "./home.module.css";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className={styles.container}>
      <div className={styles.hero}>
        <h1 className={styles.title}>Workouts Made Easy.</h1>
        <div className={styles.buttons}>
          <Button asChild className="min-w-[110px] bg-main text-background hover:bg-main-foreground hover:text-foreground">
            <Link href="/about">
              Learn More
            </Link>
          </Button>
          <Button asChild className="min-w-[110px]">
            <Link href="/register">
              Sign Up
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}

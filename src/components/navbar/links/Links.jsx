"use client";

import React, { useState } from "react";
import styles from "./links.module.css";
import NavLink from "./navLink/navLink";
import Image from "next/image";
import { handleLogout } from "@/lib/actions";
import { ModeToggle } from "@/components/ui/toggle-mode";

const links = [
  {
    title: "Homepage",
    path: "/",
  },
  {
    title: "About",
    path: "/about",
  },
  // {
  //   title: "Contact",
  //   path: "/contact",
  // },
  {
    title: "Workouts",
    path: "/workouts",
  },
];

function Links({ session }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.links}>
        {links.map((link) => (
          <NavLink item={link} key={link.title} />
        ))}
        {session?.user ? (
          <>
            {session.user?.isAdmin && (
              <NavLink item={{ title: "Admin", path: "/admin" }} />
            )}
            <form action={handleLogout}>
              <button className={styles.logout}>Logout</button>
            </form>
          </>
        ) : (
          <NavLink item={{ title: "Login", path: "/login" }} />
        )}
        <ModeToggle />
      </div>

      <Image
        className={styles.menuButton}
        src="/menu.png"
        alt=""
        width={30}
        height={30}
        onClick={() => setOpen((prev) => !prev)}
      />
      {open && (
        <div className={styles.mobileLinks}>
          {links.map((link) => (
            <div key={link.title} onClick={() => setOpen((prev) => !prev)}>
              <NavLink item={link} />
            </div>
          ))}
          {session?.user ? (
            <>
              {session.user?.isAdmin && (
                <NavLink item={{ title: "Admin", path: "/admin" }} />
              )}
              <form action={handleLogout}>
                <button className={styles.logout}>Logout</button>
              </form>
            </>
          ) : (
            <NavLink item={{ title: "Login", path: "/login" }} />
          )}
        </div>
      )}
    </div>
  );
}

export default Links;

"use client";

import React, { useState } from "react";
import styles from "./links.module.css";
import NavLink from "./navLink/navLink";
import Image from "next/image";
import { handleLogout } from "@/lib/actions";
import { ModeToggle } from "@/components/ui/toggle-mode";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IoMenu } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useLocalStorage } from "@/lib/utils";

const links = [
  {
    title: "Home",
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
  const { removeItem: removeStartWorkoutItem } =
    useLocalStorage("StartWorkout");
  const { removeItem: removeCurrentExerciseItem } =
    useLocalStorage("CurrentExercise");
  const { removeItem: removeTimeItem } = useLocalStorage("Time");
  const { removeItem: removeStartItem } = useLocalStorage("Start");
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
            {/* <form action={handleLogout}>
              <Button className="cursor-pointer text-lg font-semibold bg-foreground text-background rounded-full">
                Logout
              </Button>
            </form> */}

            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
                  <AvatarFallback>
                    <FaUserCircle className="text-3xl" />
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href="/profile">
                  <DropdownMenuItem className="cursor-pointer">
                    Profile
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem className="cursor-pointer">
                  <form action={handleLogout}>
                    <button
                      onClick={() => {
                        removeCurrentExerciseItem();
                        removeStartItem();
                        removeStartWorkoutItem();
                        removeTimeItem();
                      }}
                    >
                      Logout
                    </button>
                  </form>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <NavLink item={{ title: "Login", path: "/login" }} />
        )}
        <ModeToggle />
      </div>

      <IoMenu className={`text-5xl dark:text-gray-300 text-gray-500 ${styles.menuButton}`} onClick={() => setOpen((prev) => !prev)} />
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
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
                    <AvatarFallback>
                      <FaUserCircle className="text-3xl" />
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link href="/profile">
                    <DropdownMenuItem className="cursor-pointer">
                      Profile
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem className="cursor-pointer">
                    <form action={handleLogout}>
                      <button
                        onClick={() => {
                          removeCurrentExerciseItem();
                          removeStartItem();
                          removeStartWorkoutItem();
                          removeTimeItem();
                        }}
                      >
                        Logout
                      </button>
                    </form>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <NavLink item={{ title: "Login", path: "/login" }} />
          )}
          <ModeToggle />
        </div>
      )}
    </div>
  );
}

export default Links;

import Link from "next/link";
import React from "react";
import Logo from "./logo";

import classes from "./main-navigation.module.css";

function MainNavigation() {
  return (
    <header className={classes.header}>
      <Link href="/">
        <a>
          <Logo />
        </a>
      </Link>
      <nav>
        <ul>
          <li>
            <Link href="/posts">Posts</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
          <li>
            <Link href="/">HomePage</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;

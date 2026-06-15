"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import css from "./HeaderNav.module.css";
import { useAuthStore } from "@/lib/store/authStore";
import { logout } from "@/lib/api/clientApi";

const HeaderNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const panelId = useId();

  const { user, isAuthenticated } = useAuthStore();
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated,
  );

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKey);
    };
  }, [isOpen]);

  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      clearIsAuthenticated();
      setIsOpen(false);
      router.push("/sign-in");
    }
  };

  const userName = user?.username || user?.email?.split("@")[0] || "";
  const avatarInitial = userName.charAt(0).toUpperCase() || "U";

  const guestLinks = (
    <>
      <li className={css.item}>
        <Link href="/recipes" className={css.link} prefetch={false}>
          Recipes
        </Link>
      </li>
      <li className={css.item}>
        <Link href="/sign-in" className={css.link} prefetch={false}>
          Log in
        </Link>
      </li>
      <li className={css.item}>
        <Link
          href="/sign-up"
          className={`${css.link} ${css.cta}`}
          prefetch={false}
        >
          Register
        </Link>
      </li>
    </>
  );

  const authLinks = (
    <>
      <li className={css.item}>
        <Link href="/recipes" className={css.link} prefetch={false}>
          Recipes
        </Link>
      </li>
      <li className={css.item}>
        <Link href="/profile" className={css.link} prefetch={false}>
          My Profile
        </Link>
      </li>
      <li className={css.item}>
        <Link
          href="/add-recipe"
          className={`${css.link} ${css.cta}`}
          prefetch={false}
        >
          Add Recipe
        </Link>
      </li>
      <li className={`${css.item} ${css.userItem}`}>
        <span className={css.user}>
          {user?.avatar ? (
            <Image
              src={user.avatar}
              alt=""
              width={32}
              height={32}
              className={css.avatar}
            />
          ) : (
            <span className={css.avatar} aria-hidden="true">
              {avatarInitial}
            </span>
          )}
          <span className={css.userName}>{userName}</span>
        </span>
        <span className={css.divider} aria-hidden="true" />
        <button
          type="button"
          onClick={handleLogout}
          className={css.iconButton}
          aria-label="Log out"
        >
          <Image
            src="/icons/logout.svg"
            alt=""
            width={24}
            height={24}
            aria-hidden="true"
          />
        </button>
      </li>
    </>
  );

  const links = isAuthenticated ? authLinks : guestLinks;

  return (
    <nav className={css.nav} aria-label="Main navigation">
      <button
        type="button"
        className={css.burger}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => setIsOpen((value) => !value)}
      >
        <Image
          src={isOpen ? "/icons/close.svg" : "/icons/burger.svg"}
          alt=""
          width={32}
          height={32}
          aria-hidden="true"
        />
      </button>

      <ul className={css.desktopList}>{links}</ul>

      <div
        id={panelId}
        className={`${css.mobilePanel} ${isOpen ? css.mobilePanelOpen : ""}`}
      >
        <ul className={css.mobileList}>{links}</ul>
      </div>
    </nav>
  );
};

export default HeaderNav;

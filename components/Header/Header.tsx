import Image from "next/image";
import Link from "next/link";
import css from "./Header.module.css";
import HeaderNav from "./HeaderNav";

const Header = () => {
  return (
    <header className={css.header}>
      <div className={css.inner}>
        <Link
          href="/"
          aria-label="Tasteorama — home"
          className={css.logoLink}
          prefetch={false}
        >
          <Image
            src="/logo.svg"
            alt=""
            width={165}
            height={46}
            priority
            className={css.logo}
          />
        </Link>
        <HeaderNav />
      </div>
    </header>
  );
};

export default Header;

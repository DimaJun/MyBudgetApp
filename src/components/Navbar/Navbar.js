import styles from "./Navbar.module.scss";

import logoIcon from "../../assets/icons/bitcoin-white.svg";
import burgerIcon from "../../assets/icons/burger-menu.svg";

import { useState } from "react";
import { NavLink, Link } from "react-router-dom";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleBurgerClick = () => {
    setMenuOpen(!menuOpen);
  }

  return (
    <nav className={styles.Navbar}>
      <div className={styles.NavbarWrapper + " wrapper"}>
        <div className={styles.NavbarMobile}>
          <Link className={styles.NavbarHomeLink} to="/">
            <img src={logoIcon} alt="Logo" width={45} height={45} />
            <span className={styles.NavbarLogoText}>udget</span>
          </Link>
          <button className={styles.NavbarBurger} type="button" onClick={handleBurgerClick}>
            <img src={burgerIcon} alt="open menu" width={45} height={45}/>
          </button>
        </div>
        <ul className={`${styles.NavbarList} ${menuOpen ? styles.NavbarListOpen: ""}`}>
          <li>
            <NavLink className={styles.NavbarLink} to="/categories" onClick={() => setMenuOpen(false)}>Categories</NavLink>
          </li>
          <li>
            <NavLink className={styles.NavbarLink} to="/transactions" onClick={() => setMenuOpen(false)}>Transactions</NavLink>
          </li>
          <li>
            <NavLink className={styles.NavbarLink} to="/transactions-list" onClick={() => setMenuOpen(false)}>Transactions List</NavLink>
          </li>
          <li>
            <NavLink className={styles.NavbarLink} to="/totals" onClick={() => setMenuOpen(false)}>Totals</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

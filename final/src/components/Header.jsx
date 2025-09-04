import { useState, useRef, useEffect } from "react";
import "./Header.css";
import { getImageUrl } from "../utils.js";

function Header({
  username,
  isLoggedIn,
  isAdmin,
  cartItemCount,
  onLoginClick,
  onLogoutClick,
  onCartClick,
  onHomeClick,
  onOrdersClick,
  onAdminClick,
}) {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const menuButtonRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        showMenu &&
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target)
      ) {
        setShowMenu(false);
      }
    }

    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <header className="header">
      <div className="logo" onClick={onHomeClick}>
        <h1>TechNest Electronics</h1>
      </div>

      <nav className="desktop-nav">
        <ul className="nav-list">
          {isLoggedIn && (
            <li className="nav-item">
              <p className="username">Hello, {username}</p>
            </li>
          )}

          <li className="nav-item">
            <button className="nav-link" onClick={onHomeClick}>
              <img
                src={getImageUrl("home-icon.svg")}
                alt="home"
                className="button-icon"
              />
              Home
            </button>
          </li>


          {isLoggedIn && !isAdmin && (
            <li className="nav-item">
              <button className="nav-link" onClick={onOrdersClick}>
                <img
                  src={getImageUrl("orders-icon.svg")}
                  alt="orders"
                  className="button-icon"
                />
                Orders
              </button>
            </li>
          )}

          {isLoggedIn && isAdmin && (
            <li className="nav-item">
              <button className="nav-link" onClick={onAdminClick}>
                <img
                  src={getImageUrl("admin-icon.svg")}
                  alt="admin"
                  className="button-icon"
                />
                Admin Panel
              </button>
            </li>
          )}


          {isLoggedIn && !isAdmin && (
            <li className="nav-item">
              <button className="nav-link" onClick={onCartClick}>
                <img
                  src={getImageUrl("cart-icon.svg")}
                  alt="cart"
                  className="button-icon"
                />
                Cart
                {cartItemCount > 0 && (
                  <div className="cart-count">{cartItemCount}</div>
                )}
              </button>
            </li>
          )}


          <li className="nav-item">
            {isLoggedIn ? (
              <button className="logout-btn" onClick={onLogoutClick}>
                <img
                  src={getImageUrl("logout-icon.svg")}
                  alt="logout"
                  className="button-icon"
                />
                Logout
              </button>
            ) : (
              <button className="login-btn" onClick={onLoginClick}>
                <img
                  src={getImageUrl("login-icon.svg")}
                  alt="login"
                  className="button-icon"
                />
                Login
              </button>
            )}
          </li>
        </ul>
      </nav>

      <div className="mobile-menu-container">
        <button
          className="menu-toggle"
          onClick={toggleMenu}
          ref={menuButtonRef}
        >
          <img
            src={getImageUrl("menu-icon.svg")}
            alt="Menu"
            className="menu-icon"
          />
        </button>

        <div
          className={`mobile-nav ${showMenu ? "nav-open" : ""}`}
          ref={menuRef}
        >
          <ul className="mobile-nav-list">

            <li className="mobile-nav-item">
              <button className="mobile-nav-link" onClick={() => { onHomeClick(); setShowMenu(false); }}>
                Home
              </button>
            </li>


            {isLoggedIn && !isAdmin && (
              <li className="mobile-nav-item">
                <button className="mobile-nav-link" onClick={() => { onOrdersClick(); setShowMenu(false); }}>
                  Orders
                </button>
              </li>
            )}


            {isLoggedIn && isAdmin && (
              <li className="mobile-nav-item">
                <button className="mobile-nav-link" onClick={() => { onAdminClick(); setShowMenu(false); }}>
                  Admin Panel
                </button>
              </li>
            )}


            {isLoggedIn && !isAdmin && (
              <li className="mobile-nav-item">
                <button className="mobile-nav-link" onClick={() => { onCartClick(); setShowMenu(false); }}>
                  Cart {cartItemCount > 0 && `(${cartItemCount})`}
                </button>
              </li>
            )}


            <li className="mobile-nav-item">
              {isLoggedIn ? (
                <button className="mobile-nav-link" onClick={() => { onLogoutClick(); setShowMenu(false); }}>
                  Logout
                </button>
              ) : (
                <button className="mobile-nav-link" onClick={() => { onLoginClick(); setShowMenu(false); }}>
                  Login
                </button>
              )}
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;
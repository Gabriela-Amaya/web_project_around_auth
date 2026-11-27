import logo from "../images/Vector.png";
import line from "../images/Line.png";
import { Link, useLocation } from "react-router-dom";

function Header({ isLoggedIn, email, onSignOut }) {
  const { pathname } = useLocation();
  const isSigninPage = pathname === "/signin";

  return (
    <header className="header">
      <img src={logo} alt="Around the U.S." className="header__logo" />

      <div className="header__auth">
        {isLoggedIn ? (
          <>
            <span className="header__email">{email}</span>

            <button
              className="header__logout"
              type="button"
              onClick={onSignOut}
            >
              Cerrar sesión
            </button>
          </>
        ) : (
          <Link
            className="header__link"
            to={isSigninPage ? "/signup" : "/signin"}
          >
            {isSigninPage ? "Regístrate" : "Iniciar sesión"}
          </Link>
        )}
      </div>

      <img src={line} alt="Línea divisoria" className="header__linee" />
    </header>
  );
}

export default Header;

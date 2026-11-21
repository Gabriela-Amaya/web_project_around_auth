import logo from "../images/Vector.png";
import line from "../images/Line.png";
import { Link } from "react-router-dom";

function Header({ isLoggedIn, email, onSignOut }) {
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
            to={window.location.pathname === "/signin" ? "/signup" : "/signin"}
          >
            {window.location.pathname === "/signin"
              ? "Regístrate"
              : "Iniciar sesión"}
          </Link>
        )}
      </div>

      <img src={line} alt="Línea divisoria" className="header__linee" />
    </header>
  );
}

export default Header;

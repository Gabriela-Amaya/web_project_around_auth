import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import EditProfilePopup from "./components/EditProfilePopup";
import EditAvatarPopup from "./components/EditAvatarPopup";
import AddPlacePopup from "./components/AddPlacePopup";
import ImagePopup from "./components/ImagePopup";
import Login from "./components/Login";
import Register from "./components/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import InfoTooltip from "./components/InfoTooltip";

import { register, authorize, getContent } from "./utils/auth";
import api from "./utils/api";

import CurrentUserContext from "./contexts/CurrentUserContext";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const [isAuthLoading, setIsAuthLoading] = useState(() =>
    Boolean(localStorage.getItem("jwt")),
  );

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (!token) {
      return;
    }

    getContent(token)
      .then((data) => {
        setUserEmail(data.data.email);
        setIsLoggedIn(true);
      })

      .catch((error) => {
        console.error("Error al validar el token:", error);
        localStorage.removeItem("jwt");
        setIsLoggedIn(false);
      })
      .finally(() => {
        setIsAuthLoading(false);
      });
  }, []);

  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(false);

  const navigate = useNavigate();

  function handleRegistration(email, password) {
    register(email, password)
      .then(() => {
        console.log("Registro exitoso");

        setIsRegistrationSuccess(true);
        setIsInfoTooltipOpen(true);
      })
      .catch((error) => {
        console.error("Error al registrar:", error);

        setIsRegistrationSuccess(false);
        setIsInfoTooltipOpen(true);
      });
  }

  function handleLogin(email, password) {
    authorize(email, password)
      .then((data) => {
        console.log("Inicio de sesión exitoso");

        localStorage.setItem("jwt", data.token);
        setUserEmail(email);

        setIsLoggedIn(true);
        navigate("/");
      })
      .catch((error) => {
        console.error("Error al iniciar sesión:", error);
      });
  }

  function handleSignOut() {
    localStorage.removeItem("jwt");
    setUserEmail("");
    setIsLoggedIn(false);
    navigate("/signin");
  }

  function handleCloseInfoTooltip() {
    setIsInfoTooltipOpen(false);

    if (isRegistrationSuccess) {
      navigate("/signin");
    }
  }

  const [user, setUser] = useState({
    name: "",
    about: "",
    avatar: "",
    _id: "",
  });

  const [cards, setCards] = useState([]);

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }

    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cardsData]) => {
        setUser(userData);
        setCards(cardsData);
      })
      .catch((error) => {
        console.error("Error al cargar los datos:", error);
      });
  }, [isLoggedIn]);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState(null);

  function handleOpenEditProfilePopup() {
    setIsEditProfilePopupOpen(true);
  }

  function handleOpenEditAvatarPopup() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleOpenAddPlacePopup() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleClosePopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  }

  function handleUpdateUser(data) {
    api
      .editUserInfo(data)
      .then((updatedUser) => {
        setUser(updatedUser);
        handleClosePopups();
      })
      .catch((error) => {
        console.error("Error al actualizar el perfil:", error);
      });
  }

  function handleUpdateAvatar(data) {
    api
      .updateAvatar(data.avatar)
      .then((updatedUser) => {
        setUser(updatedUser);
        handleClosePopups();
      })
      .catch((error) => {
        console.error("Error al actualizar el avatar:", error);
      });
  }

  function handleAddPlace(data) {
    api
      .addCard(data)
      .then((newCard) => {
        setCards((currentCards) => [newCard, ...currentCards]);
        handleClosePopups();
      })
      .catch((error) => {
        console.error("Error al agregar la tarjeta:", error);
      });
  }

  function handleDeleteCard(cardId) {
    api
      .deleteCard(cardId)
      .then(() => {
        setCards((currentCards) =>
          currentCards.filter((card) => card._id !== cardId),
        );
      })
      .catch((error) => {
        console.error("Error al eliminar la tarjeta:", error);
      });
  }

  function handleCardLike(card) {
    api
      .changeLikeCardStatus(card._id, !card.isLiked)
      .then((updatedCard) => {
        setCards((currentCards) =>
          currentCards.map((currentCard) =>
            currentCard._id === card._id ? updatedCard : currentCard,
          ),
        );
      })
      .catch((error) => {
        console.error("Error al actualizar Me gusta:", error);
      });
  }

  useEffect(() => {
    function handleEscapeKey(event) {
      if (event.key === "Escape") {
        handleClosePopups();
      }
    }

    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  if (isAuthLoading) {
    return (
      <p style={{ color: "white", textAlign: "center" }}>
        Comprobando sesión...
      </p>
    );
  }

  return (
    <CurrentUserContext.Provider value={user}>
      <div className="page">
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                <Header isLoggedIn={false} />
                <Register onRegister={handleRegistration} />
              </>
            }
          />

          <Route
            path="/signin"
            element={
              <>
                <Header isLoggedIn={false} />
                <Login onLogin={handleLogin} />
              </>
            }
          />

          <Route
            path="/"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <>
                  <Header
                    isLoggedIn={isLoggedIn}
                    email={userEmail}
                    onSignOut={handleSignOut}
                  />

                  <Main
                    user={user}
                    cards={cards}
                    onEditProfile={handleOpenEditProfilePopup}
                    onEditAvatar={handleOpenEditAvatarPopup}
                    onAddPlace={handleOpenAddPlacePopup}
                    onCardClick={handleCardClick}
                    onDeleteCard={handleDeleteCard}
                    onCardLike={handleCardLike}
                  />

                  <Footer />

                  <EditProfilePopup
                    user={user}
                    isOpen={isEditProfilePopupOpen}
                    onClose={handleClosePopups}
                    onUpdateUser={handleUpdateUser}
                  />

                  <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={handleClosePopups}
                    onUpdateAvatar={handleUpdateAvatar}
                  />

                  <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={handleClosePopups}
                    onAddPlace={handleAddPlace}
                  />

                  <ImagePopup card={selectedCard} onClose={handleClosePopups} />
                </>
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/signin" replace />} />
        </Routes>

        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          isSuccess={isRegistrationSuccess}
          onClose={handleCloseInfoTooltip}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

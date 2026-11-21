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
import avatarOriginal from "./images/image.jpg";
import { register, authorize, getContent } from "./Utils/auth";

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
        setUserEmail(data.email);
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
    name: "Jacques Cousteau",
    about: "Explorador",
    avatar: avatarOriginal,
  });

  const [cards, setCards] = useState([
    {
      id: 1,
      name: "Valle de Yosemite",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
    },
    {
      id: 2,
      name: "Lago Louise",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
    },
    {
      id: 3,
      name: "Montañas Calvas",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
    },
    {
      id: 4,
      name: "Latemar",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
    },
    {
      id: 5,
      name: "Parque Nacional de la Vanoise",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
    },
    {
      id: 6,
      name: "Lago di Braies",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
    },
  ]);

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
    setUser((currentUser) => ({
      ...currentUser,
      name: data.name,
      about: data.about,
    }));

    handleClosePopups();
  }

  function handleUpdateAvatar(data) {
    setUser((currentUser) => ({
      ...currentUser,
      avatar: data.avatar,
    }));

    handleClosePopups();
  }

  function handleAddPlace(data) {
    const newCard = {
      id: Date.now(),
      name: data.name,
      link: data.link,
    };

    setCards((currentCards) => [newCard, ...currentCards]);

    handleClosePopups();
  }

  function handleDeleteCard(cardId) {
    setCards((currentCards) =>
      currentCards.filter((card) => card.id !== cardId),
    );
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

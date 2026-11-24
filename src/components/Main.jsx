import Profile from "./Profile";
import Gallery from "./Gallery";
import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Main({
  cards,
  onEditProfile,
  onEditAvatar,
  onAddPlace,
  onCardClick,
  onDeleteCard,
  onCardLike,
}) {
  const user = useContext(CurrentUserContext);
  return (
    <main className="content">
      <Profile
        user={user}
        onEditProfile={onEditProfile}
        onEditAvatar={onEditAvatar}
        onAddPlace={onAddPlace}
      />

      <Gallery
        cards={cards}
        onCardClick={onCardClick}
        onDeleteCard={onDeleteCard}
        onCardLike={onCardLike}
      />
    </main>
  );
}

export default Main;

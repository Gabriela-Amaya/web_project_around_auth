import Profile from "./Profile";
import Gallery from "./Gallery";

function Main({
  user,
  cards,
  onEditProfile,
  onEditAvatar,
  onAddPlace,
  onCardClick,
  onDeleteCard,
}) {
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
      />
    </main>
  );
}

export default Main;

import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
function Card({ card, onCardClick, onDeleteCard, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = card.owner === currentUser?._id;

  const isLiked = card.isLiked;
  function handleImageClick() {
    onCardClick(card);
  }

  function handleDeleteClick() {
    onDeleteCard(card._id);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  return (
    <li className="card">
      {isOwn && (
        <button
          className="card__delete-button"
          type="button"
          aria-label="Eliminar tarjeta"
          onClick={handleDeleteClick}
        />
      )}

      <img
        className="card__image"
        src={card.link}
        alt={card.name}
        onClick={handleImageClick}
      />

      <div className="card__description">
        <h2 className="card__title">{card.name}</h2>

        <button
          className={`card__like-button ${
            isLiked ? "card__like-button_active" : ""
          }`}
          type="button"
          aria-label="Me gusta"
          onClick={handleLikeClick}
        />
      </div>
    </li>
  );
}

export default Card;

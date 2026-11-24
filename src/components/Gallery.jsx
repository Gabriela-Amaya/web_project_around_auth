import Card from "./Card";

function Gallery({ cards, onCardClick, onDeleteCard, onCardLike }) {
  return (
    <section className="gallery">
      <ul className="gallery__photos">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={onCardClick}
            onDeleteCard={onDeleteCard}
            onCardLike={onCardLike}
          />
        ))}
      </ul>
    </section>
  );
}

export default Gallery;

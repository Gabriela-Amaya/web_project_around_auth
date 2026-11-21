function InfoTooltip({ isOpen, onClose, isSuccess }) {
  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button
          className="popup__close"
          type="button"
          onClick={onClose}
          aria-label="Cerrar ventana"
        >
          ×
        </button>

        <div className="info-tooltip">
          <div className="info-tooltip__icon">{isSuccess ? "✓" : "✕"}</div>

          <h2 className="info-tooltip__title">
            {isSuccess
              ? "¡Correcto! Ya estás registrado."
              : "Uy, algo salió mal. Inténtalo de nuevo."}
          </h2>
        </div>
      </div>
    </div>
  );
}

export default InfoTooltip;

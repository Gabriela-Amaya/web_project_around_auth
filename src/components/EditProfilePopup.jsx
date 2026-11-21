import { useState } from "react";
import PopupWithForm from "./PopupWithForm";

function EditProfileForm({ user, isOpen, onClose, onUpdateUser }) {
  const [name, setName] = useState(user.name);
  const [about, setAbout] = useState(user.about);

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleAboutChange(event) {
    setAbout(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    onUpdateUser({
      name,
      about,
    });
  }

  return (
    <PopupWithForm
      title="Editar perfil"
      name="edit"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Guardar"
    >
      <input
        className="popup__input"
        type="text"
        name="name"
        placeholder="Nombre"
        value={name}
        onChange={handleNameChange}
        required
        minLength="2"
        maxLength="40"
      />

      <input
        className="popup__input"
        type="text"
        name="about"
        placeholder="Profesión"
        value={about}
        onChange={handleAboutChange}
        required
        minLength="2"
        maxLength="200"
      />
    </PopupWithForm>
  );
}

function EditProfilePopup(props) {
  return <EditProfileForm key={props.isOpen ? "open" : "closed"} {...props} />;
}

export default EditProfilePopup;

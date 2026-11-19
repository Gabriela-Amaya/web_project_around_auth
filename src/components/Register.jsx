import { useState } from "react";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    console.log("Correo:", email);
    console.log("Contraseña recibida");
  }

  return (
    <div className="auth">
      <h2 className="auth__title">Regístrate</h2>

      <form className="auth__form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
}

export default Register;

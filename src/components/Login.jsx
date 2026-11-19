import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    console.log("Correo:", email);
    console.log("Formulario de inicio de sesión enviado");
  }

  return (
    <div className="auth">
      <h2 className="auth__title">Inicia sesión</h2>

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

        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
}

export default Login;

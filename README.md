# Around The U.S. — React con autenticación

Aplicación web interactiva desarrollada con React y Vite como parte de los proyectos de TripleTen.

La aplicación permite registrar usuarios, iniciar y cerrar sesión, proteger el acceso a la galería y gestionar tarjetas de lugares mediante una interfaz adaptable.

## Funcionalidades

### Registro y autenticación

- Registrar nuevos usuarios mediante correo electrónico y contraseña.
- Iniciar sesión con una cuenta registrada.
- Guardar el token JWT en el almacenamiento local del navegador.
- Comprobar la sesión al actualizar la página.
- Proteger la ruta principal para usuarios autenticados.
- Redirigir a los usuarios no autenticados a la página de inicio de sesión.
- Mostrar el correo electrónico del usuario autenticado.
- Cerrar sesión y eliminar el token JWT.
- Mostrar mensajes de éxito o error durante el registro.

### Perfil y galería

- Editar el nombre y la descripción del perfil.
- Cambiar la fotografía del avatar.
- Agregar nuevas tarjetas mediante un formulario.
- Eliminar tarjetas.
- Activar y desactivar el botón de «Me gusta».
- Abrir imágenes en una ventana emergente.
- Cerrar las ventanas emergentes con el botón de cerrar, haciendo clic sobre el fondo o presionando Escape.
- Adaptar la interfaz a diferentes tamaños de pantalla.

## Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript
- React
- React Router
- React Hooks (`useState`, `useEffect`, `useContext`)
- Context API (`CurrentUserContext`)
- Vite
- API REST
- Autenticación mediante JWT
- LocalStorage
- Metodología BEM
- Git y GitHub

## Instalación

Clona el repositorio:

```bash
git clone https://github.com/Gabriela-Amaya/web_project_around_auth.git
```

Entra en la carpeta del proyecto:

```bash
cd web_project_around_auth
```

Instala las dependencias:

```bash
npm install
```

Inicia el servidor de desarrollo:

```bash
npm run dev
```

## Scripts disponibles

Iniciar el servidor de desarrollo:

```bash
npm run dev
```

Comprobar el código con ESLint:

```bash
npm run lint
```

Generar la versión de producción:

```bash
npm run build
```

## Rutas de la aplicación

- `/signup`: registro de nuevos usuarios.
- `/signin`: inicio de sesión.
- `/`: galería principal protegida.

## Notas

La autenticación utiliza un servicio API externo. Las modificaciones del perfil y de las tarjetas se gestionan localmente en el estado de React, por lo que pueden restablecerse al actualizar la página.

## Repositorio

https://github.com/Gabriela-Amaya/web_project_around_auth

## Autora

Digna Gabriela Amaya

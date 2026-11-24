# Around The U.S. — React con autenticación

Aplicación web interactiva desarrollada con React y Vite como parte de los proyectos de TripleTen.

La aplicación permite registrar usuarios, iniciar y cerrar sesión, proteger el acceso a la galería y gestionar el perfil y las tarjetas de lugares mediante una interfaz adaptable, con persistencia de datos a través de una API REST.

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

- Cargar los datos del perfil desde la API REST.
- Cargar las tarjetas de lugares desde el servidor.
- Editar el nombre y la descripción del perfil.
- Cambiar la fotografía del avatar.
- Agregar nuevas tarjetas mediante un formulario.
- Eliminar tarjetas pertenecientes al usuario.
- Mostrar el botón de eliminación únicamente en las tarjetas propias.
- Activar y desactivar el botón de «Me gusta».
- Abrir imágenes en una ventana emergente.
- Cerrar las ventanas emergentes con el botón de cerrar, haciendo clic sobre el fondo o presionando Escape.
- Adaptar la interfaz a diferentes tamaños de pantalla.

### Integración con la API REST

- Obtener la información del usuario desde el servidor.
- Obtener las tarjetas almacenadas en el servidor.
- Guardar las modificaciones del nombre y la descripción del perfil.
- Guardar las modificaciones del avatar.
- Crear nuevas tarjetas en el servidor.
- Eliminar tarjetas del servidor.
- Guardar y eliminar los «Me gusta».
- Mantener los cambios realizados después de actualizar la página.
- Gestionar las respuestas y los errores de las peticiones a la API.

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
- Fetch API
- Autenticación mediante JWT
- LocalStorage
- Metodología BEM
- ESLint
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

## Persistencia de datos

La aplicación utiliza servicios API externos para gestionar la autenticación y almacenar la información del perfil y las tarjetas.

Las modificaciones del nombre, la descripción, el avatar, la creación y eliminación de tarjetas y los «Me gusta» se guardan en el servidor, permitiendo conservar los cambios después de actualizar la página.

La autenticación se realiza mediante tokens JWT almacenados en LocalStorage, lo que permite mantener la sesión iniciada al actualizar la aplicación.

## Pruebas y verificación

Se realizaron pruebas de funcionamiento para comprobar:

- Inicio y cierre de sesión.
- Carga de los datos del perfil.
- Carga de las tarjetas.
- Edición y persistencia del perfil.
- Actualización y persistencia del avatar.
- Creación y persistencia de tarjetas.
- Eliminación definitiva de tarjetas.
- Activación y desactivación de los «Me gusta».

El proyecto ha sido comprobado mediante ESLint, sin errores ni advertencias, y compilado correctamente con Vite.

## Repositorio

https://github.com/Gabriela-Amaya/web_project_around_auth

## Autora

Digna Gabriela Amaya

# 🛍️ Web App CashTrackr – Fullstack App (Node ts + Next.ts)  🙌

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Zod](https://img.shields.io/badge/Zod-2C3E50?style=for-the-badge&logo=zod&logoColor=white)](https://zod.dev/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Render Services](https://img.shields.io/badge/Render_Services-5A4CAD?style=for-the-badge&logo=render&logoColor=white)](https://render.com/)
[![Neon PostgreSQL](https://img.shields.io/badge/Neon_PostgreSQL-00E59B?style=for-the-badge&logo=postgresql&logoColor=white)](https://neon.tech/)

Esta es una aplicación web moderna desarrollada con una arquitectura Full Stack robusta que combina lo mejor del ecosistema JavaScript/TypeScript, integrando:

Despliegue en la nube con Render (backend) y Vercel (frontend)

-  🚀 Características principales

-  🔐 Autenticación segura con JWT y bcrypt

-  📦 CRUDs completos en el backend utilizando Sequelize ORM y PostgreSQL

-  📄 Validaciones robustas con express-validator y zod

-  🔄 Gestión de estados y formularios en frontend usando componentes accesibles (@headlessui/react, @chakra-ui/pin-input)

-  📬 Envío de correos mediante nodemailer

-  📊 Testing con Jest, Supertest y mocks HTTP

-  🌐 Interfaz UI moderna y responsive con TailwindCSS, Heroicons y React Toastify

-  ⚡ Desempeño optimizado con herramientas como morgan y express-rate-limit

-  📤 Despliegue continuo usando Render (API) y Vercel (UI)

![HU3withoutlogo](https://i.postimg.cc/PqZzM5yg/Captura-de-pantalla-286.png)


## Tecnologías utilizadas. 🚀
### Backend – 🧠 Nest TS (TypeScript). Framework backend modular y escalable.

****
|||
|:---:|:---:|
| <img style="width: 100px; min-width: 100px" src="https://nodejs.org/static/images/logo.svg"> | **Node.js** – Entorno de ejecución para JavaScript del lado del servidor. |
| <img style="width: 100px; min-width: 100px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"> | **TypeScript** – Lenguaje tipado que mejora la escalabilidad del código JavaScript. |
| <img style="width: 100px; min-width: 100px" src="https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png"> | **Express.js** – Framework minimalista para construir APIs web en Node.js. |
| <img style="width: 100px; min-width: 100px" src="https://sequelize.org/img/logo.svg"> | **Sequelize TypeScript** – ORM que facilita el manejo de bases de datos SQL con soporte para decoradores. |
| <img style="width: 100px; min-width: 100px" src="https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg"> | **PostgreSQL** – Sistema de gestión de bases de datos relacional, robusto y escalable. |
| <img style="width: 100px; min-width: 100px" src="https://jwt.io/img/pic_logo.svg"> | **JWT (jsonwebtoken)** – Autenticación basada en tokens JSON seguros. |
| <img style="width: 100px; min-width: 100px" src="https://raw.githubusercontent.com/motdotla/dotenv/master/dotenv.svg"> | **dotenv** – Manejo de variables de entorno para configuración segura. |
| <img style="width: 100px; min-width: 100px" src="https://upload.wikimedia.org/wikipedia/commons/8/88/Status_iucn_EX_icon.svg"> | **bcryptjs** – Librería para el cifrado de contraseñas. |
| <img style="width: 100px; min-width: 100px" src="https://raw.githubusercontent.com/nodemailer/nodemailer/master/assets/nm_logo_200x136.png"> | **Nodemailer** – Envío de correos electrónicos desde el servidor. |
| <img style="width: 100px; min-width: 100px" src="https://jestjs.io/img/opengraph.png"> | **Jest** – Framework de pruebas para código JavaScript y TypeScript. |
| <img style="width: 100px; min-width: 100px" src="https://github.com/visionmedia/supertest/raw/master/logo.png"> | **Supertest** – Librería para probar endpoints HTTP de forma automatizada. |
| <img style="width: 100px; min-width: 100px" src="https://express-validator.github.io/images/logo.svg"> | **express-validator** – Middleware para validación de solicitudes en rutas Express. |
| <img style="width: 100px; min-width: 100px" src="https://cdn-icons-png.flaticon.com/512/8061/8061370.png"> | **express-rate-limit** – Protección contra ataques de fuerza bruta por IP. |
| <img style="width: 100px; min-width: 100px" src="https://raw.githubusercontent.com/expressjs/morgan/master/morgan-logo.png"> | **Morgan** – Logger HTTP para desarrollo. |


### Frontend – 🖼️ Next.ts 15 (React 19)

****
|||
|:---:|:---:|
| <img style="width: 100px; min-width: 100px" src="https://www.digitality.es/img-articulos/ampliadas/que-es-nextjs-y-para-que-sirve-1-1697560678.jpg">| Next.js – Framework React para SSR y SSG. |
| <img style="width: 100px; min-width: 100px" src="https://reactjs.org/favicon.ico">| React 19 – Última versión con mejoras en rendimiento. |
| <img style="width: 100px; min-width: 100px" src="https://static-00.iconduck.com/assets.00/tailwind-css-icon-256x154-bhw4dmbr.png">| Tailwind CSS – Utilidades para estilos rápidos y responsive. |
| <img style="width: 100px; min-width: 100px" src="https://refine-web.imgix.net/blog/2023-07-04-react-query-intro/social-2.png?w=1788">| React Query – Manejo de datos con cacheo y sincronización. |
| <img style="width: 100px; min-width: 100px" src="https://user-images.githubusercontent.com/958486/218346783-72be5ae3-b953-4dd7-b239-788a882fdad6.svg">| Zustand – Manejo de estado simple y moderno. |
| <img style="width: 100px; min-width: 100px" src="https://user-images.githubusercontent.com/35040146/100596753-851b5e00-3322-11eb-9073-1a50e5adcb53.png">| React Toastify – Notificaciones amigables. |
| <img style="width: 100px; min-width: 100px" src="https://raw.githubusercontent.com/react-dropzone/react-dropzone/master/logo/logo.png">| React Dropzone – Subida de archivos con drag & drop. |
| <img style="width: 100px; min-width: 100px" src="https://media2.dev.to/dynamic/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fcdn.hashnode.com%2Fres%2Fhashnode%2Fimage%2Fupload%2Fv1713969399706%2Fc21020ec-8947-4631-90e0-775f374f26fd.jpeg">| React Calendar – Componente de calendario interactivo. |
| <img style="width: 100px; min-width: 100px" src="https://miro.medium.com/v2/resize:fit:1050/0*yTnXWjd6Tkdr17HN.png">| Zod – Validaciones del lado del cliente con tipado estático. |

### Alojamiento – ☁️

****
|||
|:---:|:---:|
| <img style="width: 100px; min-width: 100px" src="https://i.pinimg.com/736x/8b/7c/ac/8b7cac4d85303b79158dd3cf2d9b63c8.jpg">| Render – plataforma en la nube que te permite desplegar web, APIs, bases de datos etc. |
| <img style="width: 100px; min-width: 100px" src="https://images.ctfassets.net/crb83veve8xb/2VaNf5PhpBlvKAUKYfmefe/5fdaf99f05704485b02e14e8d4addefb/vercel.webp">| Vercel es una plataforma de despliegue en la nube enfocada principalmente en frameworks frontend. |

### Instalación Local 🚀

#### Requisitos Previos

-	Node.js 18+
-	PostgreSQL 15+
-	PNPM 8+

#### Clonar el repositorio.

	git clone https://github.com/gaboducuara/store.git
    cd store
	cd backend

## Backend 📦
#### Instalar dependencias (Monorepo).

	pnpm install

### Configurar variables de entorno.

	DATABASE_HOST=
    DATABASE_PORT=5432
	DATABASE_USER=
    DATABASE_PASS=
	DATABASE_NAME=
    DATABASE_SSL_MODE=require
	CLOUDINARY_NAME=
    CLOUDINARY_API_KEY=
	CLOUDINARY_API_SECRET=

### Comandos útiles 🧪

##### Ejecuta el script para poblar datos iniciales.

	pnpm run seed

##### Ejecuta el backend en modo desarrollo observador.

    pnpm run start:dev

##### Ejecuta el backend en modo desarrollo.

    pnpm run start

#### Compila para producción.

	pnpm run build

## Frontend 📦

    cd store
	cd frontend

#### Instalar dependencias.

	pnpm install

#### Configurar variables de entorno.

    API_URL=http://localhost:3001
    NEXT_PUBLIC_API_URL=http://localhost:3001
    NEXT_PUBLIC_DOMAIN=http://localhost:3000

#### Ejecuta el frontend en modo desarrollo.

    pnpm run dev

#### Compila para producción.

    pnpm run build

## Endpoints Clave (API) 📚

<!-- - [🛍️ Documentacion API](https://store-7ylq.onrender.com/api)
 -->
<a href="https://store-7ylq.onrender.com/api" target="_blank">🛍️ Documentación API (Swagger)</a>

## Deploy ☁️

- Backend: Puedes desplegarlo en plataformas como Render, Railway o Heroku.
- Frontend: Desplegado en Vercel.
- Demo en Vivo - [🛍️ Web CashTrackr](https://cashtrackr-ashy.vercel.app "CashTrackr") 🌐

Agradecimientos
Gracias por visitar este proyecto 🙌 
Si llegaste hasta aquí, ¡te lo agradezco mucho!
Con gusto recibo feedback o sugerencias 💬





Documentacion API



<!-- ## Problema

git commit -m "CRUD de Gastos, Router, Controllers, Validación, Middlewares"

git tag v2.0
git push


25 -5


Se solicitó realizar una app sencilla como ejercicio MERN STACK.  La app  tiene que tener base de datos y  responder peticiones CRUD del cliente

## Solucion

Para el entorno de desarrollo de la app se utilizo node js y express para la infraestructura del mismo, asimismo se utilizo render.com como base de datos en la nube y mongoose para generar interaccion con la base de datos al traer informacion.

-	Express – Como infraestructura flexible trabajada en el entorno de desarrollo.
-	Render – base de datos No relacional.
-	Node js – entorno de desarrollo.

#### ORM.

 - TypeORM (typeorm, @nestjs/typeorm): ORM para interactuar con bases de datos relacionales (PostgreSQL en este caso).

#### Dependecias.

 - Cors – Como mecanismo HTTP para obtener permisos para acceder a recursos seleccionados desde un servidor, en un  origen distinto al dominio.

 - dotenv -  permite cargar variables de entorno en proyectos de node js desde un archivo .env

 - nodemon- Te permite monitorear los cambios en el código fuente que se está desarrollando y automáticamente reinicia el servidor.

## Deploy 🚀

- [LINK DEL FRONTEND ](https://github.com/gaboducuara/store "LINK DEL FRONTEND ")



Puedes ver la aplicacion funcionando en produccion mediante este link:[Administrador de tareas](https://vitejs-administrador-tareas.vercel.app/ "Administrador de tareas")

Si llegaste aqui gracias 🙏🏼 me gusta ser leido, Buen Dia. -->

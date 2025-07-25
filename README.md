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
### Backend – 🧠 Node t TS (TypeScript). Framework backend modular y escalable.

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
| <img style="width: 100px; min-width: 100px" src="https://jestjs.io/img/opengraph.png"> | **Jest** - Framework de pruebas para código JavaScript y TypeScript. |
| <img style="width: 100px; min-width: 100px" src="https://i.postimg.cc/15QG9S9B/Captura-de-pantalla-288.png"> | **express-validator** – Middleware para validación de solicitudes en rutas Express. |


### Frontend – 🖼️ Next.ts 15 (React 19)

****
|||
|:---:|:---:|
| <img style="width: 100px; min-width: 100px" src="https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg"> | **Next.js 15** – Framework React para renderizado SSR, SSG e híbrido. Ideal para producción. |
| <img style="width: 100px; min-width: 100px" src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"> | **React 19** – Librería para construir interfaces de usuario interactivas y declarativas. |
| <img style="width: 100px; min-width: 100px" src="https://i.postimg.cc/WzVbFTb6/descarga.png"> | **Tailwind CSS** – Framework CSS de utilidad para estilos rápidos y personalizados. |
| <img style="width: 100px; min-width: 100px" src="https://i.postimg.cc/HLRs4b32/Chakra-UI.png"> | **Chakra UI** – Librería de componentes accesibles para React. En este caso se usa `@chakra-ui/pin-input`. |
| <img style="width: 100px; min-width: 100px" src="https://i.postimg.cc/XJ5N2Xz0/headless.png"> | **Headless UI** – Componentes sin estilo con lógica accesible, listos para personalizar con Tailwind. |
| <img style="width: 100px; min-width: 100px" src="https://i.postimg.cc/W4h1k5mz/Hero-Icons.png"> | **Heroicons** c– Íconos SVG de interfaz compatibles con React y Tailwind. |
| <img style="width: 100px; min-width: 100px" src="https://i.postimg.cc/0jqkhxTK/React-Toastify.png"> | **React Toastify** – Notificaciones fáciles de usar en React. Ideal para alertas de usuario. |
| <img style="width: 100px; min-width: 100px" src="https://raw.githubusercontent.com/colinhacks/zod/master/logo.svg"> | **Zod** – Librería de validación y parsing de datos TypeScript-first. Potente y segura. |
| <img style="width: 100px; min-width: 100px" src="https://cdn.worldvectorlogo.com/logos/typescript.svg"> | **TypeScript** – Lenguaje tipado que fortalece la escalabilidad de React y Next.js.

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
    cd cashtrackr
	cd backend

## Backend 📦
#### Instalar dependencias (Monorepo).

	pnpm install

### Configurar variables de entorno.

	PORT=3001
    DATABASE_URL=
    EMAIL_HOST=smtp.gmail.com
    EMAIL_USER=
    EMAIL_PASS=
    EMAIL_PORT=
    NODE_ENV=development
    JWT_SECRET=
    FRONTEND_URL=http://localhost:3000

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

    cd cashtrackr
	cd frontend

#### Instalar dependencias.

	pnpm install

#### Configurar variables de entorno.

    API_URL=http://localhost:3001/api
    NEXT_PUBLIC_URL=http://localhost:3000

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

![Lazy Community](https://github.com/PawlikKing/SimpleWebApp/blob/main/LC.png)

# Front-App – Angular Frontend

**SimpleExpressApp** monorepo – `apps/front-app`

![Angular](https://img.shields.io/badge/Angular%2020-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![Material](https://img.shields.io/badge/Material%20Design-0081CB?style=for-the-badge&logo=angular-material&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

Modern Angular 20 standalone application with authentication and product management.

---

## Quick Start

Clone the whole monorepo

```bash
git clone https://github.com/PawlikKing/SimpleExpressApp.git
cd SimpleExpressApp
```

Install dependencies (root + workspaces)

```bash
npm install
```

Start frontend in development mode

```bash
npm run front:dev
```

Open your browser → **http://localhost:4200**

---

## Available Scripts (from project root)

| Command               | Description                                 |
| --------------------- | ------------------------------------------- |
| `npm run front:dev`   | Starts Angular dev server (`ng serve`)      |
| `npm run front:build` | Builds production bundle (`dist/front-app`) |
| `npm run front:test`  | Runs unit tests with Karma + Jasmine        |

---

## Application Routes

| Path              | Component                   | Auth Required | Description                                    |
| ----------------- | --------------------------- | ------------- | ---------------------------------------------- |
| `/`               | → redirect                  | No            | Redirects to `/everyone`                       |
| `/register`       | `RegisterComponent`         | No            | User registration                              |
| `/login`          | `LoginComponent`            | No            | User login                                     |
| `/send-reset`     | `SendResetComponent`        | No            | Request password reset link                    |
| `/reset-password` | `ResetPasswordComponent`    | No            | Set new password (via token)                   |
| `/me`             | `MeComponent`               | Yes           | User profile & settings                        |
| `/my`             | `MyProductsComponent`       | Yes           | List of products created by the logged-in user |
| `/everyone`       | `EveryoneProductsComponent` | No            | Public list of all products (default landing)  |

Protected routes (`/me`, `/my`) are guarded by `AuthGuard`.

---

## Tech Stack

- **Angular** v20.3.0 (standalone components)
- **Angular Material** + CDK v20.2.14
- **TypeScript** ~5.9
- **RxJS** ~7.8
- **Prettier** (100 chars, single quotes)

---

## Development Tips

- Format code: `npx prettier --write .`
- All components are standalone (no NgModules)
- Authentication state is managed via `AuthGuard` and usually stored in `localStorage` (JWT)
- Ready for future features: product CRUD, image upload, dark mode, etc.

---

## Project Structure (inside `apps/front-app`)

```
src/
├── app/
│   ├── features/
│   │   ├── auth/          → login, register, password reset
│   │   ├── user/          → me.component
│   │   └── product/       → my & everyone products
│   ├── core/
│   │   └── guards/auth.guard.ts
│   └── app.routes.ts      → all routes (see above)
```

---

## Questions? Need Help?

Open an issue here:  
https://github.com/PawlikKing/SimpleExpressApp/issues

---

<p align="center">
<img src="https://img.shields.io/github/stars/PawlikKing/SimpleWebApp?style=social" alt="GitHub stars"/>
  <img src="https://img.shields.io/github/forks/PawlikKing/SimpleWebApp?style=social" alt="GitHub forks"/>
  <img src="https://img.shields.io/github/issues/PawlikKing/SimpleWebApp?color=red" alt="Issues"/>
  <img src="https://img.shields.io/github/license/PawlikKing/SimpleWebApp?color=blue" alt="License"/>
  <br/><br/>
  <img src="https://img.shields.io/badge/Angular-v20-red?logo=angular" alt="Angular 20"/>
  <img src="https://img.shields.io/badge/Node.js-22-green?logo=node.js" alt="Node.js"/>
  <img src="https://img.shields.io/badge/TypeScript-5.5-blue?logo=typescript" alt="TypeScript"/>
  <br/><br/>
  From Lazy People for Lazy People 💪
</p>

<p align="center">
  <sub>
    The docs will be extended as the project grows!
  </sub>
</p>

## React + TypeScript + Vite

This template provides a minimal setup to get react working in vite with HMR and some ESLint rules.

## Project

### Simple Form Project

This a Simple Form Application that allows users to enter their name, and the industry which they are invloved with. On submit to the form a user must check on the agree Terms button, before submission. The application records user data and stores the dsata in a db.

Basic Functionality

- Form Validation
- Initiate user session when the home is visited
- Basic CRUD Operations
  -- Create user Form Application
  -- Read user Form Applicaton
  -- Update user Form Application

```
   userAppication = {
      name: string,
      sector: string
      agreeTerms: boolen
   }

```

Application Deployment
[Frontend App Link](https://simpleform-git-develop-aneal250.vercel.app)
[Backend API ](https://simple-contract.onrender.com/applications) ` fetch all forms`

## Project Setup

```sh
git clone https://github.com/Aneal250/weather-app.git
```

```sh
npm install
```

```sh
npm run dev
```

### Technologies | APIs

1. [vite bundler](https://vitejs.dev/)
2. [React Js ](https://react.dev/)
3. [Typescript ](https://www.typescriptlang.org/)
4. [Vercel Vercel](https://vercel.com/)

### Notes | Challenges

1. The nested sector option was extremely difficult to implement, i was able to implement a functionality where user could only select options the has children, and only select parrent that do not have children.

2. Open to Improvements 🙏

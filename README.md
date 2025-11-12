# EXPRESS-COURSE-MANAGEMENT

*Empowering Seamless Learning Experiences Everywhere, Every Time*

---

![last commit](https://img.shields.io/github/last-commit/Tilak-csd/express-course-management?style=flat-square) 
![javascript](https://img.shields.io/badge/javascript-100.0%25-yellow?style=flat-square) 
![languages](https://img.shields.io/badge/languages-JavaScript-blue?style=flat-square)

---

*Built with the tools and technologies:*

 <a href="https://expressjs.com/"><img src="https://img.shields.io/badge/Express-black?style=flat-square&logo=express" /></a>
  <a href="https://www.json.org/json-en.html"><img src="https://img.shields.io/badge/JSON-000?style=flat-square&logo=json" /></a>
  <a href="https://www.npmjs.com/"><img src="https://img.shields.io/badge/npm-DD3531?style=flat-square&logo=npm" /></a>
  <a href="https://mongoosejs.com/"><img src="https://img.shields.io/badge/Mongoose-C00000?style=flat-square&logo=mongodb" /></a>
  <a href="https://www.javascript.com/"><img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript" /></a>
  <a href="https://github.com/colinhacks/zod"><img src="https://img.shields.io/badge/Zod-000000?style=flat-square" /></a>
  <a href="https://jwt.io/"><img src="https://img.shields.io/badge/JWT-000000?style=flat-square&logo=json-web-tokens" /></a>

---

## Features

- Admin signup and signin
- User signup and signin
- Create and list courses (admin)
- View available courses (user)
- Purchase courses (user)
- View purchased courses (user)
- JWT-based authentication for admin and users
- Input validation using Zod

---

## File Structure
```bash
express-course-management/
│
├── db/
│ └── index.js # Mongoose models and Zod validation schemas
│
├── middleware/
│ ├── admin.js # Admin JWT auth middleware
│ └── user.js # User JWT auth middleware
│
├── routes/
│ ├── admin.js # Admin routes (signup, signin, create course, list courses)
│ └── user.js # User routes (signup, signin, list courses, purchase courses)
│
├── index.js # Main server file
├── package.json
├── LICESNE
└── README.md
```
---

## Installation

### Prerequisites

- Node.js (v18 or later recommended)
- npm
- MongoDB Atlas account or local MongoDB instance

### Steps

1. **Clone the repository**
```bash
git clone https://github.com/<your-username>/express-course-management.git
cd express-course-management
```





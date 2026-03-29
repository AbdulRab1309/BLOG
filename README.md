# BLOG — A Blog Web Application

> A clean, editorial-style blog built with Node.js, Express.js, and EJS.

![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?style=flat-square&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-4.x-000000?style=flat-square&logo=express&logoColor=white)
![EJS](https://img.shields.io/badge/EJS-3.x-B4CA65?style=flat-square)
![License](https://img.shields.io/badge/License-ISC-blue?style=flat-square)

---

## Overview

**BLOG** is a full-stack blog web application that allows users to create, read, update, and delete blog posts — all within a beautifully designed editorial interface. Built as a capstone project using Node.js, Express.js, and EJS templating, the application demonstrates core web development skills including server-side routing, dynamic HTML rendering, form handling, and responsive CSS design and User responsive Dark and Light Modes.

Posts are stored in-memory and do not persist between server sessions — no database is required.

---

## Features

- **Create Posts** — Write new blog posts with a title, author name, category, and content body
- **View All Posts** — The home page displays all posts in a responsive grid, with the most recent post featured prominently
- **Read Single Posts** — Click through to a full post view with drop-cap styling and clean typography
- **Edit Posts** — Pre-filled edit form lets you revise any post and save changes instantly
- **Delete Posts** — Remove any post with a single click (with a confirmation prompt)
- **Auto-generated metadata** — Read time and post excerpt are computed automatically from your content
- **Live word counter** — The editor shows live word count and estimated read time as you type
- **Responsive design** — Fully functional on desktop, tablet, and mobile

---

## Screenshots

> Home page with featured post layout, single post view with drop-cap, and the post editor.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express.js |
| Templating | EJS (Embedded JavaScript) |
| Styling | Custom CSS (Flexbox & Grid) |
| Fonts | Playfair Display, Source Serif 4, JetBrains Mono |
| IDs | UUID v4 (via `uuid` package) |

---

## Project Structure

```
blog-app/
├── index.js                  # Express server & all route handlers
├── package.json
├── views/
│   ├── index.ejs             # Home page — lists all posts
│   ├── post.ejs              # Single post view
│   ├── new.ejs               # New post form
│   ├── edit.ejs              # Edit post form
│   └── partials/
│       ├── header.ejs        # Shared HTML head + site header
│       └── footer.ejs        # Shared site footer
└── public/
    ├── css/
    │   └── style.css         # All styles — editorial magazine aesthetic
    └── js/
        └── main.js           # Word counter, delete confirmation, animations
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm (comes bundled with Node.js)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/blog-app.git
   cd blog-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the server**

   ```bash
   npm start
   ```

4. **Open your browser**

   ```
   http://localhost:3000
   ```

### Development Mode

To enable auto-restart on file changes, use:

```bash
npm run dev
```

This uses `nodemon` — make sure it's installed (`npm install -D nodemon`).

---

## Routes

| Method | Route | Description |
|--------|-------|-------------|
| `GET` | `/` | Home page — lists all posts |
| `GET` | `/posts/new` | Render new post form |
| `POST` | `/posts` | Create a new post |
| `GET` | `/posts/:id` | View a single post |
| `GET` | `/posts/:id/edit` | Render edit form for a post |
| `POST` | `/posts/:id/edit` | Update an existing post |
| `POST` | `/posts/:id/delete` | Delete a post |

---

## Design Philosophy

The UI is designed around an **editorial magazine aesthetic** — inspired by publications like *The Atlantic* and *Paul Graham's essays*. Key design decisions include:

- **Playfair Display** for headlines — authoritative, classic, and beautiful at large sizes
- **Source Serif 4** for body text — highly readable for long-form reading
- **JetBrains Mono** for metadata — category labels, dates, and UI chrome
- **Deep ink + warm cream palette** — avoids the sterile feel of pure black-on-white
- **Gold accent** (`#b5913a`) for interactive elements and highlights
- **Drop cap** on first paragraph of every post for a refined editorial touch
- **Featured post** — the most recent post always gets a full-width, prominent treatment

---

## Future Improvements

Since this version uses in-memory storage, a natural next step would be to add persistence. Possible enhancements include:

- **Database integration** — PostgreSQL or MongoDB to persist posts across sessions
- **User authentication** — Sign in to author posts, with private/public post support
- **Image uploads** — Cover images per post via Multer
- **Markdown support** — Render post content as Markdown using `marked`
- **Pagination** — Limit posts per page as the blog grows
- **Search** — Filter posts by keyword or category
- **RSS feed** — Auto-generated feed for subscribers

---

## License

This project is licensed under the **ISC License**.

---

## Acknowledgements

Built as part of the [Complete Web Development Bootcamp](https://www.udemy.com/course/the-complete-web-development-bootcamp/) by Dr. Angela Yu on Udemy.

Typography powered by [Google Fonts](https://fonts.google.com/).

import express from "express";
import { v4 as uuidv4 } from "uuid";

const app = express();
const PORT = 3000;

// In-memory posts store
let posts = [
  {
    id: uuidv4(),
    title: "The Art of Writing Well",
    category: "Writing",
    excerpt: "Good writing is not about complexity — it's about clarity, honesty, and precision in every single word.",
    content: `Good writing is not about complexity — it's about clarity, honesty, and precision in every single word.

The best writers I know write simply. They strip away everything unnecessary and leave only what matters. Every sentence earns its place. Every word is the right word.

Writing well is a practice. It means reading widely, writing daily, and editing ruthlessly. It means being willing to delete your favorite sentence if it doesn't serve the whole. It means caring more about the reader's experience than your own cleverness.

Start with a single true thing. Build outward from there. Don't try to say everything at once — say one thing completely.`,
    author: "Editorial Staff",
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    readTime: 3,
  },
  {
    id: uuidv4(),
    title: "On Building Things That Last",
    category: "Technology",
    excerpt: "Software built to last is software built with care — for the people who will use it, and the people who will maintain it.",
    content: `Software built to last is software built with care — for the people who will use it, and the people who will maintain it.

Most software is written to ship. Written fast, patched faster, forgotten by the time the next version comes around. But there's a different way to build — one that treats code as a craft, not just a commodity.

Lasting software is readable. The next developer — maybe you, six months from now — should be able to understand what you were thinking. Comment not what the code does, but why. Name things what they are.

Lasting software is tested. Not because tests make you feel safe, but because they force you to think about your assumptions. A test is a conversation with future-you.

Most importantly, lasting software solves real problems. It doesn't try to be clever. It tries to be useful.`,
    author: "Editorial Staff",
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    readTime: 4,
  },
];

// Middleware
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("Public"));
app.use(express.static("views/js"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Helper: format date
function formatDate(isoString) {
  const date = new Date(isoString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// ── ROUTES ──────────────────────────────────────────────

// Home — list all posts
app.get("/", (req, res) => {
  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  res.render("index", { posts: sortedPosts, formatDate });
});

// New post form
app.get("/posts/new", (req, res) => {
  res.render("new", { error: null });
});

// Create post
app.post("/posts", (req, res) => {
  const { title, category, content, author } = req.body;

  if (!title?.trim() || !content?.trim()) {
    return res.render("new", { error: "Title and content are required." });
  }

  const words = content.trim().split(/\s+/).length;
  const readTime = Math.max(1, Math.ceil(words / 200));
  const excerpt = content.trim().split("\n")[0].slice(0, 160) + (content.length > 160 ? "…" : "");

  const newPost = {
    id: uuidv4(),
    title: title.trim(),
    category: category?.trim() || "General",
    excerpt,
    content: content.trim(),
    author: author?.trim() || "Anonymous",
    date: new Date().toISOString(),
    readTime,
  };

  posts.unshift(newPost);
  res.redirect("/");
});

// View single post
app.get("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === req.params.id);
  if (!post) return res.redirect("/");
  res.render("post", { post, formatDate });
});

// Edit form
app.get("/posts/:id/edit", (req, res) => {
  const post = posts.find((p) => p.id === req.params.id);
  if (!post) return res.redirect("/");
  res.render("edit", { post, error: null });
});

// Update post
app.post("/posts/:id/edit", (req, res) => {
  const index = posts.findIndex((p) => p.id === req.params.id);
  if (index === -1) return res.redirect("/");

  const { title, category, content, author } = req.body;

  if (!title?.trim() || !content?.trim()) {
    return res.render("edit", {
      post: posts[index],
      error: "Title and content are required.",
    });
  }

  const words = content.trim().split(/\s+/).length;
  const readTime = Math.max(1, Math.ceil(words / 200));
  const excerpt = content.trim().split("\n")[0].slice(0, 160) + (content.length > 160 ? "…" : "");

  posts[index] = {
    ...posts[index],
    title: title.trim(),
    category: category?.trim() || "General",
    excerpt,
    content: content.trim(),
    author: author?.trim() || posts[index].author,
    readTime,
    updatedAt: new Date().toISOString(),
  };

  res.redirect(`/posts/${req.params.id}`);
});

// Delete post
app.post("/posts/:id/delete", (req, res) => {
  posts = posts.filter((p) => p.id !== req.params.id);
  res.redirect("/");
});

// ── START ────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n  📝  Blog running at http://localhost:${PORT}\n`);
});

export default app;

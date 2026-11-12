import { onInit } from "firebase-functions";

const express = (await import("express")).default;
const cors = (await import("cors")).default;
const usersRoute = (await import("./routes/users.js")).default;
const lessonsRoute = (await import("./routes/lessons.js")).default;
const decksRoute = (await import("./routes/decks.js")).default;
const imageAuthRoute = (await import("./routes/imageKitAuth.js")).default;
const app = express();

import { getFirestore, Firestore } from "firebase-admin/firestore";
import { cert, initializeApp } from "firebase-admin/app";


const firebaseApp = initializeApp({
  credential: cert("../../hope-2033a-e0e0e94d97c6.json")
});

declare global {
  namespace Express {
    interface Request {
      db: Firestore;
    }
  }
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 3000;

app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    credentials: true,
  }),
);

onInit(() => {
  const db = getFirestore(firebaseApp);
  app.use((req, res, next) => {
    req.db = db;
    next();
  });
  app.use("/users", usersRoute);
  app.use("/lessons", lessonsRoute);
  app.use("/decks", decksRoute);
  app.use("/auth", imageAuthRoute);

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
});

export default app;

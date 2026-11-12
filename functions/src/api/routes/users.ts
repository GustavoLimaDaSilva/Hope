import { Router } from "express";
import type { ProfileData } from "../types/index.js";
// eslint-disable-next-line new-cap
const router = Router();

router.get("/:uid", async (req, res) => {
  const uid = req.params.uid;

  try {
    const user = (await req.db.collection("users").doc(uid).get()).data();
    if (user) {
      return res.json(user);
    } else {
      return res.status(404).json({ message: user });
    }
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

router.post("/", async (req, res) => {
  const newUser: ProfileData | undefined = req.body?.profile_data;
  if (!newUser) return;

  const userRef = req.db.collection("users").doc(newUser.uid);
  const userExists = (await userRef.get()).exists;
  if (userExists) {
    return res.status(409).json({ message: "User already exists" });
  }

  try {
    await userRef.set(newUser);
    return res.json({ message: "User created successfully" });
  } catch (err) {
    return res.json({ error: err });
  }
});

router.put("/:uid", async (req, res) => {
  const newLevel = req.body.profileLevel;
  const uid = req.params.uid;

  const userRef = req.db.collection("users").doc(uid);
  const userExists = (await userRef.get()).exists;

  if (!userExists) {
    return res.status(409).json({ message: "User already exists" });
  }

  try {
    await userRef.update({
      level: newLevel,
    });
    return res.status(201).json({ message: "User updated successfully" });
  } catch (err) {
    return res.status(404).json({ message: "User not found", err });
  }
});

router.delete("/:uid", async (req, res) => {
  const uid = req.params.uid;

  try {
    const docRes = await req.db.collection("users").doc(uid).delete();

    return res.json(docRes);
  } catch (err) {
    return res.json({
      error: "Failed to delete user document",
      details: err instanceof Error ? err.message : err,
    });
  }
});

export default router;

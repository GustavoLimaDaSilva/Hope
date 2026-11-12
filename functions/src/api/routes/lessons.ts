import { Router } from "express";
import { DocumentData } from "firebase/firestore";

const LESSONS_PLAYLIST_ID = process.env.LESSONS_PLAYLIST_ID
const API_KEY = process.env.API_KEY
import { getPlaylistVideos } from "../../utils.js";

// eslint-disable-next-line new-cap
const router = Router();

router.get("/allVideos", async (req, res) => {

  try {
    const lessonVideos = await getPlaylistVideos(API_KEY, LESSONS_PLAYLIST_ID)
    if (lessonVideos) {
      return res.status(200).json({lessonVideos: lessonVideos, playlistId: LESSONS_PLAYLIST_ID})
    }
    return res.status(404).json({ error: "couldn't find playlist!" })
  }
  catch (err) {
    return res.status(500).json({ error: err })
  }
})


router.get("/", async (req, res) => {

  const lessons: DocumentData[] = []

  try {

    const ref = req.db.collection("lessons");
    const snapshot = await ref.get();
    snapshot.forEach((doc) => lessons.push(doc.data()))
    return res.json(lessons)

  } catch (err) {
    return res.status(500).json({ error: err })
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const lesson = req.db.collection("lessons").doc(id).get() 

    if (lesson) {
      return res.json(lesson)
    } else {
      return res.status(404).json({ message: "Couldn't find lesson" })
    }
  } catch (err) {
    return res.status(500).json({ error: err })
  }
});

export default router;

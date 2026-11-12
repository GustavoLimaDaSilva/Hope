import { Router } from "express";
import { createHexId, getMostRecent} from "../../utils.js";
import type { DeckType } from "../types/index.js";
import { DeckCardType } from "../../../../shared-types/deck.js";
// eslint-disable-next-line new-cap
const router = Router();

router.get("/:uid", async (req, res) => {
  if (!req.query) return;
  const level = req.query.level;
  if (!level) return;

  const uid = req.params.uid;


  const userDecksData: DeckCardType[] = [];
  const lessonDecksData: DeckCardType[] = [];

  try {
    const ref = req.db.collection("lessons");
    const snapshot = await ref
      .where("requiredLevel", Number(level) === 11 ? "<=" : "<", Number(level))
      .get();

    snapshot.forEach((doc) => {
      const lesson = doc.data()

      const mostRecentDate = lesson.flashcardDeck
        .cards.reduce(getMostRecent, [0, 0, 0])

      lessonDecksData.push({
        name: lesson.flashcardDeck.name,
        id: lesson.id,
        deckDescription: lesson.flashcardDeck.deckDescription,
        lastSeen: mostRecentDate.join("/"),
        cardLength: lesson.flashcardDeck.cards.length
      })
    })

  } catch (err) {
    return res.status(500).json([{err: err}])
  }

  try {

    const userRef = req.db.collection("users").doc(uid);
    const user = (await userRef.get()).data()
    user?.flashcardDecks?.forEach((deck: DeckType) => {

      const mostRecent = deck.cards
        .reduce(getMostRecent, [0, 0, 0])

      userDecksData.push({
        name: deck.name,
        id: deck.id,
        deckDescription: deck.deckDescription,
        lastSeen: mostRecent.join("/"),
        cardLength: deck.cards.length
      })
    }) ?? []

  } catch (err) {
    return res.status(500).json([{error: err}])
  }
  return res.status(200).json({
    lessonDecksData: lessonDecksData,
    personalDecksData: userDecksData,
  });
});

router.get("/lessonDecks/:lessonId", async (req, res) => {
  const lessonId = req.params.lessonId

  const lessonRef = req.db.collection("lessons").doc(lessonId);
  const lessonData = (await lessonRef.get()).data()

  if (lessonData) {
    return res.json(lessonData);
  }
  return res.json([]);
});

router.get("/personalDecks/:uid/:deckId", async (req, res) => {
  const uid = req.params.uid;
  const deckId = req.params.deckId;

  const userRef = req.db.collection("users").doc(uid);
  const user = (await userRef.get()).data()

  const deck = user?.flashcardDecks
    ?.find((d: DeckType) => d.id === deckId);

  if (deck) {
    return res.json(deck);
  }
  return res.json([]);
});

router.post("/personalDecks/:uid", async (req, res) => {
  const formData: Omit<DeckType, "id"> | undefined = req.body?.formData;
  const uid = req.params.uid;
  if (!formData) return res.json({ message: "no data was sent!" });

  try {

    const userRef = req.db.collection("users").doc(uid);
    const user = (await userRef.get()).data()
    const existingDecks = user?.flashcardDecks

    if (existingDecks) {
      await userRef.update({
        flashcardDecks: [...existingDecks, { ...formData, id: createHexId() }]
      });
    } else {
      await userRef.update({
        flashcardDecks: [ {...formData, id: createHexId()} ]})
    }
    return res.status(201).json("Deck created successfully")

  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

router.put("/updateDeck/:uid", async (req, res) => {
  const uid = req.params.uid
  const updatedDeck: DeckType | undefined = req.body.updatedDeck;

  if (!updatedDeck) return res.json({ message: "No deck was sent!" });

  try {

    const userRef = req.db.collection("users").doc(uid);
    const user = (await userRef.get()).data()
    if (!user) {
      return res.status(404).json(
        { message: "no user with this id was found." }
      )
    }
    const existingDecks = user?.flashcardDecks
    const outdatedDeckIndex = existingDecks
      .findIndex((d: DeckType) => d.id === updatedDeck.id)

    if (outdatedDeckIndex === -1) {
      return res.status(404).json(
        { message: "no deck with this ID was found." }
      )
    }

    await userRef.update({
      flashcardDecks: existingDecks.toSpliced(outdatedDeckIndex, 1, updatedDeck)
    });
    return res.status(200).json({ message: "updated successfully" });

  } catch (err) {
    return res.json({ error: err })
  }
});

export default router;

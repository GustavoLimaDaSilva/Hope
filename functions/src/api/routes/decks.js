import { Router } from "express";
import { createHexId, getMostRecent } from "../../utils.js";
// eslint-disable-next-line new-cap
const router = Router();
router.get("/:uid", async (req, res) => {
    var _a, _b;
    if (!req.query)
        return;
    const level = req.query.level;
    if (!level)
        return;
    const uid = req.params.uid;
    const userDecksData = [];
    const lessonDecksData = [];
    try {
        const ref = req.db.collection("lessons");
        const snapshot = await ref
            .where("requiredLevel", Number(level) === 11 ? "<=" : "<", Number(level))
            .get();
        snapshot.forEach((doc) => {
            const lesson = doc.data();
            const mostRecentDate = lesson.flashcardDeck
                .cards.reduce(getMostRecent, [0, 0, 0]);
            lessonDecksData.push({
                name: lesson.flashcardDeck.name,
                id: lesson.id,
                deckDescription: lesson.flashcardDeck.deckDescription,
                lastSeen: mostRecentDate.join("/"),
                cardLength: lesson.flashcardDeck.cards.length
            });
        });
    }
    catch (err) {
        return res.status(500).json([{ err: err }]);
    }
    try {
        const userRef = req.db.collection("users").doc(uid);
        const user = (await userRef.get()).data();
        (_b = (_a = user === null || user === void 0 ? void 0 : user.flashcardDecks) === null || _a === void 0 ? void 0 : _a.forEach((deck) => {
            const mostRecent = deck.cards
                .reduce(getMostRecent, [0, 0, 0]);
            userDecksData.push({
                name: deck.name,
                id: deck.id,
                deckDescription: deck.deckDescription,
                lastSeen: mostRecent.join("/"),
                cardLength: deck.cards.length
            });
        })) !== null && _b !== void 0 ? _b : [];
    }
    catch (err) {
        return res.status(500).json([{ error: err }]);
    }
    return res.status(200).json({
        lessonDecksData: lessonDecksData,
        personalDecksData: userDecksData,
    });
});
router.get("/lessonDecks/:lessonId", async (req, res) => {
    const lessonId = req.params.lessonId;
    const lessonRef = req.db.collection("lessons").doc(lessonId);
    const lessonData = (await lessonRef.get()).data();
    if (lessonData) {
        return res.json(lessonData);
    }
    return res.json([]);
});
router.get("/personalDecks/:uid/:deckId", async (req, res) => {
    var _a;
    const uid = req.params.uid;
    const deckId = req.params.deckId;
    const userRef = req.db.collection("users").doc(uid);
    const user = (await userRef.get()).data();
    const deck = (_a = user === null || user === void 0 ? void 0 : user.flashcardDecks) === null || _a === void 0 ? void 0 : _a.find((d) => d.id === deckId);
    if (deck) {
        return res.json(deck);
    }
    return res.json([]);
});
router.post("/personalDecks/:uid", async (req, res) => {
    var _a;
    const formData = (_a = req.body) === null || _a === void 0 ? void 0 : _a.formData;
    const uid = req.params.uid;
    if (!formData)
        return res.json({ message: "no data was sent!" });
    try {
        const userRef = req.db.collection("users").doc(uid);
        const user = (await userRef.get()).data();
        const existingDecks = user === null || user === void 0 ? void 0 : user.flashcardDecks;
        if (existingDecks) {
            await userRef.update({
                flashcardDecks: [...existingDecks, Object.assign(Object.assign({}, formData), { id: createHexId() })]
            });
        }
        else {
            await userRef.update({
                flashcardDecks: [Object.assign(Object.assign({}, formData), { id: createHexId() })]
            });
        }
        return res.status(201).json("Deck created successfully");
    }
    catch (err) {
        return res.status(500).json({ error: err });
    }
});
router.put("/updateDeck/:uid", async (req, res) => {
    const uid = req.params.uid;
    const updatedDeck = req.body.updatedDeck;
    if (!updatedDeck)
        return res.json({ message: "No deck was sent!" });
    try {
        const userRef = req.db.collection("users").doc(uid);
        const user = (await userRef.get()).data();
        if (!user) {
            return res.status(404).json({ message: "no user with this id was found." });
        }
        const existingDecks = user === null || user === void 0 ? void 0 : user.flashcardDecks;
        const outdatedDeckIndex = existingDecks
            .findIndex((d) => d.id === updatedDeck.id);
        if (outdatedDeckIndex === -1) {
            return res.status(404).json({ message: "no deck with this ID was found." });
        }
        await userRef.update({
            flashcardDecks: existingDecks.toSpliced(outdatedDeckIndex, 1, updatedDeck)
        });
        return res.status(200).json({ message: "updated successfully" });
    }
    catch (err) {
        return res.json({ error: err });
    }
});
export default router;
//# sourceMappingURL=decks.js.map
import { Router } from "express";
import { users } from "../fileReader.js";
const fs = await import('fs/promises');
const router = Router();
router.get('/:uid', (req, res) => {
    if (users.length === 0) {
        res.json([]);
        return;
    }
    const uid = req.params.uid;
    const user = users.find(u => u.uid === uid);
    user ? res.json(user) : res.json({});
});
router.post('/', async (req, res) => {
    const newUser = req.body;
    if (!newUser)
        return;
    console.log(newUser);
    let usersArr = [];
    users.length ? usersArr = users : [];
    if (usersArr.some(u => u.uid === newUser.uid)) {
        res.status(409).json({ message: 'User already exists' });
        return;
    }
    // usersArr.push({ ...newUser.profile_data })
    await fs.writeFile('users.json', JSON.stringify(usersArr));
    res.status(201).json({ message: 'User created successfully' });
});
router.put('/:uid', async (req, res) => {
    const new_level = req.body.profile_level;
    if (!new_level)
        return;
    const uid = req.params.uid;
    const index = users.findIndex(u => u.uid === uid);
    if (users[index]) {
        users[index].level = new_level;
        await fs.writeFile('users.json', JSON.stringify(users));
        res.status(201).json({ message: 'User updated successfully' });
    }
    res.status(404).json({ message: 'User not found' });
});
export default router;
//# sourceMappingURL=users.js.map
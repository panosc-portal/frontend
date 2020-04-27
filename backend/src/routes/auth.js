import {
    Router
} from 'express';
import jwt from "jsonwebtoken";


const router = Router();

router.post('/', async (req, res) => {
    const { username, password } = await req.body;
    const user = await req.context.models.User.findOne({ username, password });
    user ?
        jwt.sign({ user }, process.env.SECRET, { expiresIn: "12h" }, (err, token) => {
            res.send({ token })
        })
        :
        res.sendStatus(404)
});

export default router;
import {
    Router
} from 'express';

const router = Router();

router.get('/', async (req, res) => {
    const documents = await req.context.models.Flavour.find();
    return res.send(documents);
});

export default router;
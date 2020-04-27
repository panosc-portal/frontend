import {
  Router
} from 'express';

const router = Router();

router.get('/', async (req, res) => {
  const documents = await req.context.models.Document.find()
    .populate('datasets');
  return res.send(documents);
});



router.get('/:documentId', async (req, res) => {
  const document = await req.context.models.Document.findById(
    req.params.documentId,
  ).populate('datasets');
  return res.send(document);
});

export default router;
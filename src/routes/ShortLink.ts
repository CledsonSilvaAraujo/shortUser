import express from 'express';
import controller from '../controllers/ShortLink';

const router = express.Router();

router.get('/:shortLinkId', controller.getShortLink);
router.delete('/delete/:shortLinkId', controller.deleteShortLink);

export = router;

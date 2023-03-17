import express from 'express';
import controller from '../controllers/User';

const router = express.Router();

router.post('/create', controller.createUser);
router.get('/get/:userId', controller.readUser);
router.get('/get', controller.readAllUsers);
router.patch('/update/:userId', controller.updateUser);
router.delete('/delete/:userId', controller.deleteUser);
router.post('/add-short-link/:userId', controller.associateLinkWithUser);
router.get('/go-to-short-link/:userId/:linkId', controller.getUserShortLink);

export = router;

import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

router.post('/', UserController.createUser);
router.get('/', UserController.getAllUsers);
router.get('/:userId', UserController.getSingleUser);
// router.put('/:userId', UserController.getUpdateUser);
// router.delete('/:userId', UserController.deletedUser);
// router.put('/:userId/orders', UserController.addProductToDB);
// router.get('/:userId/orders', UserController.getOrdersFromDB);
// router.get('/:userId/orders/total-price', UserController.calculatePrice);

export const UserRoutes = router;

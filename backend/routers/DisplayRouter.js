import express from 'express'
import authUser from '../middleware/authUser.js';
import { getUserData } from '../controllers/displayController.js';

const DisplayRouter = express.Router();

DisplayRouter.get('/data',authUser,getUserData)

export default DisplayRouter;
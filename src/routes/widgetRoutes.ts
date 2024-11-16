import express from 'express';
import { createWidget, getWidgets } from '../controllers/widgetController';

const router = express.Router();

router.post('/create', createWidget);
router.get('/', getWidgets);

export default router;

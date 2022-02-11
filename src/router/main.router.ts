import express from 'express';
import heroController from '../controller/hero.controller';
import herosRouter from './heros.router';

const router = express.Router();
router.use('/hero', herosRouter);

export = router;

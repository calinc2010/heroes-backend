import cors from 'cors';
import express from 'express';
import heroController from '../controller/hero.controller';

const router = express.Router();
// router.get('/', heroController.getHeroes);
// router.get('/:id', heroController.getHeroById);
router.post('/', heroController.addHero);
router.get('/:id', heroController.getHeroById);
router.delete('/:id', heroController.deleteHero);
router.put('/:id', heroController.updateHero);
router.get('/', cors(), heroController.getHeroes);

export = router;

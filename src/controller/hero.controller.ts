import { Request, Response } from 'express';
// import { HEROES } from '../mock/heroes.mock';
import { Hero, heroModel } from '../model/hero.model';

const getHeroes = async (req: Request, res: Response) => {
  // get all heroes
  try {
    const heroes: Hero[] = await heroModel.find();
    return res.status(200).json({
      status: 200,
      data: heroes
    });
  } catch (err) {
    return res.status(400).json({
      status: 400,
      message: err
    });
  }
};
const getHeroById = async (req: Request, res: Response) => {
  //get the hero
  try {
    const hero: Hero | null = await heroModel.findOne({
      _id: req.params.id
    });
    if (hero)
      return res.status(200).json({
        status: 200,
        data: hero
      });
    else
      return res.status(204).json({
        status: 204,
        data: hero
      });
  } catch (err) {
    return res.status(400).json({
      status: 400,
      message: err
    });
  }
};

const deleteHero = async (req: Request, res: Response) => {
  try {
    const hero = await heroModel.findByIdAndRemove(req.params.id);
    if (hero) {
      res.status(200).json({
        status: 200,
        message: 'Hero deleted successfully'
      });
    } else {
      res.status(204).json({
        status: 204,
        message: 'No hero found'
      });
    }
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err
    });
  }
};

const updateHero = async (req: Request, res: Response) => {
  // get the hero id from the req.params
  const id: string = req.params.id;
  // update the hero
  try {
    const hero = await heroModel.findByIdAndUpdate(id, req.body, {
      new: true
    });
    if (hero) {
      return res.status(200).json({
        status: 200,
        data: hero
      });
    }
    return res.status(204).json({
      status: 204,
      message: 'No hero found'
    });
  } catch (err) {
    return res.status(400).json({
      status: 400,
      message: err
    });
  }
};

const addHero = async (req: Request, res: Response) => {
  try {
    let hero = new heroModel(req.body);
    hero = await hero.save();
    return res.status(200).json({
      status: 200,
      data: hero
    });
  } catch (err) {
    return res.status(400).json({
      status: 400,
      message: err
    });
  }
};

export default { addHero, getHeroById, updateHero, deleteHero, getHeroes };

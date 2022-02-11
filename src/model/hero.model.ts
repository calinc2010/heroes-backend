import { model, Model, Schema } from 'mongoose';

export interface Hero {
  name: string;
}

const heroSchema = new Schema<Hero>(
  {
    name: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

export const heroModel: Model<Hero> = model<Hero>('Hero', heroSchema);

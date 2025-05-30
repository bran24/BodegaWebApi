import { Request, Response } from 'express';
import { decode } from '../utils/decodejwt';

export default async (req: Request, res: Response, next: Function) => {
  const auth = req.headers.authorization;

  if (!auth) return res.status(401).json({ message: 'No autorizado' });


  const token = auth?.split(' ')[1];
  console.log(token)
  try {
    const user = await decode(token);
    console.log(user)
    res.locals.user = user;
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'No autorizado' });
  }
};

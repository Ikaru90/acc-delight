import { Request, Response, Router } from 'express';
import Room from '../models/Room';

export class RoomRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public all(req: Request, res: Response): void {
    Room.find()
      .then((data) => {
        return res.status(200).json({ data });
      })
      .catch((error) => {
        res.status(500).json({ error });
        return error;
      });
  }

  public one(req: Request, res: Response): void {
    const { name } = req.params;

    Room.findOne({ name })
      .then((data) => {
        return res.status(200).json({ data });
      })
      .catch((error) => {
        return res.status(500).json({ error });
      });
  }

  public create(req: Request, res: Response): void {
    const {
      isPrivate,
      isChatRoom,
      userList,
      adminList,
      name,
      id,
    } = req.body;

    const room = new Room({
      isPrivate,
      isChatRoom,
      userList,
      adminList,
      name,
      id,
    });

    room
      .save()
      .then((data) => {
        return res.status(201).json({ data });
      })
      .catch((error) => {
        return res.status(500).json({ error });
      });
  }

  public update(req: Request, res: Response): void {
    const { id } = req.params;

    Room.findOneAndUpdate({ id }, req.body)
      .then((data) => {
        return res.status(200).json({ data });
      })
      .catch((error) => {
        return res.status(500).json({ error });
      });
  }

  public delete(req: Request, res: Response): void {
    const { id } = req.params;

    Room.findOneAndRemove({ id })
      .then(() => {
        return res.status(204).end();
      })
      .catch((error) => {
        return res.status(500).json({ error });
      });
  }

  // set up our routes
  public routes() {
    this.router.get('/', this.all);
    this.router.get('/:id', this.one);
    this.router.post('/', this.create);
    this.router.put('/:id', this.update);
    this.router.delete('/:id', this.delete);
  }
}

const roomRoutes = new RoomRouter();
roomRoutes.routes();

export default roomRoutes.router;

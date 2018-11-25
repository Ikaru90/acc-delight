import { Request, Response, Router } from 'express';
import Group from '../models/Group';
import { log } from '../utils/logger';

export class GroupRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public all(req: Request, res: Response): void {
    log('Get all groups', null);
    Group.find()
      .then((data) => {
        return res.status(200).json({ data });
      })
      .catch((error) => {
        res.status(500).json({ error });
        return error;
      });
  }

  public one(req: Request, res: Response): void {
    const { id } = req.params;
    log('Get one group', req.params);

    Group.findOne({ _id: id })
      .then((data) => {
        return res.status(200).json({ data });
      })
      .catch((error) => {
        return res.status(500).json({ error });
      });
  }

  public create(req: Request, res: Response): void {
    const {
      id,
      adminList,
      newsRoomId,
      isServiceRoom,
      chatRoom,
      info,
    } = req.body;
    log('Create group', req.body);

    const group = new Group({
      id,
      adminList,
      newsRoomId,
      isServiceRoom,
      chatRoom,
      info,
    });

    group
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
    log('Update group', req.params);

    Group.findOneAndUpdate({ _id: id }, req.body)
      .then((data) => {
        return res.status(200).json({ data });
      })
      .catch((error) => {
        return res.status(500).json({ error });
      });
  }

  public delete(req: Request, res: Response): void {
    const { id } = req.params;
    log('Delete group', req.params);

    Group.findOneAndRemove({ _id: id })
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

const groupRoutes = new GroupRouter();
groupRoutes.routes();

export default groupRoutes.router;

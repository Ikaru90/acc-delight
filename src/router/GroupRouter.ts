import { Request, Response, Router } from 'express';
import Group from '../models/Group';

export class GroupRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public all(req: Request, res: Response): void {
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

    Group.findOne({ id })
      .then((data) => {
        return res.status(200).json({ data });
      })
      .catch((error) => {
        return res.status(500).json({ error });
      });
  }

  public create(req: Request, res: Response): void {
    const {
    } = req.body;

    const group = new Group({
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

    Group.findOneAndUpdate({ id }, req.body)
      .then((data) => {
        return res.status(200).json({ data });
      })
      .catch((error) => {
        return res.status(500).json({ error });
      });
  }

  public delete(req: Request, res: Response): void {
    const { id } = req.params;

    Group.findOneAndRemove({ id })
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

import { Request, Response, Router } from 'express';
import User from '../models/User';
import { log } from '../utils/logger';

export class UserRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public all(req: Request, res: Response): void {
    log('ALL', req.body);
    User.find()
      .then((data) => {
        return res.status(200).json({ data });
      })
      .catch((error) => {
        res.status(500).json({ error });
        return error;
      });
  }

  public one(req: Request, res: Response): void {
    const { enterpriseId } = req.params;
    log('ONE', req.params);

    User.findOne({ enterpriseId })
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
      name,
      surname,
      avatarURL,
      chatRoomList,
      newsRoomList,
      password,
      enterpriseId,
    } = req.body;
    log('CREATE', req.body);

    const user = new User({
      id,
      name,
      surname,
      avatarURL,
      chatRoomList,
      newsRoomList,
      password,
      enterpriseId,
    });

    user
      .save()
      .then((data) => {
        return res.status(201).json({ data });
      })
      .catch((error) => {
        return res.status(500).json({ error });
      });
  }

  public update(req: Request, res: Response): void {
    const { enterpriseId } = req.params;
    log('UPDATE', req.params);

    User.findOneAndUpdate({ enterpriseId }, req.body)
      .then((data) => {
        return res.status(200).json({ data });
      })
      .catch((error) => {
        return res.status(500).json({ error });
      });
  }

  public delete(req: Request, res: Response): void {
    const { enterpriseId } = req.params;
    log('DELETE', req.params);

    User.findOneAndRemove({ enterpriseId })
      .then(() => {
        return res.status(204).end();
      })
      .catch((error) => {
        return res.status(500).json({ error });
      });
  }
  
  public login(req: Request, res: Response): void {
    const { enterpriseId, password } = req.body;
    log('LOGIN', req.body);

    User.find({ enterpriseId, password })
      .then((data) => {
        return data.length !== 0
          ? res.status(200).json({ user: data[0] })
          : res.status(200).json({ authentication: false });
      })
      .catch((error) => {
        return res.status(500).json({ error });
      });
  }

  // set up our routes
  public routes() {
    this.router.get('/', this.all);
    this.router.get('/:enterpriseId', this.one);
    this.router.post('/login', this.login);
    this.router.post('/', this.create);
    this.router.put('/:enterpriseId', this.update);
    this.router.delete('/:enterpriseId', this.delete);
  }
}

const userRoutes = new UserRouter();
userRoutes.routes();

export default userRoutes.router;

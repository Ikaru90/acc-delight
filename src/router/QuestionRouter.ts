import { Request, Response, Router } from 'express';
import Question from '../models/Question';
import { log } from '../utils/logger';

export class QuestionRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public all(req: Request, res: Response): void {
    log('Get all questions', null);
    Question.find()
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
    log('Get one question', req.params);

    Question.findOne({ _id: id })
      .then((data) => {
        return res.status(200).json({ data });
      })
      .catch((error) => {
        return res.status(500).json({ error });
      });
  }

  public create(req: Request, res: Response): void {
    const {
      type,
      label,
      answer,
    } = req.body;
    log('Create question', req.body);

    const question = new Question({
      type,
      label,
      answer,
    });

    question
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
    log('Update question', {...req.params, ...req.body});

    Question.findOneAndUpdate({ _id: id }, req.body)
      .then((data) => {
        return res.status(200).json({ data });
      })
      .catch((error) => {
        return res.status(500).json({ error });
      });
  }

  public delete(req: Request, res: Response): void {
    const { id } = req.params;
    log('Delete question', req.params);

    Question.findOneAndRemove({ _id: id })
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

const questionRoutes = new QuestionRouter();
questionRoutes.routes();

export default questionRoutes.router;

import * as Yup from 'yup';
import { isBefore, parseISO } from 'date-fns';
import Meetup from '../../models/meetup/Meetup';

class MeetupController {
  async index(req, res) {
    return res.json({});
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      file_id: Yup.number().required(),
      description: Yup.string().required(),
      location: Yup.string().required(),
      date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      const e = [];
      await schema.validate(req.body).catch(err => {
        e.push({ error: err.message });
      });
      return res.status(400).json(e);
    }

    const user_id = req.userId;

    if (isBefore(parseISO(req.body.date), new Date())) {
      return res
        .status(400)
        .json({ error: 'Não é possível criar eventos em datas passadas' });
    }

    const meetup = await Meetup.create({
      ...req.body,
      user_id,
    });

    return res.json(meetup);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      file_id: Yup.number().required(),
      description: Yup.string().required(),
      location: Yup.string().required(),
      date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      const e = [];
      await schema.validate(req.body).catch(err => {
        e.push({ error: err.message });
      });
      return res.status(400).json(e);
    }

    const meetup = await Meetup.findByPk(req.params.id);

    const user_id = req.userId;

    if (meetup.user_id !== user_id) {
      return res
        .status(401)
        .json({ error: 'Só pode editar eventos em que você é o organizador' });
    }

    if (isBefore(parseISO(req.body.date), new Date())) {
      return res
        .status(400)
        .json({ error: 'Não é possível criar eventos em datas passadas' });
    }

    if (meetup.past) {
      return res.status(400).json({ error: 'Esse evento já ocorreu' });
    }

    await meetup.update(req.body);

    return res.json(meetup);
  }

  async delete(req, res) {
    const meetup = await Meetup.findByPk(req.params.id);

    const user_id = req.userId;

    if (meetup.user_id !== user_id) {
      return res
        .status(401)
        .json({ error: 'Só pode editar eventos em que você é o organizador' });
    }

    if (meetup.past) {
      return res
        .status(400)
        .json({ error: 'Esse evento já ocorreu e não pode ser deletado' });
    }

    await meetup.destroy();

    return res.json({});
  }
}

export default new MeetupController();

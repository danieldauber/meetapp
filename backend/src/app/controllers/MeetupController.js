import { Op } from 'sequelize';
import { parseISO, startOfDay, endOfDay } from 'date-fns';
import Meetup from '../models/Meetup';
import User from '../models/User';
import File from '../models/File';

import PastDateService from '../services/PastDateService';
import OrganizerService from '../services/OrganizerService';
import PastEventService from '../services/PastEventService';

class MeetupController {
  async index(req, res) {
    const where = {};
    const page = req.query.page || 1;

    if (req.query.date) {
      const searchDate = parseISO(req.query.date);

      where.date = {
        [Op.between]: [startOfDay(searchDate), endOfDay(searchDate)],
      };
    }

    const meetups = await Meetup.findAll({
      where,
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['name', 'email'],
          include: [{ model: File, as: 'avatar' }],
        },
      ],
      limit: 10,
      offset: 10 * page - 10,
    });

    return res.json(meetups);
  }

  async store(req, res) {
    const user_id = req.userId;

    await PastDateService.run({ date: req.body.date });

    const meetup = await Meetup.create({
      ...req.body,
      user_id,
    });

    return res.json(meetup);
  }

  async update(req, res) {
    const meetup = await Meetup.findByPk(req.params.id);

    const user_id = req.userId;

    await OrganizerService.run({
      organizerId: meetup.user_id,
      userId: user_id,
    });

    await PastDateService.run({ date: req.body.date });

    await PastEventService.run({ past: meetup.past });

    await meetup.update(req.body);

    return res.json(meetup);
  }

  async delete(req, res) {
    const meetup = await Meetup.findByPk(req.params.id);

    const user_id = req.userId;

    await OrganizerService.run({
      organizerId: meetup.user_id,
      userId: user_id,
    });

    await PastEventService.run({ past: meetup.past });

    await meetup.destroy();

    return res.json({});
  }
}

export default new MeetupController();

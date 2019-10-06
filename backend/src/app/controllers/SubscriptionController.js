import { Op } from 'sequelize';
import Subscription from '../models/Subscription';
import User from '../models/User';
import Meetup from '../models/Meetup';

import Queue from '../../lib/Queue';
import SubscriptionMail from '../jobs/SubscriptionMail';

import PastEventService from '../services/PastEventService';
import CheckSubscription from '../services/CheckSubscription';

class SubscriptionController {
  async index(req, res) {
    const subscriptions = await Subscription.findAll({
      where: {
        user_id: req.userId,
      },
      include: [
        {
          model: Meetup,
          where: {
            date: {
              [Op.gt]: new Date(),
            },
          },
          required: true,
        },
      ],
      order: [[Meetup, 'date']],
    });

    return res.json(subscriptions);
  }

  async store(req, res) {
    const user = await User.findByPk(req.userId);
    const meetup = await Meetup.findByPk(req.body.meetup_id, {
      include: [
        {
          model: User,
          as: 'user',
        },
      ],
    });

    await PastEventService.run({ past: meetup.past });

    await CheckSubscription.run({
      userId: user.id,
      meetupId: req.body.meetup_id,
      date: meetup.date,
      organizerId: meetup.user_id,
    });

    const subscription = await Subscription.create({
      user_id: user.id,
      meetup_id: meetup.id,
    });

    await Queue.add(SubscriptionMail.key, {
      meetup,
      user,
    });

    return res.json(subscription);
  }
}

export default new SubscriptionController();
